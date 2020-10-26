import React, { ReactElement } from "react";
import { styled } from "twin.macro";
import { routesData } from "@src/assets/data/routesData";
import Link from "next/link";

type Props = {};

function Appbar(): ReactElement {
	return (
		<Header>
			<Nav>
				<MenuItemSet>
					{routesData.map((route) => (
						<li key={route.href.toString()}>
							<Link passHref href={route.href}>
								<MenuItem>{route.text}</MenuItem>
							</Link>
						</li>
					))}
				</MenuItemSet>
			</Nav>
		</Header>
	);
}

type HeaderProps = {};
const Header = styled.header<HeaderProps>``;

type NavProps = {};
const Nav = styled.nav<NavProps>``;

type MenuItemSetProps = {};
const MenuItemSet = styled.ul<MenuItemSetProps>``;

type MenuItemProps = {};
const MenuItem = styled.a<MenuItemProps>``;

export default Appbar;
