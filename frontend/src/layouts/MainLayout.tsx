import React, { ReactElement, ReactNode } from "react";

import Appbar from "@src/components/Appbar";
import Footer from "@src/components/Footer";
import { useFeaturedCategories } from "@src/hooks";
import Hamburger from "@src/components/Hamburger";

type Props = {
	children: ReactNode;
};

function MainLayout({ children }: Props): ReactElement {
	const featuredCategories = useFeaturedCategories();
	return (
		<>
			<Hamburger />
			<Appbar featuredCategories={featuredCategories} />
			{children}
			<Footer featuredCategories={featuredCategories} />
		</>
	);
}

export default MainLayout;
