import {
	CategoryModel,
	MostViewedPostModel,
	PinnedPostModel,
	RecentPostModel,
} from "./sanity";

export type HomePageContent = {
	pinnedPosts: PinnedPostModel[];
	mostViewedPosts: MostViewedPostModel[];
	recentPosts: RecentPostModel[];
	postsCount: number;
	featuredCategories: CategoryModel[];
};
