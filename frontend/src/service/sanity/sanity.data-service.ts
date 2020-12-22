import { NUMBER_CONSTANTS } from "@src/assets/constants/StyleConstants";
import sanityClient from "@src/lib/sanity/client";
import { CategoryPageContent } from "@src/model/CategoryPageContent";
import { HomePageContent } from "@src/model/HomePageContent";
import { PostPageContent } from "@src/model/PostPageContent";
import {
	HomePostModel,
	PostModel,
	RelatedPostsModel,
	SidePostModel,
	CategoryModel,
} from "@src/model/sanity";
import { calculateRange } from "@src/utils";

import {
	HOME_POSTS_QUERY,
	POST_QUERY,
	POSTS_SLUG_QUERY,
	RELATED_POSTS_QUERY,
	SIDE_POSTS_QUERY,
	CATEGORIES_QUERY,
	POSTS_BY_CATEGORY_QUERY,
	CATEGORY_QUERY,
	HOME_PAGE_CONTENT_QUERY,
	CATEGORY_PAGE_CONTENT_QUERY,
	SEARCHED_CATEGORIES_QUERY,
	FEATURED_CATEGORY_QUERY,
	POST_PAGE_CONTENT_QUERY,
} from "./sanity.query";

export class SanityDataService {
	private static instance: SanityDataService;
	private static client = sanityClient;

	public static getInstance = () => {
		if (!SanityDataService.instance) {
			SanityDataService.instance = new SanityDataService();
		}

		return SanityDataService.instance;
	};

	get = (query: string, params: { [key: string]: any }) =>
		SanityDataService.client.fetch(query, params);

	getRelatedPosts = (categorySlug: string, postId: string) =>
		SanityDataService.client.fetch<RelatedPostsModel[]>(RELATED_POSTS_QUERY, {
			categorySlug,
			postId,
		});

	getSidePosts = () =>
		SanityDataService.client.fetch<SidePostModel[]>(SIDE_POSTS_QUERY);

	getPost = (slug: string) =>
		SanityDataService.client.fetch<PostModel>(POST_QUERY, {
			slug,
		});

	getPostsSlug = () =>
		SanityDataService.client.fetch<{ slug: { current: string } }[]>(
			POSTS_SLUG_QUERY
		);

	getHomePosts = () =>
		SanityDataService.client.fetch<HomePostModel[]>(HOME_POSTS_QUERY);

	getCategories = (categorySlugs?: string[]) => {
		if (!categorySlugs) {
			return SanityDataService.client.fetch<CategoryModel[]>(CATEGORIES_QUERY);
		}

		return SanityDataService.client.fetch<CategoryModel[]>(
			SEARCHED_CATEGORIES_QUERY,
			{ categorySlugs }
		);
	};

	getPostsByCategory = (
		categorySlug: string,
		page: number | undefined,
		perPage = NUMBER_CONSTANTS.defaultPerPage
	) => {
		const [start, end] = calculateRange(page, perPage);

		return SanityDataService.client.fetch<HomePostModel[]>(
			POSTS_BY_CATEGORY_QUERY,
			{
				categorySlug,
				start,
				end,
			}
		);
	};
	getCategory = (categorySlug: string) =>
		SanityDataService.client.fetch<CategoryModel>(CATEGORY_QUERY, {
			categorySlug,
		});

	getFeaturedCategories = () =>
		SanityDataService.client.fetch<CategoryModel[]>(FEATURED_CATEGORY_QUERY);

	getHomePageContent = (
		page: number | undefined,
		perPage = NUMBER_CONSTANTS.defaultPerPage
	) => {
		const [recentPostStart, recentPostEnd] = calculateRange(page, perPage);

		return SanityDataService.client.fetch<HomePageContent>(
			HOME_PAGE_CONTENT_QUERY,
			{
				start: recentPostStart,
				end: recentPostEnd,
			}
		);
	};

	getCategoryPageContent = (
		categorySlug: string,
		page: number | undefined,
		perPage = NUMBER_CONSTANTS.defaultPerPage
	) => {
		const [start, end] = calculateRange(page, perPage);

		return SanityDataService.client.fetch<CategoryPageContent>(
			CATEGORY_PAGE_CONTENT_QUERY,
			{
				categorySlug,
				start,
				end,
			}
		);
	};

	getPostPageContent = async (slug: string): Promise<PostPageContent> => {
		const post = await this.getPost(slug);

		const relatedPosts = await this.getRelatedPosts(
			post.categories.main.slug,
			post._id
		);

		const sidePosts = await this.getSidePosts();

		return { post, relatedPosts, sidePosts };
	};
}
