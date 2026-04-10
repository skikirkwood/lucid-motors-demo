import { useContentfulLiveUpdates, useContentfulInspectorMode } from "@contentful/live-preview/react";
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

function TestimonialCard({ entry: initial }: { entry: TestimonialEntry }) {
  const entry = useContentfulLiveUpdates(initial);
  const inspectorProps = useContentfulInspectorMode({ entryId: entry.sys.id });

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
          <p className="font-semibold text-gray-900" {...inspectorProps({ fieldId: "name" })}>
            {fields.name}
          </p>
          {fields.vehicleInfo && (
            <p className="text-xs text-gray-500" {...inspectorProps({ fieldId: "vehicleInfo" })}>
              {fields.vehicleInfo}
            </p>
          )}
        </div>
      </div>
      {fields.storyLabel && (
        <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
          {fields.storyLabel}
        </span>
      )}
      {fields.headline && (
        <h3
          className="mb-2 text-lg font-bold text-gray-900"
          {...inspectorProps({ fieldId: "headline" })}
        >
          {fields.headline}
        </h3>
      )}
      <blockquote
        className="flex-1 text-sm leading-relaxed text-gray-600 italic"
        {...inspectorProps({ fieldId: "quote" })}
      >
        &ldquo;{fields.quote}&rdquo;
      </blockquote>
    </div>
  );
}

export default function TestimonialSection({ entry: initial }: Props) {
  const entry = useContentfulLiveUpdates(initial);
  const inspectorProps = useContentfulInspectorMode({ entryId: entry.sys.id });

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
              <h2
                className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                {...inspectorProps({ fieldId: "headline" })}
              >
                {fields.headline}
              </h2>
            )}
            {fields.description && (
              <p
                className="mx-auto mt-4 max-w-2xl text-lg text-gray-600"
                {...inspectorProps({ fieldId: "description" })}
              >
                {fields.description}
              </p>
            )}
          </div>
        )}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" {...inspectorProps({ fieldId: "testimonials" })}>
          {testimonials.map((t) => (
            <TestimonialCard key={t.sys.id} entry={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
