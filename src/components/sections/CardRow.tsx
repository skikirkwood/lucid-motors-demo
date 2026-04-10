import ContentfulImage from "@/components/ui/ContentfulImage";
import Cta from "@/components/ui/Cta";
import { isResolvedEntry } from "@/lib/helpers";
import type {
  CardRowEntry,
  FeatureCardEntry,
  CtaEntry,
  ImageWrapperEntry,
} from "@/lib/types";

interface Props {
  entry: CardRowEntry;
}

function FeatureCard({ entry }: { entry: FeatureCardEntry }) {
  if (!isResolvedEntry(entry)) return null;

  const fields = entry.fields as {
    eyebrow?: string;
    headline?: string;
    description?: string;
    image?: ImageWrapperEntry;
    callToAction?: CtaEntry;
    style?: string;
  };

  const isDark = fields.style === "dark" || fields.style === "highlight";

  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-xl shadow-md transition-shadow hover:shadow-xl ${
        fields.style === "dark"
          ? "bg-gray-900 text-white"
          : fields.style === "highlight"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-900"
      }`}
    >
      {fields.image && isResolvedEntry(fields.image) && (
        <div className="relative aspect-video overflow-hidden">
          <ContentfulImage
            entry={fields.image}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        {fields.eyebrow && (
          <span
            className={`mb-2 text-xs font-semibold uppercase tracking-wider ${
              isDark ? "text-blue-300" : "text-blue-600"
            }`}
          >
            {fields.eyebrow}
          </span>
        )}
        <h3 className="text-lg font-bold">{fields.headline}</h3>
        {fields.description && (
          <p
            className={`mt-2 flex-1 text-sm leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {fields.description}
          </p>
        )}
        {fields.callToAction && isResolvedEntry(fields.callToAction) && (
          <div className="mt-4">
            <Cta entry={fields.callToAction} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function CardRow({ entry }: Props) {
  const fields = entry.fields as {
    headline?: string;
    description?: string;
    cards?: FeatureCardEntry[];
    style?: string;
  };

  const cards = (fields.cards ?? []).filter(isResolvedEntry);
  if (cards.length === 0) return null;

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(fields.headline || fields.description) && (
          <div className="mb-12 text-center">
            {fields.headline && (
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {fields.headline}
              </h2>
            )}
            {fields.description && (
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                {fields.description}
              </p>
            )}
          </div>
        )}
        <div
          className={`grid gap-8 ${
            cards.length === 1
              ? "grid-cols-1 max-w-lg mx-auto"
              : cards.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {cards.map((card) => (
            <FeatureCard key={card.sys.id} entry={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
