import { LinkProps } from "next/link";

type Route = Pick<LinkProps, "href" | "as"> & {
	text: string;
};

export const routesData: Route[] = [
	{
		text: "Home",
		href: "/",
	},
	{
		text: "About me",
		href: "/about-me",
	},
	{
		text: "Guu",
		href: "/guu",
	},
];
