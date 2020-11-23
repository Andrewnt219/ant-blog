export type CommentModel = {
	username: string;
	text: string;
	_postId: string;
	_createdAt: number;
	replies: CommentModel[];
};
