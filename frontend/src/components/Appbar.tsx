import React, { ReactElement } from "react";
import tw, { styled } from "twin.macro";
import { routesData } from "@src/assets/data/routesData";
import Link from "next/link";
import Logo from "./Logo";
import {
	FaFacebookF,
	FaInstagram,
	FaLinkedinIn,
	FaSearch,
} from "react-icons/fa";
type Props = {};

function Appbar(): ReactElement {
	return (
		<Header>
			<Nav>
				<Logo height="4rem" withText />

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
	${tw`text-xs font-500 `}

	box-shadow: 0 2px 9px -1px rgba(0, 0, 0, 0.04);
	border-bottom: 1px solid #efefef;
	color: rgb(82, 82, 82);
`;

type NavProps = {};
const Nav = styled.nav<NavProps>`
	${tw`flex items-center `}
`;

type MenuItemSetProps = {};
const MenuItemSet = styled.ul<MenuItemSetProps>`
	${tw`flex`}
`;

type MenuItemProps = {};
const MenuItem = styled.a<MenuItemProps>`
	${tw`px-3`}
	line-height: 4.5rem;
`;

type SocialMediaSetProps = {};
const SocialMediaSet = styled.ul<SocialMediaSetProps>`
	${tw`flex space-x-2 px-4`}
	font-size: smaller;
	margin-left: auto;
`;

type SearchContainerProps = {};
const SearchContainer = styled.div<SearchContainerProps>`
	${tw`justify-center pl-4 border-l border-black border-solid`}
	height: min-content;
	font-size: larger;
`;

export default Appbar;
