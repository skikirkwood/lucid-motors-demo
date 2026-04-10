import ContentfulImage from "@/components/ui/ContentfulImage";
import { isResolvedEntry } from "@/lib/helpers";
import type {
  TestimonialSectionEntry,
  TestimonialEntry,
  ImageWrapperEntry,
} from "@/lib/types";

interface Props {
  entry: TestimonialSectionEntry;
}

function TestimonialCard({ entry }: { entry: TestimonialEntry }) {
  if (!isResolvedEntry(entry)) return null;

  const fields = entry.fields as {
    name?: string;
    headline?: string;
    quote?: string;
    image?: ImageWrapperEntry;
    storyLabel?: string;
    vehicleInfo?: string;
  };

  return (
    <div className="flex flex-col rounded-xl bg-white p-6 shadow-md">
      <div className="flex items-center gap-4 mb-4">
        {fields.image && isResolvedEntry(fields.image) && (
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <ContentfulImage
              entry={fields.image}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
        )}
        <div>
          <p className="font-semibold text-gray-900">{fields.name}</p>
          {fields.vehicleInfo && (
            <p className="text-xs text-gray-500">{fields.vehicleInfo}</p>
          )}
        </div>
      </div>
      {fields.storyLabel && (
        <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
          {fields.storyLabel}
        </span>
      )}
      {fields.headline && (
        <h3 className="mb-2 text-lg font-bold text-gray-900">
          {fields.headline}
        </h3>
      )}
      <blockquote className="flex-1 text-sm leading-relaxed text-gray-600 italic">
        &ldquo;{fields.quote}&rdquo;
      </blockquote>
    </div>
  );
}

export default function TestimonialSection({ entry }: Props) {
  const fields = entry.fields as {
    headline?: string;
    description?: string;
    testimonials?: TestimonialEntry[];
    style?: string;
  };

  const testimonials = (fields.testimonials ?? []).filter(isResolvedEntry);
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.sys.id} entry={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
