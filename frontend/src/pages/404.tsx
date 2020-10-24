import React from "react";
import Link from "next/link";
import Broken from "@src/components/Broken";

const PageNotFound = () => {
	return (
		<div>
			<Broken />
			<h1 style={{ textAlign: "center" }}>Oops... My dog ate the page</h1>
			<Link href="/">
				<a style={{ textAlign: "center", display: "block" }}>Go back</a>
			</Link>
		</div>
	);
};

export default PageNotFound;
