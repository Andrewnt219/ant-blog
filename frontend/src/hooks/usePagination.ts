import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import queryString from "query-string";

type Props = {
	itemsPerPage: number;
	numberOfItems: number;
	onPageChange(newPageNumber: number | null): void;
};
/**
 * returns helpful controllers and data for pagination
 *
 * @param itemsPerPage the number of items per page
 * @param numberOfItems the total number of items
 * @param onPageChange a callback to be called on page change, which wil receive a new page number
 */
export const usePagination = ({
	itemsPerPage,
	numberOfItems,
	onPageChange,
}: Props) => {
	const router = useRouter();
	const [currentPageNumber, setCurrentPageNumber] = useState<number | null>(
		null
	);

	const lastPageNumber = Math.ceil(numberOfItems / itemsPerPage);

	let nextPageNumber: number | null = null;
	let previousPageNumber: number | null = null;

	if (currentPageNumber) {
		nextPageNumber =
			currentPageNumber + 1 > lastPageNumber ? null : currentPageNumber + 1;

		previousPageNumber =
			currentPageNumber - 1 < 1 ? null : currentPageNumber - 1;
	}

	const goToNextPage = () => {
		if (currentPageNumber && currentPageNumber < lastPageNumber) {
			goToPage(currentPageNumber + 1);
		}
	};

	const goToPreviousPage = () => {
		if (currentPageNumber && currentPageNumber > 1) {
			goToPage(currentPageNumber - 1);
		}
	};

	const goToPage = (pageNumber: number) => {
		router.push({
			query: {
				page: pageNumber,
			},
		});
	};

	const goToFirstPage = () => {
		goToPage(1);
	};

	const goToLastPage = () => {
		goToPage(lastPageNumber);
	};

	useEffect(() => {
		const { query } = queryString.parseUrl(router.asPath);

		if (query.page) {
			setCurrentPageNumber(+query.page);
		} else {
			setCurrentPageNumber(1);
		}
	}, [router.asPath]);

	useEffect(() => {
		onPageChange(currentPageNumber);
	}, [currentPageNumber]);

	return {
		currentPageNumber,
		lastPageNumber,
		nextPageNumber,
		previousPageNumber,
		goTo: {
			nextPage: goToNextPage,
			previousPage: goToPreviousPage,
			lastPage: goToLastPage,
			firstPage: goToFirstPage,
			page: goToPage,
		},
	};
};
