import { ImageModel, imageModelQuery } from './ImageModel';

export type PinnedPostModel = {
	title: string;
	slug: string;
	publishedAt: string;
	category: {
		title: string;
		slug: string;
	};
	author: string;
	thumbnail: ImageModel;
};

export const pinnedPostModelQuery = `
  {
    title,
    "slug": slug.current,
    publishedAt,
    "category": categories[_type == 'mainCategory'][0] -> {title, "slug": slug.current},
    "author": author -> name,
    "thumbnail": mainImage.asset -> ${imageModelQuery},
  }`;
