import React, { ReactElement } from "react";
import tw, { css, styled } from "twin.macro";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

type Props = {
	isNextArrow?: boolean;
	className?: string;
	style?: Record<string, any>;
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function SlickArrow({ isNextArrow, ...slickProps }: Props): ReactElement {
	const { onClick } = slickProps;

	const arrow = isNextArrow ? (
		<MdKeyboardArrowRight />
	) : (
		<MdKeyboardArrowLeft />
	);
	return (
		<Container isNextArrow={isNextArrow} onClick={onClick}>
			{arrow}
		</Container>
	);
}

type ContainerProps = {
	isNextArrow?: boolean;
};
const Container = styled.button<ContainerProps>`
	${tw`text-black  flex justify-center items-center z-10 text-ltextColor text-xl w-6 h-6 bg-primary`}
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);

	${(p) =>
		p.isNextArrow &&
		css`
			left: 100%;
		`}
`;

export default SlickArrow;
