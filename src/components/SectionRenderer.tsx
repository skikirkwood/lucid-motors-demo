import { getContentTypeId, isResolvedEntry } from "@/lib/helpers";
import type { SectionEntry } from "@/lib/types";

import HeroBanner from "./sections/HeroBanner";
import PromoBanner from "./sections/PromoBanner";
import CardRow from "./sections/CardRow";
import PlanComparison from "./sections/PlanComparison";
import FaqSection from "./sections/FaqSection";
import TestimonialSection from "./sections/TestimonialSection";
import RichTextSection from "./sections/RichTextSection";
import VehicleShowcase from "./sections/VehicleShowcase";

const componentMap: Record<string, React.ComponentType<{ entry: any }>> = {
  heroBanner: HeroBanner,
  promoBanner: PromoBanner,
  cardRow: CardRow,
  planComparison: PlanComparison,
  faqSection: FaqSection,
  testimonialSection: TestimonialSection,
  richTextSection: RichTextSection,
  vehicleShowcase: VehicleShowcase,
};

interface Props {
  sections: SectionEntry[];
}

export default function SectionRenderer({ sections }: Props) {
  return (
    <>
      {sections.map((section) => {
        if (!isResolvedEntry(section)) return null;

        const contentTypeId = getContentTypeId(section);
        const Component = componentMap[contentTypeId];

        if (!Component) {
          if (process.env.NODE_ENV === "development") {
            return (
              <div
                key={section.sys.id}
                className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-gray-400"
              >
                Unknown section type: <code>{contentTypeId}</code>
              </div>
            );
          }
          return null;
        }

        return <Component key={section.sys.id} entry={section} />;
      })}
    </>
  );
}
