import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import sanityClient from "@src/lib/sanity/client";
import Head from "next/head";
import Comment, { FirestoreComment } from "@src/components/Comment";
import db from "@src/lib/firebase/db";
import { calculateReadingMinutes } from "@src/utils";
import PostHeader from "@src/components/post/PostHeader";
import PostBody from "@src/components/post/PostBody";
import PostFooter from "@src/components/post/PostFooter";
import { styled } from "twin.macro";
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

// TODO: router.fallback
const Post = ({
	post,
	sidePosts: initialSidePosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const [comments, setComments] = useState<PostComment[]>([]);

	const [currentLocation, setCurrentLocation] = useState<string>("");

	const { data: sidePosts, error } = useSWR<
		SidePostSetProps["posts"],
		SanityClientErrorResponse
	>(SIDE_POSTS_QUERY, sanityFetcher, {
		initialData: initialSidePosts,
		refreshInterval: NUMBER_CONSTANTS.refreshInterval,
	});

	useEffect(() => {
		setCurrentLocation(window.location.href);
	}, []);

	// Subscribe for live comments
	useEffect(() => {
		const unsubscribe = db
			.collection("comments")
			.where("_postId", "==", post._id)
			.orderBy("_createdAt", "desc")
			.onSnapshot(
				(snapshot) => {
					const comments = snapshot.docs.map((doc) => ({
						...doc.data(),
						id: doc.id,
					})) as PostComment[];
					setComments(comments);
				},
				(error) => {
					setComments([]);
					console.log(error);
				}
			);

		return () => {
			unsubscribe();
		};
	}, [post._id]);

	const {
		_id,
		author,
		body,
		thumbnailSrc,
		title,
		categories,
		rawContent,
		publishedAt,
	} = post;

	const headerData = {
		thumbnailSrc,
		category: categories[0],
		title,
		author,
		publishedAt,
		readMinute: calculateReadingMinutes(rawContent),
	};

	let renderedSidePosts = (
		<Loading height="10rem" loadingText="Fetching posts..." />
	);

	if (error) {
		renderedSidePosts = (
			<Broken errorText="Fail to fetch posts :(" height="10rem" />
		);
	}

	if (sidePosts) {
		renderedSidePosts = <SidePostSet posts={sidePosts} title="Latest Post" />;
	}

	return (
		<>
			<Head>
				<title>{post.title}</title>
			</Head>

			<PostHeader data={headerData} />
			<ContentLayout>
				<ShareSideBar sharingUrl={currentLocation} />
				<PostBody data={{ body, categories, title }} />
				{renderedSidePosts}
				<CustomPostFooter data={{ categories, author }} />
			</ContentLayout>

			<Comment _postId={_id} />

			{comments.map((comment) => (
				<React.Fragment key={comment.id}>
					<li>
						<h3>{comment.name}</h3>
						<p>{comment.text}</p>
						<span>{new Date(comment._createdAt).toLocaleDateString()}</span>
					</li>
					<hr />
				</React.Fragment>
			))}
		</>
	);
};

type PostComment = FirestoreComment & {
	id: string;
};

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
	{ post: Post; sidePosts: SidePostSetProps["posts"] },
	{ slug: string }
> = async ({ params }) => {
	const posts = await sanityClient.fetch<Omit<Post, "comments">[]>(
		`
        *[slug.current == $slug] {
						_id,
						"categories": categories[] -> {title, "slug": slug.current},
            title,
            "thumbnailSrc": mainImage.asset -> url,
						body,
						author -> {
							name,
							"slug": slug.current,
							"avatarSrc": image.asset -> url,
							bio
						},
						publishedAt,
						rawContent
        }
    `,
		{
			slug: params?.slug,
		}
	);

	const sidePosts = await sanityClient.fetch<SidePostSetProps["posts"]>(
		SIDE_POSTS_QUERY
	);

	return {
		props: { post: posts[0], sidePosts },
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

type ContentLayoutProps = {};
const ContentLayout = styled.div<ContentLayoutProps>`
	display: grid;
	grid-template-columns: 10% 1fr 25%;
	padding: 0 10% 0 2.5%;
	gap: 0 5%;
`;

const CustomPostFooter = styled(PostFooter)`
	grid-column: 2/3;
`;

export default Post;
