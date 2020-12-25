import { STYLE_CONSTANTS } from "@src/assets/constants/StyleConstants";
import React, { ReactElement } from "react";
import { css } from "styled-components";
import tw, { styled } from "twin.macro";

type Props = {
	isOpen: boolean;
	handleClick(): void;
};

function Hamburger({ handleClick, isOpen }: Props): ReactElement {
	const handleEnter = (event: React.KeyboardEvent<HTMLDivElement>): void => {
		if (event.key === "Enter") {
			handleClick();
		}
	};

	return (
		<Wrapper>
			<Bun
				role="button"
				tabIndex={0}
				onClick={handleClick}
				onKeyDown={handleEnter}
				aria-expanded={isOpen}
				isOpen={isOpen}
			>
				{Array(3)
					.fill(0)
					.map((_, index) => (
						<Meat aria-hidden key={index} />
					))}
			</Bun>
		</Wrapper>
	);
}

type WrapperProps = {};
const Wrapper = styled.nav<WrapperProps>`
	display: block;

	position: fixed;
	bottom: 5%;
	right: ${STYLE_CONSTANTS.mobileBodyPadding};
	${tw`z-40`}

	@media screen and (min-width: ${STYLE_CONSTANTS.fullAppbarBreakpoint}) {
		display: none;
	}
`;

type BunProps = {
	isOpen: boolean;
};
const Bun = styled.div<BunProps>`
	${tw`w-full h-full relative outline-none cursor-pointer`};
	${tw`flex items-center justify-center flex-col space-y-1`};
	${tw`bg-white p-2 rounded-sm overflow-hidden shadow `};

	transition: background-color 400ms ease, transform 400ms ease,
		shadow 400ms ease;

	:hover,
	:focus {
		${tw`shadow-lg`}
		transform: scale(1.1);
	}

	${(p) =>
		p.isOpen &&
		css`
			${tw`bg-red-500`}
			& > *:nth-child(1) {
				transform: translateX(0.2rem) rotate(45deg);
				${tw`bg-white`}
			}

			& > *:nth-child(2) {
				transform: translateX(1rem);
				opacity: 0;
			}

			& > *:nth-child(3) {
				transform: translateX(0.2rem) rotate(-45deg);
				${tw`bg-white`}
			}
		`}
`;

type MeatProps = {};
const Meat = styled.div<MeatProps>`
	${tw`w-6 h-1 bg-textColor`}
	transform-origin: 1px;
	transition: transform 400ms ease, opacity 400ms ease;
	pointer-events: none;
`;

export default Hamburger;
