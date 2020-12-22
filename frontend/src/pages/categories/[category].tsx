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
import CategoryPage from "@src/components/page/CategoryPage";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = InferGetServerSidePropsType<typeof getServerSideProps> & {};

function Category({ prefetchedContent }: Props): ReactElement {
	const { back } = useRouter();
	if (prefetchedContent.postsCount === 0) {
		return (
			<>
				<Broken height="20rem" errorText="Wow, such empty, much space" />
				{/* TODO style button */}
				<button onClick={back}>Go back</button>
			</>
		);
	}

	return <CategoryPage prefetchedContent={prefetchedContent} />;
}

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
