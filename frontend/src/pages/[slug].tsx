import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import sanityClient from "@src/lib/sanity/client";
import BlockContent from "@sanity/block-content-to-react";
import Head from "next/head";
import Loading from "@src/components/Loading";
import { urlFor } from "@src/lib/sanity/utils/sanityUtils";
import { postSerializer } from "@src/lib/sanity/serializers/postSerializer";
import Comment, { FirestoreComment } from "@src/components/Comment";
import db from "@src/lib/firebase/db";
import Image from "next/image";
import { styled } from "twin.macro";
import { calculateReadingMinutes } from "@src/utils";
import PostHeader from "@src/components/post/PostHeader";

// TODO: router.fallback
const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
		slug,
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
			<MainLayout>
				<BlockContent
					blocks={body}
					projectId={sanityClient.config().projectId}
					dataset={sanityClient.config().dataset}
					serializers={postSerializer}
					imageOptions={{ fit: "clip", auto: "format" }}
				/>
			</MainLayout>
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
	slug: {
		current: string;
		_type: "slug";
	};
	thumbnailSrc: string;
	body: any;
	author: {
		name: string;
		imageUrl: string;
	};
	publishedAt: string;
};

// TODO: multi category
export const getStaticProps: GetStaticProps<
	{ post: Post },
	{ slug: string }
> = async ({ params }) => {
	const posts = await sanityClient.fetch<Omit<Post, "comments">[]>(
		`
        *[slug.current == $slug] {
						_id,
						"category": categories[] -> {title, "slug": slug.current}[0],
            title,
            slug,
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

	return {
		props: { post: posts[0] },
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

type MainLayoutProps = {};
const MainLayout = styled.main<MainLayoutProps>`
	width: min(80ch, 80%);
	margin: 0 auto;
`;

export default Post;
