import Axios from "axios";
import React, {
	ReactElement,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import tw, { css, styled } from "twin.macro";
import { useMuiPagination, useQueryPaginationItems } from "@src/hooks";
import { useRouter } from "next/router";
import queryString from "query-string";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { UsePaginationItem } from "@src/hooks/useMuiPagination";
type Props = {};

const Pagination = (): ReactElement => {
	const [todos, setTodos] = useState<any>(null);

	const onPageChange = useCallback((newPage: number | null) => {
		Axios.get(`https://jsonplaceholder.typicode.com/todos/${newPage ?? 1}`)
			.then((res) => setTodos(res.data))
			.catch((err) => console.error(err));
	}, []);

	const { items } = useQueryPaginationItems({ count: 8, onPageChange });

	return (
		<>
			<Container>{renderControllers(items)}</Container>
			<code>{JSON.stringify(todos, null, 2)}</code>
		</>
	);
};

function renderControllers(items: UsePaginationItem[]) {
	return items.map(({ page, type, ...item }, index) => {
		let children = null;

		switch (type) {
			case "start-ellipsis":
			case "end-ellipsis":
				children = (
					<Button isEllipsis type="button" {...item}>
						...
					</Button>
				);
				break;

			case "page":
				children = (
					<Button type="button" {...item}>
						{page}
					</Button>
				);
				break;

			case "next":
				children = (
					<Button type="button" {...item}>
						<FaArrowRight />
					</Button>
				);
				break;

			case "previous":
				children = (
					<Button type="button" {...item}>
						<FaArrowLeft />
					</Button>
				);
				break;

			default:
				children = (
					<Button type="button" {...item}>
						{type}
					</Button>
				);
				break;
		}

		return <li key={index}>{children}</li>;
	});
}

type ContainerProps = {};
const Container = styled.ul<ContainerProps>`
	${tw`flex space-x-2`}
`;

type ButtonProps = {
	selected?: boolean;
	isEllipsis?: boolean;
};
const Button = styled.button<ButtonProps>`
	${tw`w-10 h-10 bg-borderColor rounded`}
	${tw`flex items-center justify-center`}

	${(p) =>
		p.isEllipsis &&
		css`
			${tw`bg-transparent`}
		`}
		
	${(p) =>
		p.selected &&
		css`
			${tw`bg-accent text-white`}
		`}


		:disabled {
		${tw`opacity-25`}
		cursor: not-allowed;
	}
`;

export default Pagination;
