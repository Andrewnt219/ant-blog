export const STYLE_CONSTANTS = {
	mobileBodyPadding: "5vw",
	bodyPadding: "10vw",
	recentPostSizes: {
		main:
			"(min-width: 1280px) 51.98vw, (min-width: 640px) 80vw, calc(87.19vw + 17px)",
		default:
			"(min-width: 1280px) 25.06vw, (min-width: 780px) 40vw, (min-width: 640px) 80vw, 90vw",
	},
	sidePostsSizes: "(min-width: 1280px) 11.51vw",
	footerHeight: "15rem",
};

export const FORMAT_CONSTANTS = {
	dateFormat: "MMM DD YYYY",
	dateTimeFormat: "MMM DD YYYY HH:mm:ss",
};

export const NUMBER_CONSTANTS = {
	refreshInterval: 30000,
	defaultPerPage: 5,
};

export const ENDPOINTS = {
	author: "/authors",
	category: "/categories",
};

export const LOCAL_STORAGE = {
	commentName: "comment-name",
};

export type SizeKey = typeof OTHER_CONSTANTS.imageSizes[number];
export const OTHER_CONSTANTS = {
	imageSizes: [
		320,
		420,
		768,
		1024,
		1200,
		1600,
		1920,
		2560,
		3840,
		5120,
		7680,
	] as const,
};
