import { ENDPOINTS } from "@src/assets/constants/StyleConstants";
import { RouteProps, routesData } from "@src/assets/data/routesData";
import { useFeaturedCategories } from "./useFeaturedCategories";

export const useRoutesData = (): RouteProps[] => {
	const featuredCategories = useFeaturedCategories();

	const categoryRoute: RouteProps = {
		text: "Categories",
		href: ENDPOINTS.category,
		dropdown: featuredCategories,
	};

	return [...routesData, categoryRoute];
};
