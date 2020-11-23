import { PostComment } from "@src/hooks";
import { CommentModel } from "@src/model/firebase/CommentModel";
import { AxiosError } from "axios";
import firebase from "firebase/app";
export class FireBaseDataService {
	private static instance: FireBaseDataService;
	private static db: firebase.firestore.Firestore | null = null;

	private static setup = async () => {
		try {
			FireBaseDataService.db = (await import("@src/lib/firebase/db")).default;
		} catch (error) {
			console.error("Fail to import db");
		}
	};

	public static async getInstance() {
		if (!FireBaseDataService.instance) {
			FireBaseDataService.instance = new FireBaseDataService();
		}

		if (!FireBaseDataService.db) {
			await FireBaseDataService.setup();
		}

		return FireBaseDataService.instance;
	}

	addComment = (comment: CommentModel) => {
		if (!FireBaseDataService.db) {
			return;
		}

		FireBaseDataService.db
			.collection("comments")
			.add(comment)
			.catch((error) => {
				console.log((error as AxiosError).message);
				console.log(error);
			});
	};

	addReply = (
		postId: string,
		reply: CommentModel,
		catchHandler?: () => void
	) => {
		if (!FireBaseDataService.db) {
			return;
		}

		FireBaseDataService.db
			.collection("comments")
			.doc(postId)
			.update({
				replies: firebase.firestore.FieldValue.arrayUnion(reply),
			})
			.catch(() => {
				catchHandler && catchHandler();
				console.error("Failed to reply");
			});
	};

	commentsListener = (
		postId: string,
		handler?: (comments: PostComment[]) => void,
		catcher?: () => void
	) => {
		if (!FireBaseDataService.db) {
			return;
		}

		const unsubscriber = FireBaseDataService.db
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
}
