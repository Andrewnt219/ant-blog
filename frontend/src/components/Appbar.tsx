import React, { ReactElement } from "react";
import tw, { styled, theme } from "twin.macro";
import { routesData, RouteProps } from "@src/assets/data/routesData";
import Link from "next/link";
import Logo from "./Logo";
import { FaFacebookF, FaLinkedinIn, FaSearch } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { STYLE_CONSTANTS } from "@src/assets/constants/StyleConstants";
import { useRouteMatch } from "@src/hooks";
type Props = {};

function Appbar(): ReactElement {
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
				</MenuItemSet>

				<SocialMediaSet>
					<li>
						<a href="" target="_blank" rel="noopener noreferrer">
							<FaFacebookF />
						</a>
					</li>
					<li>
						<a href="" target="_blank" rel="noopener noreferrer">
							<AiFillInstagram />
						</a>
					</li>
					<li>
						<a href="" target="_blank" rel="noopener noreferrer">
							<FaLinkedinIn />
						</a>
					</li>
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

	return (
		<Link passHref href={route.href}>
			<StyledMenuItem isActive={isActive}>{route.text}</StyledMenuItem>
		</Link>
	);
}

type HeaderProps = {};
const Header = styled.header<HeaderProps>`
	${tw`font-500 h-20`}

	box-shadow: 0 2px 9px -1px rgba(0, 0, 0, 0.04);
	border-bottom: 1px solid #efefef;
	color: rgb(82, 82, 82);
	padding: 0 ${STYLE_CONSTANTS.bodyPadding};
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

	svg {
		cursor: pointer;
		transition: fill 200ms ease;
	}

	a:hover,
	a:focus {
		svg {
			fill: var(--accent-color);
		}
	}
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
