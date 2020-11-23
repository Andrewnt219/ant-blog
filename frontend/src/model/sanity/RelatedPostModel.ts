export type RelatedPostsModel = {
	title: string;
	_id: string;
	publishedAt: string;
	image: {
		url: string;
		alt?: string;
	};
	slug: string;
};
