import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Props = {
	onPageChange?(newPage: number | null): void;
};

/**
 * Change the page using query
 * @param onPageChange a callback on page change
 * @return the current page, the page query string, the function to change current page
 */
export const usePageQuery = ({ onPageChange }: Props) => {
	const [currentPage, setCurrentPage] = useState<number | null>(null);

	const router = useRouter();

	const changeCurrentPage = useCallback(
		(event: React.ChangeEvent<unknown>, page: number) => {
			router.push({ query: { ...router.query, page } }, undefined, {
				shallow: true,
			});
			setCurrentPage(page);
		},
		[router]
	);

	const pageQuery = useMemo(
		() => queryString.parseUrl(router.asPath).query.page,
		[router.asPath]
	);

	useEffect(() => {
		setCurrentPage(pageQuery ? +pageQuery : 1);
		onPageChange && onPageChange(pageQuery ? +pageQuery : 1);
	}, [pageQuery, onPageChange]);

	return { currentPage, pageQuery, changeCurrentPage };
};
