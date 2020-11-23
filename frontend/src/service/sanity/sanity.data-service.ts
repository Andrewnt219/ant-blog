import sanityClient from "@src/lib/sanity/client";

import {
	SidePostModel,
	HomePostModel,
	RelatedPostsModel,
	PostModel,
} from "@src/model/sanity";

import {
	HOME_POSTS_QUERY,
	POSTS_SLUG_QUERY,
	POST_QUERY,
	RELATED_POSTS_QUERY,
	SIDE_POSTS_QUERY,
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

	getRelatedPosts = (categorySlug: string) =>
		SanityDataService.client.fetch<RelatedPostsModel[]>(RELATED_POSTS_QUERY, {
			categorySlug,
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
}
