import { STYLE_CONSTANTS } from "@src/assets/constants/StyleConstants";
import { RecentPost } from "@src/components/post/RecentPostSet";
import SidePostSet from "@src/components/post/SidePostSet";
import SidebarLayout from "@src/layouts/SidebarLayout";
import { HomePostModel, SidePostModel } from "@src/model/sanity";
import { SanityDataService } from "@src/service/sanity/sanity.data-service";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import React, { ReactElement } from "react";
import tw, { styled, theme } from "twin.macro";

// TODO make useSWR hook for sidePosts and add it here too
// TODO add header with category name
type Props = InferGetStaticPropsType<typeof getStaticProps> & {};

function Category({ posts, latestPosts }: Props): ReactElement {
	return (
		<SidebarLayout>
			<Main>
				<PostSetContainer>
					{posts.map((post) => (
						<li key={post.slug}>
							<RecentPost
								isMain
								data={post}
								imageSizes={STYLE_CONSTANTS.recentPostSizes}
							/>
						</li>
					))}
				</PostSetContainer>
			</Main>

			<SidePostSet
				posts={latestPosts}
				imageSizes={STYLE_CONSTANTS.sidePostsSizes}
				title="Latest posts"
			/>

			{/* TODO add pagination */}
		</SidebarLayout>
	);
}

type MainProps = {};
const Main = styled.main<MainProps>`
	padding: 2rem 0;
`;
type StaticProps = {
	posts: HomePostModel[];
	latestPosts: SidePostModel[];
};

type PostSetContainerProps = {};
const PostSetContainer = styled.ul<PostSetContainerProps>`
	${tw`space-y-10`}
`;

type Params = {
	category: string;
};
export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
	params,
}) => {
	const posts = await SanityDataService.getInstance().getPostsByCategory(
		params!.category
	);

	const latestPosts = await SanityDataService.getInstance().getSidePosts();

	return {
		props: { posts, latestPosts },
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const categories = await SanityDataService.getInstance().getCategories();

	const paths = categories.map((category) => ({
		params: { category: category.slug },
	}));

	return {
		paths,
		fallback: false,
	};
};

export default Category;
