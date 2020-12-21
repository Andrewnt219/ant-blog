import {
	NUMBER_CONSTANTS,
	STYLE_CONSTANTS,
} from "@src/assets/constants/StyleConstants";
import { RecentPost } from "@src/components/post/RecentPostSet";
import SidePostSet from "@src/components/post/SidePostSet";
import { useCategoryPageContent, useQueryPaginationItems } from "@src/hooks";
import SidebarLayout from "@src/layouts/SidebarLayout";
import { SanityDataService } from "@src/service/sanity/sanity.data-service";
import { createSrcSet, renderPosts } from "@src/utils";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { ReactElement, useMemo, useRef } from "react";
import tw, { styled, theme } from "twin.macro";
import { lqipBackground } from "@src/utils";
import Pagination from "@src/components/Pagination";
import { CategoryPageContent } from "@src/model/CategoryPageContent";
import Loading from "@src/components/Loading";
import Broken from "@src/components/Broken";

type Props = InferGetServerSidePropsType<typeof getServerSideProps> & {};

function Category({ prefetchedContent }: Props): ReactElement {
	const { data: content, error } = useCategoryPageContent(prefetchedContent);

	const { items } = useQueryPaginationItems({
		count: Math.ceil(content.postsCount / NUMBER_CONSTANTS.defaultPerPage),
	});

	const {
		currentCategory: {
			thumbnail: { url },
		},
	} = content;

	const srcset = useMemo(
		() =>
			createSrcSet(url, {
				format: "webp",
				quality: 50,
			}),
		[url]
	);

	const headerRef = useRef<HTMLElement | null>(null);

	const onPaginationItemClicked = () => {
		setTimeout(() => {
			headerRef.current?.scrollIntoView();
		}, 300);
	};

	if (!content) {
		return <Loading height="20rem" />;
	}

	if (error) {
		return <Broken height="20rem" />;
	}

	const renderedSidePosts = renderPosts(
		content.sidePosts,
		error,
		<SidePostSet
			posts={content.sidePosts}
			imageSizes={STYLE_CONSTANTS.sidePostsSizes}
			title="Latest posts"
		/>
	);

	return (
		<>
			<Header ref={headerRef}>
				<Thumbnail
					src={content.currentCategory.thumbnail.url}
					srcSet={srcset}
					lqip={content.currentCategory.thumbnail.metadata.lqip}
					sizes="100vw"
				/>
				<Heading>
					Category
					<CategoryName>{content.currentCategory.title}</CategoryName>
				</Heading>
			</Header>

			<SidebarLayout>
				<Main>
					<PostSetContainer>
						{content.posts.map((post) => (
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

				<Pagination items={items} onItemClicked={onPaginationItemClicked} />
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

type PostSetContainerProps = {};
const PostSetContainer = styled.ul<PostSetContainerProps>`
	${tw`space-y-10`}
`;

/* -------------------------------------------------------------------------- */
/*                                 SERVER CODE                                */
/* -------------------------------------------------------------------------- */

type ServerProps = {
	prefetchedContent: CategoryPageContent;
};
type Params = {
	category: string;
};

export const getServerSideProps: GetServerSideProps<
	ServerProps,
	Params
> = async ({ params, query }) => {
	const prefetchedContent = await SanityDataService.getInstance().getCategoryPageContent(
		params!.category,
		query.page ? +query.page : 1,
		NUMBER_CONSTANTS.defaultPerPage
	);

	return {
		props: { prefetchedContent },
	};
};

export default Category;
