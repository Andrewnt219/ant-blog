import React, { useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import sanityClient from "@src/lib/sanity/client";
import Head from "next/head";
import EmbeddedSpotify from "@src/components/EmbeddedSpotify";
import { styled, theme } from "twin.macro";
import PinnedPost from "@src/components/post/PinnedPost";

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

			<PinnedPosts>
				{posts
					.filter((post) => post.isPinned)
					.map((post, index) => (
						<li key={post.slug}>
							<PinnedPost data={post} isMain={index === 0} />
						</li>
					))}
			</PinnedPosts>
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
	isPinned: boolean;
	title: string;
	slug: string;
	publishedAt: string;
	category: string;
	contentSnippet: string;
	author: string;
	rawContent: string;
	image: {
		alt?: string;
		url: string;
	};
};

export const getStaticProps: GetStaticProps<{
	posts: Post[];
}> = async () => {
	const posts = await sanityClient.fetch<Post[]>(
		`
			*[_type == "post" && !isArchived]{
				isPinned,
				title,
				"slug": slug.current,
				publishedAt,
				"category": categories[] -> title[0],
				"author": author -> name,
				rawContent,
				"image": mainImage {
					alt,
					"url": asset -> url
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
	/* max-width: max(1200px, 80%); */
	width: 90%;
	margin: 0 auto;
`;

type PinnedPostsProps = {};
const PinnedPosts = styled.ul<PinnedPostsProps>`
	width: 100%;
	/* font-size: 0.75rem; */
	display: grid;
	/* height: 35rem;
	grid-template-rows: 1.5fr 1fr 1fr;
	grid-template-areas:
		"first "
		"second"
		"third";
 */
	gap: 0.1rem;
	grid-template-columns: 2fr 1fr 1fr;
	height: 15rem;
	font-size: 0.5rem;
`;

export default Index;
