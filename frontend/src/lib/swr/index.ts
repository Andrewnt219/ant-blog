import sanityClient from "@src/lib/sanity/client";
import { SanityDataService } from "@src/service/sanity/sanity.data-service";

/**
 * Interface for useSWR
 * @param args [0] query string, [1] params object
 */
export const sanityFetcher = (...args: any[]) =>
	sanityClient.fetch(args[0], args[1]);

export const homePageContentFetcher = (page: number, perPage?: number) =>
	SanityDataService.getInstance().getHomePageContent(page, perPage);

export const categoryPageContentFetcher = (
	categorySlug: string,
	page: number,
	perPage?: number
) =>
	SanityDataService.getInstance().getCategoryPageContent(
		categorySlug,
		page,
		perPage
	);

export const sanityDataServiceFetcher = (
	query: string,
	params: { [key: string]: any }
) => SanityDataService.getInstance().get(query, params);
