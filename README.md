# Lucid Motors – Next.js + Contentful

A Next.js (Pages Router) front-end that renders pages composed in Contentful, styled as a Lucid Motors marketing demo.

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Copy `.env.example` to `.env.local` and fill in your Contentful credentials:

   ```bash
   cp .env.example .env.local
   ```

   | Variable | Description |
   |---|---|
   | `CONTENTFUL_SPACE_ID` | Your Contentful space ID |
   | `CONTENTFUL_ACCESS_TOKEN` | Content Delivery API token |
   | `CONTENTFUL_PREVIEW_TOKEN` | Content Preview API token |
   | `CONTENTFUL_ENVIRONMENT` | Environment name (default: `master`) |

3. **Create a home page in Contentful**

   Create a **Page** entry with slug `home`. Add section entries (Hero Banner, Card Row, etc.) to the page's `sections` field.

4. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Architecture

```
src/
├── components/
│   ├── sections/          # One component per Contentful section type
│   │   ├── HeroBanner.tsx
│   │   ├── PromoBanner.tsx
│   │   ├── CardRow.tsx
│   │   ├── PlanComparison.tsx
│   │   ├── FaqSection.tsx
│   │   ├── TestimonialSection.tsx
│   │   ├── RichTextSection.tsx
│   │   └── VehicleShowcase.tsx
│   ├── ui/                # Reusable primitives
│   │   ├── ContentfulImage.tsx
│   │   └── Cta.tsx
│   ├── Footer.tsx
│   ├── Layout.tsx
│   ├── Navigation.tsx
│   └── SectionRenderer.tsx
├── lib/
│   ├── contentful.ts      # Contentful client & data fetching
│   ├── helpers.ts         # Type guards & image URL builder
│   └── types.ts           # TypeScript types for every content type
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx           # Renders the "home" page
│   └── [slug].tsx          # Renders any other page by slug
└── styles/
    └── globals.css
```

### How pages work

Every page in Contentful has a **slug** and an array of **sections**. The `SectionRenderer` maps each section's content type ID to the corresponding React component. Adding a new section type is as simple as creating the component and registering it in `SectionRenderer.tsx`.

### Static generation with ISR

Pages are statically generated at build time via `getStaticProps` and revalidated every 60 seconds (ISR). The `[slug].tsx` catch-all uses `fallback: "blocking"` so new pages published in Contentful are rendered on first request.
