import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import sanityClient from "@src/lib/sanity/client";
import Head from "next/head";
import Comment, { FirestoreComment } from "@src/components/Comment";
import db from "@src/lib/firebase/db";
import { calculateReadingMinutes } from "@src/utils";
import PostHeader from "@src/components/post/PostHeader";
import PostBody from "@src/components/post/PostBody";

// TODO: router.fallback
const Post = ({
	post,
	sidePosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const [comments, setComments] = useState<PostComment[]>([]);

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
		category,
		rawContent,
		publishedAt,
	} = post;

	const headerData = {
		thumbnailSrc,
		category,
		title,
		author,
		publishedAt,
		readMinute: calculateReadingMinutes(rawContent),
	};

	return (
		<>
			<Head>
				<title>{post.title}</title>
			</Head>

			<PostHeader data={headerData} />
			<PostBody data={{ body, sidePosts, category, title }} />
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
	category: {
		title: string;
		slug: string;
	};
	rawContent: string;
	title: string;
	thumbnailSrc: string;
	body: any;
	author: {
		name: string;
		imageUrl: string;
	};
	publishedAt: string;
};

type SidePost = {
	title: string;
	slug: string;
	publishedAt: string;
	thumbnail: {
		url: string;
		alt?: string;
	};
};

// TODO: multi category
export const getStaticProps: GetStaticProps<
	{ post: Post; sidePosts: SidePost[] },
	{ slug: string }
> = async ({ params }) => {
	const posts = await sanityClient.fetch<Omit<Post, "comments">[]>(
		`
        *[slug.current == $slug] {
						_id,
						"category": categories[] -> {title, "slug": slug.current}[0],
            title,
            "thumbnailSrc": mainImage.asset -> url,
						body,
						author -> {
							name,
							"imageUrl": image.asset -> url
						},
						publishedAt,
						rawContent
        }
    `,
		{
			slug: params?.slug,
		}
	);

	const sidePosts = await sanityClient.fetch<SidePost[]>(`
		*[_type == "post" && !isArchived && !isPinned] | order(_updatedAt desc) {
			title,
			"slug": slug.current,
			publishedAt,
			"category": categories[] -> {title, "slug": slug.current}[0],
			"thumbnail": mainImage {
				alt,
				"url": asset -> url
			}
		}[0...3]
	`);

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

export default Post;
