import { CategoryModel, RecentPostModel, SidePostModel } from './sanity';

export type CategoryPageContent = {
	posts: RecentPostModel[];
	sidePosts: SidePostModel[];
	currentCategory: CategoryModel;
	postsCount: number;
};
