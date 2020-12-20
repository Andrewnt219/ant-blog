import { ImageModel, imageModelQuery } from "./ImageModel";

export type RecentPostModel = {
	title: string;
	slug: string;
	publishedAt: string;
	category: {
		title: string;
		slug: string;
	};
	thumbnail: ImageModel;
	contentSnippet: string;
	snippet: string;
	body: any;
};

export const recentPostModelQuery = `  
	{
		title,
		"slug": slug.current,
		publishedAt,
		"category": categories[_type == 'mainCategory'][0] -> {title, "slug": slug.current},	
		"thumbnail": mainImage.asset -> ${imageModelQuery},
		snippet,
		body,
		views
	}
`;
