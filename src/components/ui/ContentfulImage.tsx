import Image from "next/image";
import { isResolvedAsset, isResolvedEntry, imageUrl } from "@/lib/helpers";
import type { ImageWrapperEntry } from "@/lib/types";

interface Props {
  entry: ImageWrapperEntry | undefined | null;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
}

export default function ContentfulImage({
  entry,
  width,
  height,
  className,
  priority,
  fill,
  sizes,
}: Props) {
  if (!entry || !isResolvedEntry(entry)) return null;

  const fields = entry.fields as {
    image?: unknown;
    altText?: string;
  };

  const asset = fields.image;
  if (!asset || !isResolvedAsset(asset)) return null;

  const src = imageUrl(asset, width ?? 1200);
  const alt = fields.altText ?? "";

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1200}
      height={height ?? 675}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}
