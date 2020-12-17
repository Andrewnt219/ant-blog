import { CategoriesModel, categoriesModelQuery } from "./CategoriesModel";
import { categoryModelQuery } from "./CategoryModel";
import { ImageModel, imageModelQuery } from "./ImageModel";

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
	views: number;
};

export const postModelQuery = `
	{
		_id,
		"categories": ${categoriesModelQuery},
		title,
		"thumbnail": mainImage.asset -> ${imageModelQuery},
		body[] {
			...,
			_type == "image" => {
				...,
				"metadata": @.asset -> metadata {
					"width": dimensions.width, 
					"height": dimensions.height,
					lqip
				}
			},
			markDefs[] {
				...,
				_type == "internalLink" => {
					...,
					"url": "/" + @.post->slug.current,
				}
			}
		},
		author -> {
			name,
			"slug": slug.current,
			"avatar": image.asset -> ${imageModelQuery},
			bio
		},
		publishedAt,
		views
	}
`;
