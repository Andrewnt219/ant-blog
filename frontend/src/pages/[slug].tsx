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

// TODO: router.fallback
const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
	const authorImageSource = urlFor(post.authorImage).width(50).url();
	const heroImageSource = urlFor(post.mainImage).url();
	const [comments, setComments] = useState<PostComment[]>([]);

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

	return (
		<>
			<Head>
				<title>{post.title}</title>
			</Head>

			<div style={{ width: "80ch", maxWidth: "80%", margin: "2rem auto" }}>
				{heroImageSource ? (
					<img
						style={{ width: "100%", height: "30rem", objectFit: "cover" }}
						alt="Hero"
						src={heroImageSource}
					/>
				) : (
					<Loading />
				)}
				<h1 style={{ fontSize: "3em" }}>{post.title}</h1>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
					}}
				>
					{authorImageSource ? (
						<img
							style={{ borderRadius: "50%", marginRight: "1em" }}
							alt={post.name}
							src={authorImageSource}
						/>
					) : (
						<Loading />
					)}
					<span>{post.name}</span>
				</div>
				<BlockContent
					blocks={post.body}
					projectId={sanityClient.config().projectId}
					dataset={sanityClient.config().dataset}
					serializers={postSerializer}
					imageOptions={{ fit: "clip", auto: "format" }}
				/>
			</div>
			<Comment _postId={post._id} />

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
	title: string;
	slug: {
		current: string;
		_type: "slug";
	};
	mainImage: {
		asset: {
			url: string;
			_id: string;
		};
	};
	body: any;
	name: string;
	authorImage: string;
};

export const getStaticProps: GetStaticProps<
	{ post: Post },
	{ slug: string }
> = async ({ params }) => {
	const posts = await sanityClient.fetch<Omit<Post, "comments">[]>(
		`
        *[slug.current == $slug] {
						_id,
            title,
            slug,
            mainImage {
                asset -> {
                    _id,
                    url
                }
            },
						body,
            "name": author->name,
            "authorImage": author->image
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

export default Post;
