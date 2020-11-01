import React, { ReactElement } from "react";
import tw, { styled, theme } from "twin.macro";
import { routesData } from "@src/assets/data/routesData";
import Link from "next/link";
import Logo from "./Logo";
import {
	FaFacebookF,
	FaInstagram,
	FaLinkedinIn,
	FaSearch,
} from "react-icons/fa";
import { STYLE_CONSTANTS } from "@src/assets/constants/StyleConstants";
type Props = {};

function Appbar(): ReactElement {
	return (
		<Header>
			<Nav>
				<Logo height="4em" withText />

				<MenuItemSet>
					{routesData.map((route) => (
						<li key={route.href.toString()}>
							<Link passHref href={route.href}>
								<MenuItem>{route.text}</MenuItem>
							</Link>
						</li>
					))}
				</MenuItemSet>

				<SocialMediaSet>
					<li>
						<FaFacebookF />
					</li>
					<li>
						<FaInstagram />
					</li>
					<li>
						<FaLinkedinIn />
					</li>
				</SocialMediaSet>
				<SearchContainer>
					<FaSearch />
				</SearchContainer>
			</Nav>
		</Header>
	);
}

type HeaderProps = {};
const Header = styled.header<HeaderProps>`
	${tw`font-500 `}

	box-shadow: 0 2px 9px -1px rgba(0, 0, 0, 0.04);
	border-bottom: 1px solid #efefef;
	color: rgb(82, 82, 82);
	padding: 0 ${STYLE_CONSTANTS.bodyPadding};
`;

type NavProps = {};
const Nav = styled.nav<NavProps>`
	${tw`flex items-center `}
`;

type MenuItemSetProps = {};
const MenuItemSet = styled.ul<MenuItemSetProps>`
	display: none;

	@media screen and (min-width: ${theme`screens.mdTablet`}) {
		${tw`ml-8 flex`}
	}
`;

type MenuItemProps = {};
const MenuItem = styled.a<MenuItemProps>`
	${tw`px-3`}
	line-height: 5em;
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
`;

export default Appbar;
