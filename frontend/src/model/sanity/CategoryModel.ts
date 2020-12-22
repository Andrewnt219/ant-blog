import { ImageModel, imageModelQuery } from './ImageModel';

export type CategoryModel = {
	thumbnail: ImageModel;
	slug: string;
	title: string;
};

export const categoryModelQuery = `
	{
		title,
		"slug": slug.current,
		"thumbnail": image.asset -> ${imageModelQuery}
	}
`;
