import sanityClient from "@src/lib/sanity/client";
import {
	PostModel,
	SidePostModel,
	HomePostModel,
	RelatedPostsModel,
} from "@src/model/sanity";
import {
	HOME_POSTS_QUERY,
	POSTS_SLUG_QUERY,
	POST_QUERY,
	RELATED_POSTS_QUERY,
	SIDE_POSTS_QUERY,
} from "./sanity.query";

export const getRelatedPosts = (categorySlug: string) =>
	sanityClient.fetch<RelatedPostsModel[]>(RELATED_POSTS_QUERY, {
		categorySlug,
	});

export const getSidePosts = () =>
	sanityClient.fetch<SidePostModel[]>(SIDE_POSTS_QUERY);

export const getPost = (slug: string) =>
	sanityClient.fetch<PostModel>(POST_QUERY, {
		slug,
	});

export const getPostsSlug = () =>
	sanityClient.fetch<{ slug: { current: string } }[]>(POSTS_SLUG_QUERY);

export const getPosts = () =>
	sanityClient.fetch<HomePostModel[]>(HOME_POSTS_QUERY);
