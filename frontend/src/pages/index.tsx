import React, { useState } from "react";
import Link from "next/link";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import sanityClient from "@src/lib/sanity/client";
import Head from "next/head";
import EmbeddedSpotify from "@src/components/EmbeddedSpotify";
import { styled } from "twin.macro";
import dayjs from "dayjs";
import { calculateReadingMinutes } from "@src/utils";
const Index = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
	const [spotifyLink, setSpotifyLink] = useState(
		"https://open.spotify.com/playlist/2AwCV9pHpQHFjn2UOeClsy?si=iQVkTAM1RS6F_p5P3ZHLTg"
	);

	return (
		<Main>
			<Head>
				<title>Welcome to my blog</title>
			</Head>

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

			<div>
				{posts.map((post) => (
					<article key={post.slug} style={{ margin: "2rem" }}>
						<img
							alt={post.title}
							src={post.mainImage.asset.url}
							style={{
								height: "200px",
								width: "auto",
							}}
						/>
						<span>{post.categories[0]}</span>
						<h2>
							<Link href={"/" + post.slug}>
								<a>{post.title}</a>
							</Link>
						</h2>

						<p>{post.author}</p>
						<p>{dayjs(post.publishedAt).format("MMM DD YYYY").toUpperCase()}</p>
						<p>{calculateReadingMinutes(post.rawContent)}</p>
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
			/>
			<EmbeddedSpotify spotifyShareLink={spotifyLink} />
		</Main>
	);
};

type Post = {
	title: string;
	slug: string;
	publishedAt: string;
	categories: string[];
	contentSnippet: string;
	author: string;
	rawContent: string;
	mainImage: {
		alt?: string;
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
		`
			*[_type == "post" && !isArchived]{
				title,
				"slug": slug.current,
				publishedAt,
				"categories": categories[] -> title,
				"author": author -> name,
				rawContent,
				mainImage {
					alt,
					asset -> {
						_id, 
						url
					}
				}
			}
		`
	);

	return {
		props: { posts },
		revalidate: 1,
	};
};

type MainProps = {};
const Main = styled.main<MainProps>`
	width: 75%;
	margin: 0 auto;
`;

export default Index;
