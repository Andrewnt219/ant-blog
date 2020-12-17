import {
	categoryModelQuery,
	homePostModelQuery,
	imageModelQuery,
	postModelQuery,
	relatedPostsModelQuery,
	sidePostModelQuery,
} from "@src/model/sanity";

export const RELATED_POSTS_QUERY = `
	*[
		_type == "post" 
			&&  !isArchived 
			&& categories[_type == 'mainCategory'][0] -> slug.current == $categorySlug 
			&& _id != $postId
	] ${relatedPostsModelQuery} [0...4]
`;

export const SIDE_POSTS_QUERY = `
		*[
			_type == "post" 
				&& !isArchived 
				&& !isPinned
		] | order(_createdAt desc) ${sidePostModelQuery} [0...3]
  `;

export const POST_QUERY = `
        *[slug.current == $slug] ${postModelQuery} [0]
    `;

export const POSTS_SLUG_QUERY = `*[_type == "post" && !isArchived] {
      slug{
        current
      }
    }`;

export const HOME_POSTS_QUERY = `
			*[_type == "post" && !isArchived] | order(_createdAt desc) ${homePostModelQuery}
		`;

export const CATEGORIES_QUERY = `
			*[_type == "category"] {
				title,
				"slug": slug.current,
				"thumbnail": image.asset ->  ${imageModelQuery}
			}
		`;

export const POSTS_BY_CATEGORY_QUERY = `
	*[_type == "post" 
		&& !isArchived 
		&& categories[] -> slug.current match $categorySlug 
	] | order(_createdAt desc) ${homePostModelQuery}
`;

export const CATEGORY_QUERY = `
		*[_type=="category" && slug.current==$categorySlug] ${categoryModelQuery}[0]
`;
