import omit from "lodash/omit";
import { CommentFormValues } from "@src/components/CommentWriter";
import { CommentModel } from "@src/model/firebase/CommentModel";

type ToFireStoreCommentProps = {
	data: CommentFormValues;
	_postId: string;
	replies: CommentModel["replies"];
};

export function toFireStoreComment({
	data,
	_postId,
	replies,
}: ToFireStoreCommentProps): CommentModel {
	return {
		...omit(data, ["isSaved"]),
		_postId,
		_createdAt: Date.now(),
		replies,
	};
}
