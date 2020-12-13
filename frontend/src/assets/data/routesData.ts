import { LinkProps } from "next/link";
import { ENDPOINTS } from "../constants/StyleConstants";

export type RouteProps = Pick<LinkProps, "href" | "as"> & {
	text: string;
	exact?: boolean;
	dropdown?: RouteProps[];
};

export const routesData: RouteProps[] = [
	{
		text: "Home",
		href: "/",
		exact: true,
	},
	{
		text: "About me",
		href: "/about-me",
	},
	{
		text: "Music",
		href: "/music",
	},
	{
		text: "Categories",
		href: ENDPOINTS.category,
		exact: true,
		dropdown: [
			{
				href: ENDPOINTS.category + "/business",
				text: "Business",
			},
			{
				href: ENDPOINTS.category + "/thoughts",
				text: "Thoughts",
			},
			{
				href: ENDPOINTS.category + "/animals",
				text: "Animals",
			},
			{
				href: ENDPOINTS.category + "/music",
				text: "Music",
			},
		],
	},
];
