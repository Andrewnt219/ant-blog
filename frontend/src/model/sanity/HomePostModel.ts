import { ImageModel, imageModelQuery } from './ImageModel';

export type HomePostModel = {
	isPinned: boolean;
	title: string;
	slug: string;
	publishedAt: string;
	category: {
		title: string;
		slug: string;
	};
	thumbnail: ImageModel;
	author: string;
	contentSnippet: string;
	snippet: string;
	body: any;
	views: number;
};

export const homePostModelQuery = `
	{
		isPinned,
		title,
		"slug": slug.current,
		publishedAt,
		"category": categories[_type == 'mainCategory'][0] -> {title, "slug": slug.current},
		"author": author -> name,
		"thumbnail": mainImage.asset -> ${imageModelQuery},
		snippet,
		body,
		views
	}
`;
