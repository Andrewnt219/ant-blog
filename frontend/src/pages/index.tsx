import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import React from 'react';
import useSWR from 'swr';
import { styled, theme } from 'twin.macro';

import { NUMBER_CONSTANTS, STYLE_CONSTANTS } from '@src/assets/constants/StyleConstants';
import Broken from '@src/components/Broken';
import PinnedPostSet from '@src/components/post/PinnedPostSet';
import PostPreviewSet from '@src/components/post/PostPreviewSet';
import RecentPostSet from '@src/components/post/RecentPostSet';
import SidePostSet from '@src/components/post/SidePostSet';
import { sanityFetcher } from '@src/lib/swr';
import { HomePostModel } from '@src/model/sanity';
import { SanityDataService } from '@src/service/sanity/sanity.data-service';
import { HOME_POSTS_QUERY } from '@src/service/sanity/sanity.query';

const Index = ({
	prefetchedPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const { data: posts } = useSWR<HomePostModel[]>(
		HOME_POSTS_QUERY,
		sanityFetcher,
		{
			initialData: prefetchedPosts ?? [],
			refreshInterval: NUMBER_CONSTANTS.refreshInterval,
		}
	);

	return !posts || posts.length === 0 ? (
		<>
			<Broken height="20rem" errorText="Something went wrong" />
		</>
	) : (
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
			{/* TODO adjusted sizes */}
			<PostPreviewSet
				imageSizes=", 25vw"
				posts={posts.filter((post) => !post.isPinned)}
			/>

			<h2 style={{ fontSize: "1.5em", margin: "1.5em 0", marginLeft: ".5em" }}>
				Recent
			</h2>

			<Recent>
				{/* TODO adjusted sizes, note the main image is bigger */}
				<RecentPostSet
					imageSizes=", 25vw"
					posts={posts.filter((post) => !post.isPinned)}
				/>

				{/* TODO adjusted sizes */}
				<SidePostSet
					imageSizes=", 10vw"
					posts={posts.filter((post) => !post.isPinned).slice(0, 3)}
					title="Latest"
				/>
			</Recent>

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

export const getStaticProps: GetStaticProps<{
	prefetchedPosts: HomePostModel[] | null;
}> = async () => {
	try {
		const posts = await SanityDataService.getInstance().getHomePosts();
		return {
			props: { prefetchedPosts: posts },
			revalidate: 1,
		};
	} catch (error) {
		console.log(error);

		return {
			props: { prefetchedPosts: null },
			revalidate: 1,
		};
	}
};

type MainProps = {};
const Main = styled.main<MainProps>`
	padding: 2rem ${STYLE_CONSTANTS.mobileBodyPadding};
	margin: 0 auto;

	@media screen and (min-width: ${theme`screens.smTablet`}) {
		padding: 2rem ${STYLE_CONSTANTS.bodyPadding};
	}
`;

type RecentProps = {};
const Recent = styled.section<RecentProps>`
	display: grid;

	& > aside {
		display: none;
	}

	@media screen and (min-width: ${theme`screens.smDesktop`}) {
		grid-template-columns: 65% 30%;
		column-gap: 5%;

		& > aside {
			display: block;
		}
	}
`;

export default Index;
