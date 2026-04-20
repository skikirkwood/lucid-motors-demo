import type { NextApiRequest, NextApiResponse } from "next";
import { getBlogPostBySlug, getPageBySlug } from "@/lib/contentful";

/**
 * Enables Contentful Live Preview. Configure preview URL as:
 * `/api/draft?secret=<CONTENTFUL_PREVIEW_SECRET>&slug=<slug>`
 *
 * Optional query params:
 * - `path` — explicit redirect path (must start with `/`, no protocol); wins over slug resolution
 * - `contentType` — `blogPost` or `blog` to send traffic to `/blog/<slug>` without lookup
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { secret, slug, path: pathQuery, contentType } = req.query;

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  res.setPreviewData({});

  const safePath =
    typeof pathQuery === "string" &&
    pathQuery.startsWith("/") &&
    !pathQuery.startsWith("//") &&
    !pathQuery.includes("://")
      ? pathQuery
      : null;

  if (safePath) {
    res.redirect(safePath);
    return;
  }

  const slugStr = typeof slug === "string" ? slug : "";
  if (!slugStr || slugStr === "home") {
    res.redirect("/");
    return;
  }

  const ct = typeof contentType === "string" ? contentType : "";
  if (ct === "blogPost" || ct === "blog") {
    res.redirect(`/blog/${slugStr}`);
    return;
  }

  const [blogPost, page] = await Promise.all([
    getBlogPostBySlug(slugStr, true),
    getPageBySlug(slugStr, true),
  ]);

  if (blogPost) {
    res.redirect(`/blog/${slugStr}`);
    return;
  }

  if (page) {
    res.redirect(`/${slugStr}`);
    return;
  }

  res.redirect(`/${slugStr}`);
}
