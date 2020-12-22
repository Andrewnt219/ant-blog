import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React from "react";
import tw, { styled, theme } from "twin.macro";

import {
	NUMBER_CONSTANTS,
	STYLE_CONSTANTS,
} from "@src/assets/constants/StyleConstants";
import Broken from "@src/components/Broken";
import PinnedPostSet from "@src/components/post/PinnedPostSet";
import MostViewedPostSet from "@src/components/post/MostViewedPostSet";
import RecentPostSet from "@src/components/post/RecentPostSet";
import { SanityDataService } from "@src/service/sanity/sanity.data-service";
import { HomePageContent } from "@src/model/HomePageContent";
import Loading from "@src/components/Loading";
import { useHomePageContent } from "@src/hooks";
import CategorySideBar from "@src/components/post/CategorySideBar";

const Index = ({
	prefetchedContent,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const { data: content, error } = useHomePageContent(prefetchedContent);

	if (error) {
		return <Broken height="20rem" errorText="Something went wrong" />;
	}

	return !content ? (
		<Loading height="10rem" />
	) : (
		<Main>
			<Head>
				<title>Welcome to my blog</title>
			</Head>
			<section>
				<PinnedPostSet
					posts={content.pinnedPosts}
					imageSizes={{
						default:
							"(min-width: 1280px) 22.79vw, (min-width: 640px) 40vw, (min-width: 480px) 45vw, 90vw",
						main:
							"(min-width: 1280px) 34.19vw, (min-width: 640px) 80vw, 90.63vw",
					}}
				/>
			</section>

			<section>
				<Heading>Most viewed</Heading>

				<MostViewedPostSet
					imageSizes="(min-width: 1020px) 25.61vw, (min-width: 680px) 40vw, (min-width: 640px) 80vw, 90vw"
					posts={content.mostViewedPosts}
				/>
			</section>

			<section>
				<Heading id="recent-posts-header">Recent</Heading>

				<Recent>
					<RecentPostSet
						numberOfPages={Math.ceil(
							content.postsCount / NUMBER_CONSTANTS.defaultPerPage
						)}
						imageSizes={STYLE_CONSTANTS.recentPostSizes}
						posts={content.recentPosts}
					/>

					<CategorySideBar data={content.featuredCategories} />
				</Recent>
			</section>
		</Main>
	);
};

type ServerProps = {
	prefetchedContent: HomePageContent | null;
};

type Query = {
	page: string;
	perPage: string;
};

export const getServerSideProps: GetServerSideProps<
	ServerProps,
	Query
> = async ({ query }) => {
	try {
		const prefetchedContent = await SanityDataService.getInstance().getHomePageContent(
			query.page ? +query.page : 1
		);

		return {
			props: { prefetchedContent },
		};
	} catch (error) {
		console.log(error);

		return {
			props: { prefetchedContent: null },
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

type HeadingProps = {};
const Heading = styled.h1<HeadingProps>`
	${tw`text-3xl my-8 ml-4 `}

	::after {
		content: "";
		${tw`h-1 w-5 bg-accent block`}
	}
`;

export default Index;
