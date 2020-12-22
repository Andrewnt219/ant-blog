import { PostModel, RelatedPostsModel, SidePostModel } from "./sanity";

export type PostPageContent = {
	post: PostModel;
	relatedPosts: RelatedPostsModel[];
	sidePosts: SidePostModel[];
};
