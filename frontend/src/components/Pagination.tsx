import React, { ReactElement } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import tw, { css, styled } from "twin.macro";

import { UsePaginationItem } from "@src/hooks/useMuiPagination";

type Props = {
	items: UsePaginationItem[];
	onItemClicked?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
};

const Pagination = ({ items, onItemClicked }: Props): ReactElement => {
	return (
		<nav>
			<Container>{renderControllers(items, onItemClicked)}</Container>
		</nav>
	);
};

// Render all the pagination controllers
function renderControllers(
	items: Props["items"],
	onClick: Props["onItemClicked"]
) {
	return items.map(({ page, type, onClick: onMuiClick, ...item }, index) => {
		let children = null;

		const handleItemClick = (
			event: React.MouseEvent<HTMLButtonElement, MouseEvent>
		) => {
			onMuiClick(event);
			onClick && onClick(event);
		};

		switch (type) {
			case "start-ellipsis":
			case "end-ellipsis":
				children = (
					<Button tabIndex={-1} isEllipsis type="button" {...item}>
						...
					</Button>
				);
				break;

			case "page":
				children = (
					<Button type="button" {...item} onClick={handleItemClick}>
						{page}
					</Button>
				);
				break;

			case "next":
				children = (
					<Button type="button" {...item} onClick={handleItemClick}>
						<MdKeyboardArrowRight />
					</Button>
				);
				break;

			case "previous":
				children = (
					<Button type="button" {...item} onClick={handleItemClick}>
						<MdKeyboardArrowLeft />
					</Button>
				);
				break;

			default:
				children = (
					<Button type="button" {...item} onClick={handleItemClick}>
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
	${tw`flex mt-6 justify-center`}
	font-size: smaller;

	& > li:last-child button {
		${tw`border-r rounded-r`}
	}

	& > li:first-child button {
		${tw` rounded-l`}
	}
`;

// TODO fix focus/hover on mobile
type ButtonProps = {
	selected?: boolean;
	isEllipsis?: boolean;
};
const Button = styled.button<ButtonProps>`
	${tw`w-10 h-10 bg-transparent font-500 text-accent`}
	${tw`border-t border-b border-l border-solid border-borderColor`}
	${tw`flex items-center justify-center`}
	${tw`hover:bg-lprimary`}

	svg {
		font-size: larger;
	}

	:disabled {
		${tw`opacity-25`}
		cursor: not-allowed;
	}

	${(p) =>
		p.isEllipsis &&
		css`
			${tw`bg-transparent pointer-events-none`}
		`}

	${(p) =>
		p.selected &&
		css`
			${tw`bg-accent text-white pointer-events-none`}
		`}
`;

export default Pagination;
