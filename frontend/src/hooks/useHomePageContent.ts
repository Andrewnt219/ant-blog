import { NUMBER_CONSTANTS } from "@src/assets/constants/StyleConstants";
import { homePageContentFetcher } from "@src/lib/swr";
import { HomePageContent } from "@src/model/HomePageContentModel";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR, { ConfigInterface } from "swr";

const defaultData: HomePageContent = {
	pinnedPosts: [],
	mostViewedPosts: [],
	recentPosts: [],
	postsCount: 0,
};

export const useHomePageContent = (
	prefetchedContent: HomePageContent | null,
	config?: Omit<ConfigInterface, "initialData" | "refreshInterval">
) => {
	const { query } = useRouter();

	const result = useSWR<HomePageContent>(
		[query.page ? +query.page : 1],
		homePageContentFetcher,
		{
			...config,
			initialData: prefetchedContent ?? defaultData,
			refreshInterval: NUMBER_CONSTANTS.refreshInterval,
		}
	);

	const { revalidate } = result;

	useEffect(() => {
		revalidate();
	}, [query.page, revalidate]);

	return { ...result };
};
