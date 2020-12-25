type IconData = {
	shadowColor: string;
	src: string;
	alt: string;
	href: string;
};
export const iconData: Record<"facebook" | "twitter" | "linkedin", IconData> = {
	facebook: {
		shadowColor: "19, 92, 182",
		alt: "facebook-logo",
		src: "/svg/facebook.svg",
		href: "https://www.facebook.com/sharer/sharer.php?u=",
	},
	twitter: {
		shadowColor: "8, 159, 197",
		alt: "twitter-logo",
		src: "/svg/twitter.svg",
		href: "https://www.twitter.com/sharer/sharer.php?u=",
	},

	linkedin: {
		shadowColor: "40, 103, 178",
		alt: "linkedIn-logo",
		src: "/svg/linkedin.svg",
		href: "https://www.linkedin.com/sharer/sharer.php?u=",
	},
};
