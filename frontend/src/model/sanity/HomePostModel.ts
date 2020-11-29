import { ImageModel } from "./ImageModel";

export type HomePostModel = {
	isPinned: boolean;
	title: string;
	slug: string;
	publishedAt: string;
	category: {
		title: string;
		slug: string;
	};
	contentSnippet: string;
	author: string;
	snippet: string;
	thumbnail: ImageModel;
	body: any;
};
