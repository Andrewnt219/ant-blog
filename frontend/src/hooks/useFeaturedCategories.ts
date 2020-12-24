import { ENDPOINTS } from "@src/assets/constants/StyleConstants";
import { RouteProps } from "@src/assets/data/routesData";
import { SanityDataService } from "@src/service/sanity/sanity.data-service";
import { useEffect, useState } from "react";

export const useFeaturedCategories = () => {
	const [data, setData] = useState<RouteProps[]>([]);

	useEffect(() => {
		SanityDataService.getInstance()
			.getFeaturedCategories()
			.then((categories) => {
				const routes: RouteProps[] = [];

				categories.forEach((category) => {
					routes.push({
						href: ENDPOINTS.category + "/" + category.slug,
						text: category.title,
					});
				});

				routes.push({
					href: ENDPOINTS.category,
					text: "All",
					exact: true,
				});

				setData(routes);
			})
			.catch((err) => {
				console.error(err);
				setData([]);
			});
	}, []);

	return data;
};
