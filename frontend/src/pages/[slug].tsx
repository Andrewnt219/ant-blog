import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";
import { SanityClientErrorResponse } from "sanity";
import useSWR from "swr";
import tw, { styled, theme } from "twin.macro";

import {
	NUMBER_CONSTANTS,
	STYLE_CONSTANTS,
} from "@src/assets/constants/StyleConstants";
import Broken from "@src/components/Broken";
import CenteredElementWithLine from "@src/components/CenteredElementWithLine";
import Loading from "@src/components/Loading";
import CommentSet from "@src/components/post/CommentSet";
import PostBody from "@src/components/post/PostBody";
import PostFooter from "@src/components/post/PostFooter";
import PostHeader from "@src/components/post/PostHeader";
import RelatedPostSet from "@src/components/post/RelatedPostSet";
import SidePostSet from "@src/components/post/SidePostSet";
import ShareSideBar from "@src/components/ShareSideBar";
import { useCurrentLocation, usePostComments } from "@src/hooks";
import { sanityFetcher } from "@src/lib/swr";
import { PostModel } from "@src/model/sanity";
import { RelatedPostsModel } from "@src/model/sanity/RelatedPostModel";
import { SidePostModel } from "@src/model/sanity/SidePostModel";
import { SanityDataService } from "@src/service/sanity/sanity.data-service";
import * as sanityQueries from "@src/service/sanity/sanity.query";
import { blocksToText, calculateReadingMinutes } from "@src/utils";

// TODO: router.fallback
const Post = ({
	post,
	sidePosts: initialSidePosts,
	relatedPosts: initialRelatedPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	/* --------------------------------- STATES --------------------------------- */
	// Post's comments
	const comments = usePostComments(post._id);

	// Full location to current page
	const currentLocation = useCurrentLocation();

	// fetch sidePosts
	const { data: sidePosts, error: sidePostsError } = useSWR<
		SidePostModel[],
		SanityClientErrorResponse
	>(sanityQueries.SIDE_POSTS_QUERY, sanityFetcher, {
		initialData: initialSidePosts,
		refreshInterval: NUMBER_CONSTANTS.refreshInterval,
	});

	// TODO: fixed server fetch !== client fetch (probably category different)
	// fetch relatedPosts
	const { data: relatedPosts, error: relatedPostsError } = useSWR<
		RelatedPostsModel[],
		SanityClientErrorResponse
	>(
		sanityQueries.RELATED_POSTS_QUERY,
		SanityDataService.getInstance().getRelatedPosts.bind(
			this,
			post.categories[0].slug,
			post._id
		),
		{
			initialData: initialRelatedPosts,
			refreshInterval: NUMBER_CONSTANTS.refreshInterval,
		}
	);

	/* --------------------------------- RENDER --------------------------------- */

	const { categories } = post;

	// TODO adjusted imageSizes
	const renderedSidePosts = renderPosts(
		sidePosts,
		sidePostsError,
		<SidePostSet imageSizes=", 10vw" posts={sidePosts!} title="Lastest Posts" />
	);

	// TODO: adjust imageSizes
	const renderedRelatedPosts = renderPosts(
		relatedPosts,
		relatedPostsError,
		<RelatedPostSet imageSizes=", 25vw" posts={relatedPosts!} />
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
					readMinute: calculateReadingMinutes(blocksToText(post.body)),
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
	let renderedPosts = <Loading height="10rem" loadingText="Fetching posts" />;

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
	padding: 0 ${STYLE_CONSTANTS.mobileBodyPadding};

	& > aside {
		display: none;
	}

	@media screen and (min-width: ${theme`screens.smDesktop`}) {
		gap: 0 5%;
		padding: 0 10% 0 2.5%;
		grid-template-columns: 5% 65ch 1fr;

		& > *:not(aside) {
			grid-column: 2/3;
		}

		& > aside {
			display: block;
		}
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
type StaticProps = {
	post: PostModel;
	sidePosts: SidePostModel[];
	relatedPosts: RelatedPostsModel[];
};

type Params = {
	slug: string;
};

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
	params,
}) => {
	const post = await SanityDataService.getInstance().getPost(params!.slug);

	const relatedPosts = await SanityDataService.getInstance().getRelatedPosts(
		post.categories[0].slug,
		post._id
	);

	const sidePosts = await SanityDataService.getInstance().getSidePosts();

	return {
		props: { post, sidePosts, relatedPosts },
		revalidate: 1,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const postSlugSet = await SanityDataService.getInstance().getPostsSlug();

	const paths = postSlugSet.map((post) => ({
		params: { slug: post.slug.current },
	}));

	return {
		paths,
		fallback: false,
	};
};
