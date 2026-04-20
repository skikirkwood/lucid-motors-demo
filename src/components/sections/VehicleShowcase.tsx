import { useContentfulLiveUpdates, useContentfulInspectorMode } from "@contentful/live-preview/react";
import ContentfulImage from "@/components/ui/ContentfulImage";
import { isResolvedEntry } from "@/lib/helpers";
import type {
  VehicleShowcaseEntry,
  VehicleEntry,
  ImageWrapperEntry,
} from "@/lib/types";

interface Props {
  entry: VehicleShowcaseEntry;
}

function VehicleCard({ entry: initial }: { entry: VehicleEntry }) {
  const entry = useContentfulLiveUpdates(initial);
  const inspectorProps = useContentfulInspectorMode({ entryId: entry.sys.id });

  if (!isResolvedEntry(entry)) return null;

  const fields = entry.fields as {
    brand?: string;
    model?: string;
    year?: number;
    availability?: string;
    features?: string[];
    image?: ImageWrapperEntry;
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-xl">
      {fields.image && isResolvedEntry(fields.image) && (
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100" {...inspectorProps({ fieldId: "image" })}>
          <ContentfulImage
            entry={fields.image}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      )}
      <div className="p-5">
        <span
          className="text-xs font-semibold uppercase tracking-wider text-zinc-500"
          {...inspectorProps({ fieldId: "brand" })}
        >
          {fields.brand}
        </span>
        <h3 className="mt-1 text-lg font-bold text-gray-900" {...inspectorProps({ fieldId: "model" })}>
          {fields.year} {fields.model}
        </h3>
        {fields.availability && (
          <p className="mt-1 text-sm text-gray-500">{fields.availability}</p>
        )}
        {fields.features && fields.features.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {fields.features.slice(0, 4).map((feat, i) => (
              <span
                key={i}
                className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700"
              >
                {feat}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function VehicleShowcase({ entry: initial }: Props) {
  const entry = useContentfulLiveUpdates(initial);
  const inspectorProps = useContentfulInspectorMode({ entryId: entry.sys.id });

  const fields = entry.fields as {
    headline?: string;
    description?: string;
    vehicles?: VehicleEntry[];
  };

  const vehicles = (fields.vehicles ?? []).filter(isResolvedEntry);
  if (vehicles.length === 0) return null;

  return (
    <section className="py-16 lg:py-24">
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" {...inspectorProps({ fieldId: "vehicles" })}>
          {vehicles.map((v) => (
            <VehicleCard key={v.sys.id} entry={v} />
          ))}
        </div>
      </div>
    </section>
  );
}
