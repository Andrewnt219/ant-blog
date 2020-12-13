import { LinkProps } from "next/link";
import { ENDPOINTS } from "../constants/StyleConstants";

export type RouteProps = Pick<LinkProps, "href" | "as"> & {
	text: string;
	exact?: boolean;
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
	},
];
