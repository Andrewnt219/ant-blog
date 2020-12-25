import Link from "next/link";
import React, { ReactElement } from "react";
import tw, { styled } from "twin.macro";

import { RouteProps } from "@src/assets/data/routesData";
import { useRouteMatch } from "@src/hooks";
import { motion } from "framer-motion";
import { dropDownVariants } from "@src/assets/variants";

type Props = {
	data: RouteProps[];
	handleMouseLeave?: () => void;
};

function DropDown({ data, handleMouseLeave }: Props): ReactElement {
	const handleBlur = () => {
		handleMouseLeave && handleMouseLeave();
	};

	return (
		<Container
			onMouseLeave={handleMouseLeave}
			//
			variants={dropDownVariants.container}
			animate="visible"
			initial="initial"
			exit="exit"
		>
			{data.map((link) => (
				<li key={link.text}>
					<MenuItem data={link} />
				</li>
			))}
		</Container>
	);
}

type MenuItemProps = {
	data: RouteProps;
};

function MenuItem({ data }: MenuItemProps): ReactElement {
	const isActive = useRouteMatch(data.href.toString(), data.exact);

	return (
		<Link href={data.href} passHref>
			<StyledLink variants={dropDownVariants.item} isActive={isActive}>
				{data.text}
			</StyledLink>
		</Link>
	);
}

type ContainerProps = {};
const Container = styled(motion.ul)<ContainerProps>`
	${tw`absolute z-50  rounded  text-black `};

	/* transform: translateY(0.5rem); */

	font-size: smaller;
	background-color: rgba(255, 255, 255, 0.9);
	box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
		rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
`;

type StyledLinkProps = {
	isActive: boolean;
};
const StyledLink = styled(motion.a)<StyledLinkProps>`
	${tw`inline-block pl-4 py-2 pr-20 `}

	// NOTE necessary for all links fill the container
	width: 100%;

	transition: color 100ms ease;
	color: ${(p) => p.isActive && "var(--accent-color)"};

	:hover,
	:focus {
		${tw`text-accent`}
	}
`;

export default DropDown;
