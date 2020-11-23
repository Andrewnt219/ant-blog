import { CommentModel } from "@src/model/firebase/CommentModel";
import { useEffect, useState } from "react";
import * as firebaseDataService from "@src/service/firebase/firebase.data-service";

export type PostComment = CommentModel & {
	id: string;
};

export const usePostComments = (postId: string): PostComment[] => {
	const [comments, setComments] = useState<PostComment[]>([]);

	// Subscribe for live comments
	useEffect(() => {
		const handler = (comments: PostComment[]) => setComments(comments);
		const catcher = () => setComments([]);

		const unsubscribe = firebaseDataService.commentsListener(
			postId,
			handler,
			catcher
		);

		return () => {
			unsubscribe();
		};
	}, [postId]);

	return comments;
};
