import Link from 'next/link';
import React from 'react';

import Broken from '@src/components/Broken';

const PageNotFound = () => {
	return (
		<div>
			<Broken height="20rem" />
			<h1 style={{ textAlign: "center" }}>Oops... My dog ate the page</h1>
			<Link href="/">
				<a style={{ textAlign: "center", display: "block" }}>Go back</a>
			</Link>
		</div>
	);
};

export default PageNotFound;
