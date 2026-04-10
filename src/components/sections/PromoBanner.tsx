import { useContentfulLiveUpdates, useContentfulInspectorMode } from "@contentful/live-preview/react";
import Cta from "@/components/ui/Cta";
import { isResolvedEntry } from "@/lib/helpers";
import type { PromoBannerEntry, CtaEntry } from "@/lib/types";

interface Props {
  entry: PromoBannerEntry;
}

const bgStyles: Record<string, string> = {
  default: "bg-blue-600",
  highlight: "bg-amber-500",
  dark: "bg-gray-900",
};

export default function PromoBanner({ entry: initial }: Props) {
  const entry = useContentfulLiveUpdates(initial);
  const inspectorProps = useContentfulInspectorMode({ entryId: entry.sys.id });

  const fields = entry.fields as {
    message?: string;
    headline?: string;
    callToAction?: CtaEntry;
    style?: string;
  };

  const style = fields.style ?? "default";

  return (
    <section className={`${bgStyles[style] ?? bgStyles.default} py-3`}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 text-center sm:px-6 lg:px-8">
        {fields.headline && (
          <span className="text-sm font-bold text-white" {...inspectorProps({ fieldId: "headline" })}>
            {fields.headline}
          </span>
        )}
        <span className="text-sm text-white/90" {...inspectorProps({ fieldId: "message" })}>
          {fields.message}
        </span>
        {fields.callToAction && isResolvedEntry(fields.callToAction) && (
          <Cta
            entry={fields.callToAction}
            className="!bg-white !text-blue-700 !px-4 !py-1.5 !text-xs hover:!bg-gray-100"
          />
        )}
      </div>
    </section>
  );
}
