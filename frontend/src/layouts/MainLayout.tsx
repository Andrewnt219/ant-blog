import React, { ReactElement, ReactNode } from 'react';

import Appbar from '@src/components/Appbar';
import Footer from '@src/components/Footer';

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
