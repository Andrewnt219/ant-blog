import { ImageModel, imageModelQuery } from './ImageModel';

export type RelatedPostsModel = {
	title: string;
	_id: string;
	publishedAt: string;
	thumbnail: ImageModel;
	slug: string;
};

export const relatedPostsModelQuery = `
	{
    title,
    _id,
    publishedAt,
    "thumbnail": mainImage.asset -> ${imageModelQuery},
    "slug": slug.current,
  }
`;
