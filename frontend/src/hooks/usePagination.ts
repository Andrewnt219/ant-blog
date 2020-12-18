import { useEffect, useState } from "react";

type Props = {
	itemsPerPage: number;
	numberOfItems: number;
	onPageChange(newPageNumber: number): void;
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
	const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

	const lastPageNumber = Math.ceil(numberOfItems / itemsPerPage);

	const nextPageNumber =
		currentPageNumber + 1 > lastPageNumber ? null : currentPageNumber + 1;

	const previousPageNumber =
		currentPageNumber - 1 < 1 ? null : currentPageNumber - 1;

	const goToNextPage = () => {
		if (currentPageNumber < lastPageNumber) {
			setCurrentPageNumber((prev) => prev + 1);
		}
	};

	const goToPreviousPage = () => {
		if (currentPageNumber > 1) {
			setCurrentPageNumber((prev) => prev - 1);
		}
	};

	const goToFirstPage = () => {
		setCurrentPageNumber(1);
	};

	const goToLastPage = () => {
		setCurrentPageNumber(lastPageNumber);
	};

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
		},
	};
};
