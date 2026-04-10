import { createClient, type ContentfulClientApi } from "contentful";

function getClient(preview = false): ContentfulClientApi<undefined> {
  return createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: preview
      ? process.env.CONTENTFUL_PREVIEW_TOKEN!
      : process.env.CONTENTFUL_ACCESS_TOKEN!,
    host: preview ? "preview.contentful.com" : "cdn.contentful.com",
    environment: process.env.CONTENTFUL_ENVIRONMENT ?? "master",
  });
}

export const client = getClient(false);
export const previewClient = getClient(true);

export async function getPageBySlug(slug: string, preview = false) {
  const api = preview ? previewClient : client;
  const entries = await api.getEntries({
    content_type: "page",
    "fields.slug": slug,
    include: 4,
    limit: 1,
  });
  return entries.items[0] ?? null;
}

export async function getAllPageSlugs() {
  const entries = await client.getEntries({
    content_type: "page",
    select: ["fields.slug"],
    limit: 200,
  });
  return entries.items.map((item) => (item.fields as { slug: string }).slug);
}

export async function getNavigationMenu(name: string, preview = false) {
  const api = preview ? previewClient : client;
  const entries = await api.getEntries({
    content_type: "navigationMenu",
    "fields.name": name,
    include: 3,
    limit: 1,
  });
  return entries.items[0] ?? null;
}
