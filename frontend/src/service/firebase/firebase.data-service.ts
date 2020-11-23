import { PostComment } from "@src/hooks";
import db from "@src/lib/firebase/db";
import { CommentModel } from "@src/model/firebase/CommentModel";
import { AxiosError } from "axios";
import firebase from "firebase/app";

export const addComment = (comment: CommentModel) => {
	try {
		db.collection("comments").add(comment);
	} catch (error) {
		console.log((error as AxiosError).message);
		console.log(error);
	}
};

export const addReply = (
	postId: string,
	reply: CommentModel,
	catchHandler?: () => void
) =>
	db
		.collection("comments")
		.doc(postId)
		.update({
			replies: firebase.firestore.FieldValue.arrayUnion(reply),
		})
		.catch(() => {
			catchHandler && catchHandler();
			console.error("Failed to reply");
		});

export const commentsListener = (
	postId: string,
	handler?: (comments: PostComment[]) => void,
	catcher?: () => void
) => {
	const unsubscriber = db
		.collection("comments")
		.where("_postId", "==", postId)
		.orderBy("_createdAt", "desc")
		.onSnapshot(
			(snapshot) => {
				const comments = snapshot.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				})) as PostComment[];

				handler && handler(comments);
			},
			(error) => {
				catcher && catcher();
				console.log(error);
			}
		);

	return unsubscriber;
};
