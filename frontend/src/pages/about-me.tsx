import Pagination from "@src/components/Pagination";
import { useQueryPaginationItems } from "@src/hooks";
import Axios from "axios";
import React, { useCallback } from "react";

const AboutMe = () => {
	const onPageChange = useCallback((newPageNumber: number | null) => {
		Axios.get(
			`https://jsonplaceholder.typicode.com/posts/${newPageNumber ?? 1}`
		).then((res) => console.log(res.data));
	}, []);

	const { items } = useQueryPaginationItems({ onPageChange, count: 100 });
	return (
		<>
			<h1>About me</h1>
			<div>
				<Pagination items={items} />
			</div>
		</>
	);
};

export default AboutMe;
