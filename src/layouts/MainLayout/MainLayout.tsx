import Appbar from "@src/components/Appbar";
import Footer from "@src/components/Footer";
import React, { ReactElement, ReactNode } from "react";
import tw, { styled } from "twin.macro";

type Props = {
	children: ReactNode;
};

function MainLayout({ children }: Props): ReactElement {
	return (
		<>
			<Appbar />
			<Main>{children}</Main>
			<Footer />
		</>
	);
}

type MainProps = {};
const Main = styled.main<MainProps>``;

export default MainLayout;
