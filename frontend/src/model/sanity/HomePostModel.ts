export type HomePostModel = {
	isPinned: boolean;
	title: string;
	slug: string;
	publishedAt: string;
	category: {
		title: string;
		slug: string;
	};
	contentSnippet: string;
	author: string;
	snippet: string;
	image: {
		alt?: string;
		url: string;
	};
	body: any;
};
