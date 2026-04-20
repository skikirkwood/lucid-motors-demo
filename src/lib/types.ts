import type { Asset, Entry, EntrySkeletonType } from "contentful";
import type { Document } from "@contentful/rich-text-types";

// Utility: extract fields from a resolved entry
export type Fields<T> = T extends Entry<infer S> ? S["fields"] : never;

// ── Foundation Types ──

export interface ImageWrapperFields {
  internalTitle: string;
  image: Asset;
  altText: string;
  focalPoint?: { x: number; y: number };
}
export type ImageWrapperEntry = Entry<
  EntrySkeletonType<ImageWrapperFields, "imageWrapper">
>;

export interface CtaFields {
  internalTitle: string;
  label: string;
  url: string;
  openInNewTab?: boolean;
  style?: "primary" | "secondary" | "link";
}
export type CtaEntry = Entry<EntrySkeletonType<CtaFields, "cta">>;

export interface SeoMetadataFields {
  internalTitle: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: ImageWrapperEntry;
  noIndex?: boolean;
}
export type SeoMetadataEntry = Entry<
  EntrySkeletonType<SeoMetadataFields, "seoMetadata">
>;

// ── Navigation ──

export interface NavigationItemFields {
  internalTitle: string;
  label: string;
  url?: string;
  page?: PageEntry;
  children?: NavigationItemEntry[];
}
export type NavigationItemEntry = Entry<
  EntrySkeletonType<NavigationItemFields, "navigationItem">
>;

export interface NavigationMenuFields {
  internalTitle: string;
  name: string;
  items?: NavigationItemEntry[];
}
export type NavigationMenuEntry = Entry<
  EntrySkeletonType<NavigationMenuFields, "navigationMenu">
>;

// ── Personalization (Ninetailed) ──

export type NinetailedExperienceEntry = Entry<EntrySkeletonType<Record<string, unknown>, "nt_experience">>;

// ── Sections ──

export interface HeroBannerFields {
  internalTitle: string;
  headline: string;
  subtitle?: string;
  backgroundImage?: ImageWrapperEntry;
  ctas?: CtaEntry[];
  style?: "dark" | "light" | "gradient";
  nt_experiences?: NinetailedExperienceEntry[];
}
export type HeroBannerEntry = Entry<
  EntrySkeletonType<HeroBannerFields, "heroBanner">
>;

export interface PromoBannerFields {
  internalTitle: string;
  message: string;
  headline?: string;
  backgroundImage?: ImageWrapperEntry;
  callToAction?: CtaEntry;
  style?: "default" | "highlight" | "dark";
  nt_experiences?: NinetailedExperienceEntry[];
}
export type PromoBannerEntry = Entry<
  EntrySkeletonType<PromoBannerFields, "promoBanner">
>;

export interface FeatureCardFields {
  internalTitle: string;
  eyebrow?: string;
  headline: string;
  description?: string;
  image?: ImageWrapperEntry;
  callToAction?: CtaEntry;
  style?: "default" | "highlight" | "dark" | "compact";
}
export type FeatureCardEntry = Entry<
  EntrySkeletonType<FeatureCardFields, "featureCard">
>;

export interface CardRowFields {
  internalTitle: string;
  headline?: string;
  description?: string;
  cards: FeatureCardEntry[];
  style?: "grid" | "carousel" | "stack";
  nt_experiences?: NinetailedExperienceEntry[];
}
export type CardRowEntry = Entry<
  EntrySkeletonType<CardRowFields, "cardRow">
>;

export interface ServicePlanFields {
  internalTitle: string;
  name: string;
  monthlyPrice?: string;
  annualPrice?: string;
  description?: string;
  features?: string[];
  icon?: ImageWrapperEntry;
  badge?: string;
  callToAction?: CtaEntry;
  legalDisclaimer?: string;
}
export type ServicePlanEntry = Entry<
  EntrySkeletonType<ServicePlanFields, "servicePlan">
>;

export interface PlanComparisonFields {
  internalTitle: string;
  headline?: string;
  description?: string;
  plans: ServicePlanEntry[];
  featuredPlan?: ServicePlanEntry;
  callToAction?: CtaEntry;
  nt_experiences?: NinetailedExperienceEntry[];
}
export type PlanComparisonEntry = Entry<
  EntrySkeletonType<PlanComparisonFields, "planComparison">
>;

export interface FaqItemFields {
  internalTitle: string;
  question: string;
  answer: Document;
}
export type FaqItemEntry = Entry<
  EntrySkeletonType<FaqItemFields, "faqItem">
>;

export interface FaqSectionFields {
  internalTitle: string;
  headline?: string;
  items: FaqItemEntry[];
  nt_experiences?: NinetailedExperienceEntry[];
}
export type FaqSectionEntry = Entry<
  EntrySkeletonType<FaqSectionFields, "faqSection">
>;

export interface TestimonialFields {
  internalTitle: string;
  name: string;
  headline?: string;
  quote: string;
  image?: ImageWrapperEntry;
  storyLabel?: string;
  vehicleInfo?: string;
}
export type TestimonialEntry = Entry<
  EntrySkeletonType<TestimonialFields, "testimonial">
>;

export interface TestimonialSectionFields {
  internalTitle: string;
  headline?: string;
  description?: string;
  testimonials: TestimonialEntry[];
  style?: "carousel" | "grid";
  nt_experiences?: NinetailedExperienceEntry[];
}
export type TestimonialSectionEntry = Entry<
  EntrySkeletonType<TestimonialSectionFields, "testimonialSection">
>;

export interface RichTextSectionFields {
  internalTitle: string;
  headline?: string;
  body: Document;
  image?: ImageWrapperEntry;
  callToAction?: CtaEntry;
  style?: "default" | "centered" | "split";
  nt_experiences?: NinetailedExperienceEntry[];
}
export type RichTextSectionEntry = Entry<
  EntrySkeletonType<RichTextSectionFields, "richTextSection">
>;

export interface VehicleFields {
  internalTitle: string;
  brand: string;
  model: string;
  year: number;
  availability?: string;
  features?: string[];
  image?: ImageWrapperEntry;
}
export type VehicleEntry = Entry<
  EntrySkeletonType<VehicleFields, "vehicle">
>;

export interface VehicleShowcaseFields {
  internalTitle: string;
  headline?: string;
  description?: string;
  vehicles: VehicleEntry[];
  nt_experiences?: NinetailedExperienceEntry[];
}
export type VehicleShowcaseEntry = Entry<
  EntrySkeletonType<VehicleShowcaseFields, "vehicleShowcase">
>;

// ── Page ──

export type SectionEntry =
  | HeroBannerEntry
  | PromoBannerEntry
  | CardRowEntry
  | PlanComparisonEntry
  | FaqSectionEntry
  | TestimonialSectionEntry
  | VehicleShowcaseEntry
  | RichTextSectionEntry;

export interface PageFields {
  internalTitle: string;
  title: string;
  slug: string;
  seoMetadata?: SeoMetadataEntry;
  sections?: SectionEntry[];
}
export type PageEntry = Entry<EntrySkeletonType<PageFields, "page">>;
