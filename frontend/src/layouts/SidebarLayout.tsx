import { STYLE_CONSTANTS } from "@src/assets/constants/StyleConstants";
import React, { ReactElement, ReactNode } from "react";
import tw, { styled, theme } from "twin.macro";

type Props = {
	children: ReactNode;
};

function SidebarLayout({ children }: Props): ReactElement {
	return <Layout>{children}</Layout>;
}

type LayoutProps = {};
const Layout = styled.div<LayoutProps>`
	${tw`space-y-10`}
	display: grid;
	padding: 0 ${STYLE_CONSTANTS.mobileBodyPadding};

	& > aside {
		display: none;
	}

	@media screen and (min-width: ${theme`screens.smDesktop`}) {
		gap: 0 5%;
		padding: 0 10% 0 2.5%;
		grid-template-columns: 5% 65ch 1fr;

		& > *:not(aside) {
			grid-column: 2/3;
		}

		& > aside {
			display: block;
		}
	}
`;

export default SidebarLayout;
