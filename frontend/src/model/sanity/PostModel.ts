import { ImageModel } from "./ImageModel";

export type PostModel = {
	_id: string;
	categories: {
		title: string;
		slug: string;
	}[];
	title: string;
	thumbnail: ImageModel;
	body: any;
	author: {
		name: string;
		avatar: ImageModel;
		slug: string;
		bio: any;
	};
	publishedAt: string;
};
