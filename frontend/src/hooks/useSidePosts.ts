import { NUMBER_CONSTANTS } from "@src/assets/constants/StyleConstants";
import { sanityFetcher } from "@src/lib/swr";
import { SidePostModel } from "@src/model/sanity";
import { SIDE_POSTS_QUERY } from "@src/service/sanity/sanity.query";
import { SanityClientErrorResponse } from "sanity";
import useSWR from "swr";

export const useSidePosts = (initialData: SidePostModel[]) => {
	// fetch sidePosts
	const { data, error } = useSWR<SidePostModel[], SanityClientErrorResponse>(
		SIDE_POSTS_QUERY,
		sanityFetcher,
		{
			initialData,
			refreshInterval: NUMBER_CONSTANTS.refreshInterval,
		}
	);

	return { data, error };
};
