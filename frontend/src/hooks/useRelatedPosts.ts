import { SanityClientErrorResponse } from 'sanity';
import useSWR from 'swr';

import { NUMBER_CONSTANTS } from '@src/assets/constants/StyleConstants';
import { sanityFetcher } from '@src/lib/swr';
import { PostModel, RelatedPostsModel } from '@src/model/sanity';
import { RELATED_POSTS_QUERY } from '@src/service/sanity/sanity.query';

type Props = {
	post: {
		categories: PostModel["categories"];
		_id: PostModel["_id"];
	};
	initialRelatedPosts: RelatedPostsModel[];
};
export const useRelatedPosts = ({ post, initialRelatedPosts }: Props) => {
	// fetch relatedPosts
	// NOTE cannot use dataservice and bind because binded params does not change
	const { data, error } = useSWR<
		RelatedPostsModel[],
		SanityClientErrorResponse
	>(
		[
			RELATED_POSTS_QUERY,
			{ categorySlug: post.categories.main.slug, postId: post._id },
		],
		sanityFetcher,
		{
			initialData: initialRelatedPosts,
			refreshInterval: NUMBER_CONSTANTS.refreshInterval,
		}
	);

	return { data, error };
};
