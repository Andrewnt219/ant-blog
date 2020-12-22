import { ImageModel, imageModelQuery } from './ImageModel';

export type SidePostModel = {
	title: string;
	slug: string;
	publishedAt: string;
	thumbnail: ImageModel;
};

export const sidePostModelQuery = `
	{
		title,
		"slug": slug.current,
		publishedAt,
		"category": categories[_type == 'mainCategory'][0] -> {title, "slug": slug.current},
		"thumbnail": mainImage.asset -> ${imageModelQuery}		
	}
`;
