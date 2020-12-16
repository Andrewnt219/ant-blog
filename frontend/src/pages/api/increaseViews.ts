import { NextApiRequest, NextApiResponse } from "next";

import { writableClient } from "@src/lib/sanity/client";
export default async function increaseViews(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "PATCH") {
		return res.status(405).json({ message: "Only PATCH allowed" });
	}

	const { postId } = req.body;

	if (!postId) {
		return res.status(400).json({ message: "postId is not defined" });
	}

	if (typeof postId !== "string") {
		return res.status(401).json({ message: "postId must be a string" });
	}

	try {
		const updatedPost = await writableClient
			.patch(postId)
			.inc({ views: 1 })
			.commit();

		return res.status(200).json(updatedPost);
	} catch (err) {
		console.error(err);
		return res
			.status(500)
			.json({ message: "Fail to increase view of post " + postId });
	}
}
