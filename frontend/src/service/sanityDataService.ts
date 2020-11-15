import sanityClient from "@src/lib/sanity/client";

export type RelatedPostsProps = {
	title: string;
	_id: string;
	publishedAt: string;
	image: {
		url: string;
		alt?: string;
	};
	slug: string;
};

const getRelatedPostsQuery = `
  *[_type == "post" && categories[0]->slug.current == $categorySlug] {
    title,
    _id,
    publishedAt,
    "image": mainImage {
      alt,
      "url": asset -> url
    },
    "slug": slug.current,
  }
`;
export const getRelatedPosts = {
	query: getRelatedPostsQuery,
	fetch: (categorySlug: string) =>
		sanityClient.fetch<RelatedPostsProps[]>(getRelatedPostsQuery, {
			categorySlug,
		}),
};
