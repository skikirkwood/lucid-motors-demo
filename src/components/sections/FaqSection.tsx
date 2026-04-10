import { useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { isResolvedEntry } from "@/lib/helpers";
import type { FaqSectionEntry, FaqItemEntry } from "@/lib/types";
import type { Document } from "@contentful/rich-text-types";

interface Props {
  entry: FaqSectionEntry;
}

function FaqItem({ item }: { item: FaqItemEntry }) {
  const [open, setOpen] = useState(false);
  if (!isResolvedEntry(item)) return null;

  const fields = item.fields as {
    question?: string;
    answer?: Document;
  };

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-base font-medium text-gray-900">
          {fields.question}
        </span>
        <svg
          className={`h-5 w-5 flex-shrink-0 text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && fields.answer && (
        <div className="pb-5 text-sm leading-relaxed text-gray-600 prose prose-sm max-w-none">
          {documentToReactComponents(fields.answer)}
        </div>
      )}
    </div>
  );
}

export default function FaqSection({ entry }: Props) {
  const fields = entry.fields as {
    headline?: string;
    items?: FaqItemEntry[];
  };

  const items = (fields.items ?? []).filter(isResolvedEntry);
  if (items.length === 0) return null;

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {fields.headline && (
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {fields.headline}
          </h2>
        )}
        <div className="divide-y divide-gray-200 border-t border-gray-200">
          {items.map((item) => (
            <FaqItem key={item.sys.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
