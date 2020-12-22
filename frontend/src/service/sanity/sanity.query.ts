import {
	categoryModelQuery,
	homePostModelQuery,
	postModelQuery,
	relatedPostsModelQuery,
	sidePostModelQuery,
	pinnedPostModelQuery,
	mostViewedPostModelQuery,
	recentPostModelQuery,
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

export const PINNED_POSTS_QUERY = `
			*[_type == "post" && isPinned] | order(_createdAt desc) ${pinnedPostModelQuery} [0...3]
		`;

export const MOST_VIEWED_POSTS_QUERY = `
		*[_type == "post" && !isArchived] | order(views desc, _createdAt desc) ${mostViewedPostModelQuery} [0...6]
	`;

export const RECENT_POSTS_QUERY = `
		*[_type == "post" && !isArchived] | order(_createdAt desc) ${recentPostModelQuery} [$start...$end]
`;

export const TOTAL_POSTS_QUERY = `
	count(*[_type == "post" && !isArchived] {})
`;

export const CATEGORIES_QUERY = `
			*[_type == "category"] ${categoryModelQuery}
		`;

export const SEARCHED_CATEGORIES_QUERY = `
	*[_type == "category" in $categorySlugs ] ${categoryModelQuery}
`;

export const FEATURED_CATEGORY_QUERY = `
	*[_type == "category" && isFeatured ] | order(_title asc) ${categoryModelQuery}
`;

export const HOME_PAGE_CONTENT_QUERY = `
		{	
			"pinnedPosts": ${PINNED_POSTS_QUERY},
			"mostViewedPosts": ${MOST_VIEWED_POSTS_QUERY},
			"recentPosts": ${RECENT_POSTS_QUERY},
			"postsCount": ${TOTAL_POSTS_QUERY},
			"featuredCategories": ${FEATURED_CATEGORY_QUERY}
		}`;

export const POSTS_BY_CATEGORY_QUERY = `
	*[_type == "post" 
		&& !isArchived 
		&& categories[] -> slug.current match $categorySlug 
	] | order(_createdAt desc) ${homePostModelQuery} [$start...$end]
`;

export const CATEGORY_QUERY = `
	*[_type=="category" && slug.current==$categorySlug] ${categoryModelQuery}[0]
`;

export const TOTAL_CATEGORY_POSTS_QUERY = `
count(
	*[_type == "post" 
		&& !isArchived 
		&& categories[] -> slug.current match $categorySlug 
	] {}
)
`;
export const CATEGORY_PAGE_CONTENT_QUERY = `
	{
		"posts": ${POSTS_BY_CATEGORY_QUERY},
		"sidePosts": ${SIDE_POSTS_QUERY},
		"currentCategory": ${CATEGORY_QUERY},
		"postsCount": ${TOTAL_CATEGORY_POSTS_QUERY}
	}
`;
