import { LinkProps } from "next/link";

export type RouteProps = Pick<LinkProps, "href" | "as"> & {
	text: string;
	exact?: boolean;
};

export const routesData: RouteProps[] = [
	{
		text: "About me",
		href: "/about-me",
	},
	{
		text: "Home",
		href: "/",
		exact: true,
	},
	{
		text: "Music",
		href: "/music",
	},
];
