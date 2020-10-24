import React, { useState } from "react";
import Link from "next/link";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import sanityClient from "@src/lib/sanity";
import Head from "next/head";
import EmbeddedSpotify from "@src/components/EmbeddedSpotify";

const Index = ({
	posts: fetchedPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const [posts, setPosts] = useState(fetchedPosts);
	const [spotifyLink, setSpotifyLink] = useState("temporary blocked");

	return (
		<>
			<Head>
				<title>Welcome to my blog</title>
			</Head>

			<div style={{ width: "80%", margin: "0  auto" }}>
				<h1>
					To start writing articles, go to{" "}
					<a
						href="http://rosedang.sanity.studio/"
						target="_blank"
						rel="noopener noreferrer"
						style={{ textDecoration: "underline" }}
					>
						studio
					</a>
				</h1>

				<h2>This site is not mobile-friendly, yet</h2>
				<br />
				<br />

				<div
					style={{
						display: "flex",
						alignItems: "center",
						flexWrap: "wrap",
					}}
				>
					{posts.map((post) => (
						<article key={post.slug.current} style={{ margin: "2rem" }}>
							<img
								alt={post.title}
								src={post.mainImage.asset.url}
								style={{
									height: "200px",
									width: "auto",
								}}
							/>

							<h2>
								<Link href={"/" + post.slug.current}>
									<a>{post.title}</a>
								</Link>
							</h2>
						</article>
					))}
				</div>

				<label htmlFor="spotify-link">Enter spotify share link</label>

				<input
					id="spotify-link"
					type="text"
					value={spotifyLink}
					onChange={(e) => setSpotifyLink(e.target.value)}
					style={{
						border: "1px solid black",
						padding: "0.25rem",
						margin: "0.25rem 0",
						display: "block",
						width: "100%",
					}}
					readOnly
				/>
				<EmbeddedSpotify spotifyShareLink="https://open.spotify.com/playlist/2AwCV9pHpQHFjn2UOeClsy?si=3_WRZnkrTZOX8FDfmOis5g" />
			</div>
		</>
	);
};

type Post = {
	title: string;
	slug: {
		_type: "slug";
		current: string;
	};
	mainImage: {
		asset: {
			_id: string;
			url: string;
		};
	};
};

export const getStaticProps: GetStaticProps<{
	posts: Post[];
}> = async () => {
	const posts = await sanityClient.fetch<Post[]>(
		`*[_type == "post"]{title, slug, mainImage {asset -> {_id, url}}}`
	);

	return {
		props: { posts },
		revalidate: 1,
	};
};

export default Index;
