export const STYLE_CONSTANTS = {
	mobileBodyPadding: "5vw",
	bodyPadding: "10vw",
};

export const FORMAT_CONSTANTS = {
	dateFormat: "MMM DD YYYY",
	dateTimeFormat: "MMM DD YYYY HH:mm:ss",
};

export const NUMBER_CONSTANTS = {
	refreshInterval: 10000,
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
