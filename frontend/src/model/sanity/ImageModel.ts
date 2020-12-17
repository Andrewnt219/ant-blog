export type ImageModel = {
	metadata: {
		lqip: string;
		width: number;
		height: number;
		ratio: number;
	};
	url: string;
	alt?: string;
};

export const imageModelQuery = `
	{
		url,
		alt,
		"metadata": metadata {
			lqip,
			"width": dimensions.width,
			"height": dimensions.height,
			"ratio": dimensions.aspectRatio
		}									
	}
`;
