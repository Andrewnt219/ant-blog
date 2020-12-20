import { useMuiPagination } from ".";
import { UsePaginationProps } from "./useMuiPagination";
import { usePageQuery } from "./usePageQuery";

type Props = Omit<UsePaginationProps, "onChange" | "page"> & {
	onPageChange?(newPage: number | null): void;
};

/**
 * Returns a list of pagination items base on page query
 * @param onPageChange a callback on page change
 */
export const useQueryPaginationItems = ({
	onPageChange,
	...usePaginationProps
}: Props) => {
	const { currentPage, changeCurrentPage: onChange } = usePageQuery({
		onPageChange,
	});

	const { items } = useMuiPagination({
		...usePaginationProps,
		onChange,
		page: currentPage ?? 1,
	});

	return { currentPage, items };
};
