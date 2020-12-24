import Link from "next/link";
import React, { ReactElement, useState } from "react";
import { FaSearch } from "react-icons/fa";
import tw, { styled, theme } from "twin.macro";

import {
	ENDPOINTS,
	STYLE_CONSTANTS,
} from "@src/assets/constants/StyleConstants";
import { RouteProps, routesData } from "@src/assets/data/routesData";
import { SocialMedia } from "@src/assets/enums/IconEnum";
import { useRouteMatch } from "@src/hooks";

import DropDown from "./DropDown";
import Logo from "./Logo";
import SocialMediaIcon from "./SocialMediaIcon";

// TODO make mobile navigations
const icons: SocialMedia[] = [
	SocialMedia.FACEBOOK,
	SocialMedia.INSTAGRAM,
	SocialMedia.LINKEDIN,
];
type Props = {
	featuredCategories: RouteProps[];
};
function Appbar({ featuredCategories }: Props): ReactElement {
	const categoryRoute: RouteProps = {
		text: "Categories",
		href: ENDPOINTS.category,
		dropdown: featuredCategories,
	};

	return (
		<Header>
			<Nav>
				<Logo height="60%" />

				<MenuItemSet>
					{routesData.map((route) => (
						<li key={route.href.toString()}>
							<MenuItem route={route} />
						</li>
					))}
					<li>
						<MenuItem route={categoryRoute} />
					</li>
				</MenuItemSet>

				<SocialMediaSet>
					{icons.map((icon) => (
						<li key={icon}>
							<SocialMediaIcon variants={icon} />
						</li>
					))}
				</SocialMediaSet>

				<SearchContainer>
					<FaSearch tabIndex={0} />
				</SearchContainer>
			</Nav>
		</Header>
	);
}

function MenuItem({ route }: { route: RouteProps }) {
	const isActive = useRouteMatch(route.href.toString(), route.exact);

	const [showDropdown, setShowDropdown] = useState(false);

	const handleMouseEnter = () => {
		setShowDropdown(true);
	};

	const handleMouseLeave = () => {
		setShowDropdown(false);
	};

	return (
		<MenuItemContainer
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<Link passHref href={route.href}>
				<StyledMenuItem isActive={isActive}>{route.text}</StyledMenuItem>
			</Link>
			{route.dropdown && showDropdown && <DropDown data={route.dropdown} />}
		</MenuItemContainer>
	);
}

type HeaderProps = {};
const Header = styled.header<HeaderProps>`
	${tw`font-500 h-20 `}

	box-shadow: 0 2px 9px -1px rgba(0, 0, 0, 0.04);
	border-bottom: 1px solid #efefef;
	color: rgb(82, 82, 82);
	padding: 0 ${STYLE_CONSTANTS.mobileBodyPadding};

	@media screen and (min-width: ${theme`screens.smTablet`}) {
		padding: 0 ${STYLE_CONSTANTS.bodyPadding};
	}
`;

type NavProps = {};
const Nav = styled.nav<NavProps>`
	${tw`flex items-center h-full`}
`;

type MenuItemSetProps = {};
const MenuItemSet = styled.ul<MenuItemSetProps>`
	display: none;

	@media screen and (min-width: ${theme`screens.mdTablet`}) {
		${tw`ml-4 flex justify-center`}
		flex: 1;
	}
`;

type MenuItemContainerProps = {};
const MenuItemContainer = styled.div<MenuItemContainerProps>`
	position: relative;
`;

type StyledMenuItem = {
	isActive: boolean;
};
const StyledMenuItem = styled.a<StyledMenuItem>`
	${tw`mx-4`}
	color: ${(p) => p.isActive && "var(--accent-color)"};

	transition: color 250ms ease;

	:hover,
	:focus {
		${tw`text-accent`}
	}
`;

type SocialMediaSetProps = {};
const SocialMediaSet = styled.ul<SocialMediaSetProps>`
	${tw`flex space-x-3 px-6`}
	font-size: smaller;
	margin-left: auto;
`;

type SearchContainerProps = {};
const SearchContainer = styled.div<SearchContainerProps>`
	${tw`justify-center pl-6 border-l border-borderColor border-solid`}
	height: min-content;

	svg {
		cursor: pointer;
		transition: fill 200ms ease;

		:hover,
		:focus {
			fill: var(--accent-color);
		}
	}
`;

export default Appbar;
