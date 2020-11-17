import Appbar from "@src/components/Appbar";
import Footer from "@src/components/Footer";
import React, { ReactElement, ReactNode } from "react";

type Props = {
	children: ReactNode;
};

function MainLayout({ children }: Props): ReactElement {
	return (
		<>
			<Appbar />
			{children}
			<Footer />
		</>
	);
}

export default MainLayout;
