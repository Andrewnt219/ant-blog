import omit from "lodash/omit";
import { CommentFormValues } from "@src/components/CommentWriter";
import { FirestoreComment } from "@src/components/post/CommentSet";

type ToFireStoreCommentProps = {
	data: CommentFormValues;
	_postId: string;
	replies: FirestoreComment["replies"];
};

export function toFireStoreComment({
	data,
	_postId,
	replies,
}: ToFireStoreCommentProps): FirestoreComment {
	return {
		...omit(data, ["isSaved"]),
		_postId,
		_createdAt: Date.now(),
		replies,
	};
}
