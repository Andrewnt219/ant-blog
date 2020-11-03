import React from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { styled, theme } from "twin.macro";
import { STYLE_CONSTANTS } from "@src/assets/constants/StyleConstants";
import PinnedPostSet from "@src/components/post/PinnedPostSet";
import sanityClient from "@src/lib/sanity/client";
import PostPreviewSet from "@src/components/post/PostPreviewSet";
import RecentPostSet from "@src/components/post/RecentPostSet";

const Index = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<Main>
			<Head>
				<title>Welcome to my blog</title>
			</Head>

			<PinnedPostSet
				posts={posts.filter((post) => post.isPinned).slice(0, 3)}
			/>

			<h2 style={{ fontSize: "1.5em", margin: "1.5em 0", marginLeft: ".5em" }}>
				Others
			</h2>
			<PostPreviewSet posts={posts.filter((post) => !post.isPinned)} />

			<h2 style={{ fontSize: "1.5em", margin: "1.5em 0", marginLeft: ".5em" }}>
				Recent
			</h2>
			<RecentPostSet posts={posts.filter((post) => !post.isPinned)} />

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

			<h2>
				This site is not mobile-friendly, yet. Color palette does not make sense
			</h2>
		</Main>
	);
};

type Post = {
	isPinned: boolean;
	title: string;
	slug: string;
	publishedAt: string;
	category: {
		title: string;
		slug: string;
	};
	contentSnippet: string;
	author: string;
	rawContent: string;
	snippet: string;
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
			*[_type == "post" && !isArchived] | order(_updatedAt desc) {
				isPinned,
				title,
				"slug": slug.current,
				publishedAt,
				"category": categories[] -> {title, "slug": slug.current}[0],
				"author": author -> name,
				rawContent,
				"image": mainImage {
					alt,
					"url": asset -> url
				},
				snippet
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
	padding: 2rem ${STYLE_CONSTANTS.mobileBodyPadding};
	margin: 0 auto;

	@media screen and (min-width: ${theme`screens.smTablet`}) {
		padding: 2rem ${STYLE_CONSTANTS.bodyPadding};
	}
`;
export default Index;
