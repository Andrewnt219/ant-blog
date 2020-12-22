import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR, { ConfigInterface } from 'swr';

import { NUMBER_CONSTANTS } from '@src/assets/constants/StyleConstants';
import { categoryPageContentFetcher } from '@src/lib/swr';
import { CategoryPageContent } from '@src/model/CategoryPageContent';

export const useCategoryPageContent = (
	prefetchedContent: CategoryPageContent,
	config?: Omit<ConfigInterface, "initialData" | "refreshInterval">
) => {
	const { query } = useRouter();

	const result = useSWR<CategoryPageContent>(
		[prefetchedContent.currentCategory.slug, query.page ? +query.page : 1],
		categoryPageContentFetcher,
		{
			...config,
			initialData: prefetchedContent,
			refreshInterval: NUMBER_CONSTANTS.refreshInterval,
		}
	);

	const { revalidate } = result;

	useEffect(() => {
		revalidate();
	}, [query.page, revalidate]);

	return { ...result, data: result.data ?? prefetchedContent };
};
