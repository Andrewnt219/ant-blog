import { STYLE_CONSTANTS } from "@src/assets/constants/StyleConstants";
import { RecentPost } from "@src/components/post/RecentPostSet";
import SidePostSet from "@src/components/post/SidePostSet";
import { useSidePosts } from "@src/hooks";
import SidebarLayout from "@src/layouts/SidebarLayout";
import { CategoryModel, HomePostModel, SidePostModel } from "@src/model/sanity";
import { SanityDataService } from "@src/service/sanity/sanity.data-service";
import { createImageSources, createSrcSet, renderPosts } from "@src/utils";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import React, { ReactElement, useMemo } from "react";
import tw, { styled, theme } from "twin.macro";
import { lqipBackground } from "@src/utils";

type Props = InferGetStaticPropsType<typeof getStaticProps> & {};

function Category({
	posts,
	initialSidePosts,
	currentCategory,
}: Props): ReactElement {
	const { data, error } = useSidePosts(initialSidePosts);

	const renderedSidePosts = renderPosts(
		data,
		error,
		<SidePostSet
			posts={data!}
			imageSizes={STYLE_CONSTANTS.sidePostsSizes}
			title="Latest posts"
		/>
	);

	const srcset = useMemo(
		() =>
			createSrcSet(currentCategory.thumbnail.url, {
				format: "webp",
				quality: 50,
			}),
		[currentCategory.thumbnail.url]
	);

	return (
		<>
			<Header>
				<Thumbnail
					src={currentCategory.thumbnail.url}
					srcSet={srcset}
					lqip={currentCategory.thumbnail.metadata.lqip}
					sizes="100vw"
				/>
				<Heading>
					Category
					<CategoryName>{currentCategory.title}</CategoryName>
				</Heading>
			</Header>
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

				{renderedSidePosts}

				{/* TODO add pagination */}
			</SidebarLayout>
		</>
	);
}

type MainProps = {};
const Main = styled.main<MainProps>`
	padding: 2rem 0;
`;

type HeaderProps = {};
const Header = styled.header<HeaderProps>`
	${tw`relative`}
	padding-bottom: min(45%, 15rem);
	width: 100%;
`;

type ThumbnailProps = {
	lqip: string;
};
const Thumbnail = styled.img<ThumbnailProps>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;

	${(p) => lqipBackground(p.lqip)}
`;

type HeadingProps = {};
const Heading = styled.h1<HeadingProps>`
	${tw`text-2xl text-white font-700`}
	${tw`flex flex-col items-center justify-center w-full h-full`}
	${tw`z-10 absolute top-0 left-0`}
	background: rgba(0, 0,0, .7);

	@media screen and (min-width: ${theme`screens.mdTablet`}) {
		${tw`text-4xl`}
	}
`;

type CategoryNameProps = {};
const CategoryName = styled.span<CategoryNameProps>`
	${tw`text-base font-400`}
	${tw`inline-block mt-2`}

	@media screen and (min-width: ${theme`screens.mdTablet`}) {
		${tw`text-xl`}
	}
`;

/* -------------------------------------------------------------------------- */
/*                                 SERVER CODE                                */
/* -------------------------------------------------------------------------- */

type StaticProps = {
	posts: HomePostModel[];
	initialSidePosts: SidePostModel[];
	currentCategory: CategoryModel;
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

	const initialSidePosts = await SanityDataService.getInstance().getSidePosts();

	const currentCategory = await SanityDataService.getInstance().getCategory(
		params!.category
	);

	return {
		props: { posts, initialSidePosts, currentCategory },
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
