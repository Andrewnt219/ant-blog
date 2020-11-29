import { ImageModel } from "./ImageModel";

export type RelatedPostsModel = {
	title: string;
	_id: string;
	publishedAt: string;
	thumbnail: ImageModel;
	slug: string;
};
