// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ApiError } from 'api';
import Axios, { AxiosError } from 'axios';
import { GuuArticle } from 'guu';
import { NextApiRequest, NextApiResponse } from 'next';
import Parser from 'rss-parser';

const parser = new Parser();

export default async (
  req: NextApiRequest,
  res: NextApiResponse<GuuArticle[] | ApiError>
) => {
  if (req.method === "GET") {
    try {
      const feed = await parser.parseURL(
        "http://fetchrss.com/rss/5f8da4374c3c4c312e67c8035f8da46892c5fa1981451d02.xml"
      );
      return res.status(200).json(feed.items as GuuArticle[]);
    } catch (error) {
      res.status(500).json({
        message: "Cannot fetch GUU feed",
        error: (error as AxiosError).response?.data,
      });
    }
  }

  return res.status(405).json({ message: "Only GET is allowed" });
};
