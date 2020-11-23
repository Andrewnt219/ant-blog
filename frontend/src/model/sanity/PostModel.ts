export type PostModel = {
	_id: string;
	categories: {
		title: string;
		slug: string;
	}[];
	rawContent: string;
	title: string;
	thumbnailSrc: string;
	body: any;
	author: {
		name: string;
		avatarSrc: string;
		slug: string;
		bio: any;
	};
	publishedAt: string;
};
