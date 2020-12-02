import { CategoriesModel } from "./CategoriesModel";
import { ImageModel } from "./ImageModel";

export type PostModel = {
	_id: string;
	categories: CategoriesModel;
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
