import type { Asset, Entry } from "contentful";

export function isResolvedEntry(ref: unknown): ref is Entry {
  return (
    typeof ref === "object" &&
    ref !== null &&
    "sys" in ref &&
    (ref as Entry).sys?.type === "Entry" &&
    "fields" in ref
  );
}

export function isResolvedAsset(ref: unknown): ref is Asset {
  return (
    typeof ref === "object" &&
    ref !== null &&
    "sys" in ref &&
    (ref as Asset).sys?.type === "Asset" &&
    "fields" in ref
  );
}

export function getContentTypeId(entry: Entry): string {
  return entry.sys.contentType?.sys?.id ?? "";
}

export function imageUrl(asset: Asset, width?: number): string {
  const url = (asset.fields as { file?: { url?: string } })?.file?.url;
  if (!url) return "";
  const base = url.startsWith("//") ? `https:${url}` : url;
  return width ? `${base}?w=${width}&fm=webp&q=80` : `${base}?fm=webp&q=80`;
}

/**
 * Deep-clones a value while dropping any circular references.
 * Used to make Contentful entry data safe to pass as Next.js page props.
 */
export function serializeSafe<T>(value: T): T {
  const seen = new WeakSet();
  return JSON.parse(
    JSON.stringify(value, (_, v) => {
      if (typeof v === "object" && v !== null) {
        if (seen.has(v)) return undefined;
        seen.add(v);
      }
      return v;
    }),
  );
}
