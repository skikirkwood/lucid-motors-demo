import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { secret, slug } = req.query;

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  res.setPreviewData({});

  const redirectPath = slug === "home" || !slug ? "/" : `/${slug}`;
  res.redirect(redirectPath);
}
