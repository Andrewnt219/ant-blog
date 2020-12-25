import React, { ReactElement, ReactNode, useState } from "react";

import Appbar from "@src/components/Appbar";
import Footer from "@src/components/Footer";
import { useFeaturedCategories } from "@src/hooks";
import Hamburger from "@src/components/Hamburger";
import MobileMenu from "@src/components/MobileMenu";
import { AnimatePresence } from "framer-motion";

type Props = {
	children: ReactNode;
};

function MainLayout({ children }: Props): ReactElement {
	const featuredCategories = useFeaturedCategories();

	const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

	return (
		<>
			<Hamburger
				isOpen={isMenuOpened}
				handleClick={() => setIsMenuOpened((prev) => !prev)}
			/>
			<AnimatePresence>
				{isMenuOpened && (
					<MobileMenu
						isOpen={isMenuOpened}
						handleBackdropClicked={() => setIsMenuOpened((prev) => !prev)}
					/>
				)}
			</AnimatePresence>
			<Appbar featuredCategories={featuredCategories} />
			{children}
			<Footer featuredCategories={featuredCategories} />
		</>
	);
}

export default MainLayout;
