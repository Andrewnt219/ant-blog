import React, { useState } from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import sanityClient from "@src/lib/sanity";
import BlockContent from "@sanity/block-content-to-react";
import Head from "next/head";
import Loading from "@src/components/Loading";
import { urlFor } from "@src/utils/sanityUtils";
import { postSerializer } from "@src/serializers/postSerializer";
import Comment from "@src/components/Comment";
const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
	const authorImageSource = urlFor(post.authorImage).width(50).url();
	const heroImageSource = urlFor(post.mainImage).url();
	const [temporaryComment, setTemporaryComment] = useState<PostComment | null>(
		null
	);
	const onCommentSubmitted = (
		data: Omit<PostComment, "_id" | "_createdAt">
	) => {
		setTemporaryComment({
			...data,
			_id: new Date().toLocaleDateString() + Math.floor(Math.random() * 10),
			_createdAt: new Date().toLocaleDateString(),
		});
	};
	const concatedPostComments: PostComment[] = temporaryComment
		? [temporaryComment, ...post.comments]
		: post.comments;

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
			<Comment _postId={post._id} submitHandler={onCommentSubmitted} />
			{/* TODO use onSnapShot from firebase instead */}
			{concatedPostComments.map((comment) => (
				<>
					<li key={comment._id}>
						<h3>{comment.name}</h3>
						<p>{comment.text}</p>
					</li>
					<hr />
				</>
			))}
		</>
	);
};

type PostComment = {
	_id: string;
	name: string;
	text: string;
	_createdAt: string;
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
	comments: PostComment[];
};

export const getStaticProps: GetStaticProps<
	{ post: Post },
	{ slug: string }
> = async ({ params }) => {
	const posts = await sanityClient.fetch<Post[]>(
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
						"comments": *[_type == "comment" && post._ref == ^._id] {
							_id,
							name,
							text,
							_createdAt
						},
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
