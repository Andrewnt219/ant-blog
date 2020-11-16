import { FirestoreComment } from "@src/components/Comment";
import db from "@src/lib/firebase/db";
import { useEffect, useState } from "react";

export type PostComment = FirestoreComment & {
	id: string;
};

export const usePostComments = (postId: string): PostComment[] => {
	const [comments, setComments] = useState<PostComment[]>([]);

	// Subscribe for live comments
	useEffect(() => {
		const unsubscribe = db
			.collection("comments")
			.where("_postId", "==", postId)
			.orderBy("_createdAt", "desc")
			.onSnapshot(
				(snapshot) => {
					const comments = snapshot.docs.map((doc) => ({
						...doc.data(),
						id: doc.id,
					})) as PostComment[];
					setComments(comments);
				},
				(error) => {
					setComments([]);
					console.log(error);
				}
			);

		return () => {
			unsubscribe();
		};
	}, [postId]);

	return comments;
};
