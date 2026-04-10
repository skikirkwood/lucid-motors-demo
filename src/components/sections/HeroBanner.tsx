import { useContentfulLiveUpdates, useContentfulInspectorMode } from "@contentful/live-preview/react";
import ContentfulImage from "@/components/ui/ContentfulImage";
import Cta from "@/components/ui/Cta";
import { isResolvedEntry } from "@/lib/helpers";
import type { HeroBannerEntry, CtaEntry, ImageWrapperEntry } from "@/lib/types";

interface Props {
  entry: HeroBannerEntry;
}

const overlayStyles: Record<string, string> = {
  dark: "bg-gray-950/70",
  light: "bg-white/60",
  gradient: "bg-gradient-to-r from-gray-950/80 to-transparent",
};

export default function HeroBanner({ entry: initial }: Props) {
  const entry = useContentfulLiveUpdates(initial);
  const inspectorProps = useContentfulInspectorMode({ entryId: entry.sys.id });

  const fields = entry.fields as {
    headline?: string;
    subtitle?: string;
    backgroundImage?: ImageWrapperEntry;
    ctas?: CtaEntry[];
    style?: string;
  };

  const style = fields.style ?? "dark";
  const textColor = style === "light" ? "text-gray-900" : "text-white";

  return (
    <section className="relative flex min-h-[520px] items-center overflow-hidden lg:min-h-[620px]">
      {fields.backgroundImage && isResolvedEntry(fields.backgroundImage) && (
        <div className="absolute inset-0" {...inspectorProps({ fieldId: "backgroundImage" })}>
          <ContentfulImage
            entry={fields.backgroundImage}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className={`absolute inset-0 ${overlayStyles[style] ?? overlayStyles.dark}`} />
        </div>
      )}
      {!fields.backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-gray-950" />
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1
            className={`text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl ${textColor}`}
            {...inspectorProps({ fieldId: "headline" })}
          >
            {fields.headline}
          </h1>
          {fields.subtitle && (
            <p
              className={`mt-4 text-lg sm:text-xl ${style === "light" ? "text-gray-600" : "text-gray-300"}`}
              {...inspectorProps({ fieldId: "subtitle" })}
            >
              {fields.subtitle}
            </p>
          )}
          {fields.ctas && fields.ctas.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-4" {...inspectorProps({ fieldId: "ctas" })}>
              {fields.ctas.map(
                (cta) =>
                  isResolvedEntry(cta) && (
                    <Cta key={cta.sys.id} entry={cta} />
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
