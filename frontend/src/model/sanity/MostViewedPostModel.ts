import { ImageModel, imageModelQuery } from "./ImageModel";

export type MostViewedPostModel = {
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
	views: number;
};

export const mostViewedPostModelQuery = `
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
