// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import sanityClient from "@src/lib/sanity";
import { ApiError } from "api";
import { AxiosError } from "axios";

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse<ApiError>) => {
	if (req.method === "POST") {
		const { name, text, _postId } = req.body;

		try {
			sanityClient
				.config({
					token: process.env.SANITY_API_TOKEN,
					useCdn: false,
				})
				.create({
					// type from the comment schema
					_type: "comment",
					name,
					text,
					post: {
						_type: "reference",
						_ref: _postId,
					},
				});

			return res.status(200).json({ message: "Success" });
		} catch (error) {
			res.status(500).json({
				message: "Fail to post comment",
				error: (error as AxiosError).response?.data,
			});
		}
	}

	return res.status(405).json({ message: "Only POST is allowed" });
};
