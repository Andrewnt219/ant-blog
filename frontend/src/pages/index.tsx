import React, { useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import sanityClient from "@src/lib/sanity/client";
import Head from "next/head";
import EmbeddedSpotify from "@src/components/EmbeddedSpotify";
import { styled, theme } from "twin.macro";
import PinnedPost from "@src/components/post/PinnedPost";
import "@brainhubeu/react-carousel/lib/style.css";
import Carousel from "@brainhubeu/react-carousel";

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

			<Carousel arrows slidesPerPage={3} infinite>
				{posts
					.filter((post) => post.isPinned)
					.map((post) => (
						<PinnedPost key={post.slug} data={post} />
					))}
			</Carousel>

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
const PinnedPosts = styled.div<PinnedPostsProps>``;

export default Index;
