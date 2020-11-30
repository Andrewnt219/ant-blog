import { NextApiRequest, NextApiResponse } from 'next';

// TODO: https://nextjs.org/docs/advanced-features/preview-mode
// https://github.com/vercel/next.js/blob/canary/examples/cms-sanity/pages/api/preview.js
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // ...
  res.setPreviewData({}).end("Preview mode enabled");
}
