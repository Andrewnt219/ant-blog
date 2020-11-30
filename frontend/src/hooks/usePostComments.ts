import { useEffect, useState } from 'react';

import { CommentModel } from '@src/model/firebase/CommentModel';
import { FireBaseDataService } from '@src/service/firebase/firebase.data-service';

export type PostComment = CommentModel & {
	id: string;
};

export const usePostComments = (postId: string): PostComment[] => {
	const [comments, setComments] = useState<PostComment[]>([]);

	// Subscribe for live comments
	useEffect(() => {
		const handler = (comments: PostComment[]) => setComments(comments);
		const catcher = () => setComments([]);
		let unsubscribe: (() => void) | undefined;
		FireBaseDataService.getInstance().then(
			(instance) =>
				(unsubscribe = instance.commentsListener(postId, handler, catcher))
		);

		return () => {
			unsubscribe && unsubscribe();
		};
	}, [postId]);

	return comments;
};
