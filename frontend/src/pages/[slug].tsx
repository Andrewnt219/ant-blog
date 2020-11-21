import React, { ReactElement } from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import sanityClient from "@src/lib/sanity/client";
import Head from "next/head";
import { calculateReadingMinutes } from "@src/utils";
import PostHeader from "@src/components/post/PostHeader";
import PostBody from "@src/components/post/PostBody";
import PostFooter from "@src/components/post/PostFooter";
import tw, { styled } from "twin.macro";
import ShareSideBar from "@src/components/ShareSideBar";
import SidePostSet, {
	SidePostSetProps,
} from "@src/components/post/SidePostSet";
import useSWR from "swr";
import { sanityFetcher } from "@src/lib/swr";
import { NUMBER_CONSTANTS } from "@src/assets/constants/StyleConstants";
import { SanityClientErrorResponse } from "sanity";
import Loading from "@src/components/Loading";
import Broken from "@src/components/Broken";
import * as sanityDataService from "@src/service/sanityDataService";
import RelatedPostSet from "@src/components/post/RelatedPostSet";
import CenteredElementWithLine from "@src/components/CenteredElementWithLine";
import { useCurrentLocation, usePostComments } from "@src/hooks";
import CommentSet from "@src/components/post/CommentSet";

// TODO: router.fallback
const Post = ({
	post,
	sidePosts: initialSidePosts,
	relatedPosts: initialRelatedPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	/* --------------------------------- STATES --------------------------------- */
	// Post's comments
	const comments = usePostComments(post._id);
	console.log(comments);
	// Full location to current page
	const currentLocation = useCurrentLocation();

	// fetch sidePosts
	const { data: sidePosts, error: sidePostsError } = useSWR<
		SidePostSetProps["posts"],
		SanityClientErrorResponse
	>(SIDE_POSTS_QUERY, sanityFetcher, {
		initialData: initialSidePosts,
		refreshInterval: NUMBER_CONSTANTS.refreshInterval,
	});

	// TODO: fixed server fetch !== client fetch (probably category different)
	// fetch relatedPosts
	const { data: relatedPosts, error: relatedPostsError } = useSWR<
		sanityDataService.RelatedPostsProps[],
		SanityClientErrorResponse
	>(
		sanityDataService.getRelatedPosts.query,
		sanityDataService.getRelatedPosts.fetch.bind(this, post.categories[0].slug),
		{
			initialData: initialRelatedPosts,
			refreshInterval: NUMBER_CONSTANTS.refreshInterval,
		}
	);

	/* --------------------------------- RENDER --------------------------------- */

	const { categories, rawContent } = post;

	const renderedSidePosts = renderPosts(
		sidePosts,
		sidePostsError,
		<SidePostSet posts={sidePosts!} title="Lastest Posts" />
	);

	const renderedRelatedPosts = renderPosts(
		relatedPosts,
		relatedPostsError,
		<RelatedPostSet posts={relatedPosts!} />
	);

	return (
		<>
			<Head>
				<title>{post.title}</title>
			</Head>

			<PostHeader
				data={{
					...post,
					category: categories[0],
					readMinute: calculateReadingMinutes(rawContent),
				}}
			/>
			<ContentLayout>
				<ShareSideBar sharingUrl={currentLocation?.href ?? ""} />
				<PostBody data={post} />
				{renderedSidePosts}
			</ContentLayout>

			<ContentLayout>
				<PostFooter data={post} />

				<CommentSet _postId={post._id} comments={comments} />

				<CenteredElementWithLine>
					<Title>Related posts</Title>
				</CenteredElementWithLine>
				{renderedRelatedPosts}
			</ContentLayout>
		</>
	);
};

function renderPosts<P extends any[], E extends SanityClientErrorResponse>(
	posts: P | undefined,
	error: E | undefined,
	Component: JSX.Element
): ReactElement {
	let renderedPosts = (
		<Loading height="10rem" loadingText="Fetching posts..." />
	);

	if (error) {
		renderedPosts = (
			<Broken errorText="Fail to fetch posts :(" height="10rem" />
		);
	}

	if (posts) {
		renderedPosts = Component;
	}

	return renderedPosts;
}

type ContentLayoutProps = {};
const ContentLayout = styled.div<ContentLayoutProps>`
	${tw`space-y-10`}
	display: grid;
	grid-template-columns: 5% 1fr 25%;
	padding: 0 10% 0 2.5%;
	gap: 0 5%;

	& > *:not(aside) {
		grid-column: 2/3;
	}
`;

type TitleProps = {};
const Title = styled.span<TitleProps>`
	${tw`text-xl font-600`}
`;

export default Post;

/* -------------------------------------------------------------------------- */
/*                                 SERVER-SIDE                                */
/* -------------------------------------------------------------------------- */

type Post = {
	_id: string;
	categories: {
		title: string;
		slug: string;
	}[];
	rawContent: string;
	title: string;
	thumbnailSrc: string;
	body: any;
	author: {
		name: string;
		avatarSrc: string;
		slug: string;
		bio: any;
	};
	publishedAt: string;
};

const SIDE_POSTS_QUERY = `
		*[_type == "post" && !isArchived && !isPinned] | order(_updatedAt desc) {
			title,
			"slug": slug.current,
			publishedAt,
			"category": categories[] -> {title, "slug": slug.current}[0],
			"image": mainImage {
				alt,
				"url": asset -> url
			}
		}[0...3]
	`;

export const getStaticProps: GetStaticProps<
	{
		post: Post;
		sidePosts: SidePostSetProps["posts"];
		relatedPosts: sanityDataService.RelatedPostsProps[];
	},
	{ slug: string }
> = async ({ params }) => {
	const post = await sanityClient.fetch<Post>(
		`
        *[slug.current == $slug] {
						_id,
						"categories": categories[] -> {title, "slug": slug.current},
            title,
            "thumbnailSrc": mainImage.asset -> url,
						body[] {
							...,
							markDefs[] {
								...,
								_type == "internalLink" => {
									...,
									"url": "/" + @.post->slug.current,
								}
							}
						},
						author -> {
							name,
							"slug": slug.current,
							"avatarSrc": image.asset -> url,
							bio
						},
						publishedAt,
						rawContent
        }[0]
    `,
		{
			slug: params?.slug,
		}
	);

	const relatedPosts = await sanityDataService.getRelatedPosts.fetch(
		post.categories[0].slug
	);

	const sidePosts = await sanityClient.fetch<SidePostSetProps["posts"]>(
		SIDE_POSTS_QUERY
	);

	return {
		props: { post, sidePosts, relatedPosts },
		revalidate: 1,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await sanityClient.fetch<{ slug: { current: string } }[]>(
		`*[_type == "post"]{slug{current}}`
	);

	const paths = posts.map((post) => ({ params: { slug: post.slug.current } }));

	return {
		paths,
		fallback: false,
	};
};
