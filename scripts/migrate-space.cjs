#!/usr/bin/env node

/**
 * Contentful Space-to-Space Migration Script
 *
 * Exports everything from the source space and imports it into the target space.
 * Handles content types, editor interfaces, entries, assets (including binaries),
 * locales, and tags.
 *
 * Usage:
 *   CONTENTFUL_MANAGEMENT_TOKEN=<your-cma-token> node scripts/migrate-space.cjs
 *
 * Optional env vars:
 *   SOURCE_SPACE_ID       (default: h7nmcj3glia0)
 *   SOURCE_ENV            (default: master)
 *   TARGET_SPACE_ID       (default: 6483i39arsno)
 *   TARGET_ENV            (default: master)
 *   EXPORT_DIR            (default: ./migration-data)
 *   SKIP_CONTENT_MODEL    (default: false — set "true" to skip content type creation)
 *   SKIP_CONTENT          (default: false — set "true" to skip entries + assets)
 */

const { existsSync, mkdirSync } = require("node:fs");
const { resolve, join } = require("node:path");

const CMA_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
if (!CMA_TOKEN) {
  console.error(
    "\n❌  Missing CONTENTFUL_MANAGEMENT_TOKEN env var.\n" +
      "   You can create one at https://app.contentful.com/account/profile/cma_tokens\n"
  );
  process.exit(1);
}

const SOURCE_SPACE = process.env.SOURCE_SPACE_ID || "h7nmcj3glia0";
const SOURCE_ENV = process.env.SOURCE_ENV || "master";
const TARGET_SPACE = process.env.TARGET_SPACE_ID || "6483i39arsno";
const TARGET_ENV = process.env.TARGET_ENV || "master";
const EXPORT_DIR = resolve(process.env.EXPORT_DIR || "./migration-data");
const SKIP_MODEL = process.env.SKIP_CONTENT_MODEL === "true";
const SKIP_CONTENT = process.env.SKIP_CONTENT === "true";

if (!existsSync(EXPORT_DIR)) {
  mkdirSync(EXPORT_DIR, { recursive: true });
}

const exportFile = join(EXPORT_DIR, `export-${SOURCE_SPACE}-${Date.now()}.json`);

async function main() {
  const contentfulExport = require("contentful-export");
  const contentfulImport = require("contentful-import");

  console.log("\n╔══════════════════════════════════════════════════════╗");
  console.log("║       Contentful Space-to-Space Migration            ║");
  console.log("╚══════════════════════════════════════════════════════╝");
  console.log(`  Source:  space=${SOURCE_SPACE}  env=${SOURCE_ENV}`);
  console.log(`  Target:  space=${TARGET_SPACE}  env=${TARGET_ENV}`);
  console.log(`  Export:  ${exportFile}`);
  console.log(`  Skip content model: ${SKIP_MODEL}`);
  console.log(`  Skip content:       ${SKIP_CONTENT}\n`);

  // ── Step 1: Export from source ──────────────────────────────────────────

  console.log("━━━ Step 1/2: Exporting from source space ━━━\n");

  try {
    await contentfulExport({
      spaceId: SOURCE_SPACE,
      environmentId: SOURCE_ENV,
      managementToken: CMA_TOKEN,
      exportDir: EXPORT_DIR,
      contentFile: exportFile,
      includeDrafts: true,
      includeArchived: false,
      downloadAssets: true,
      maxAllowedLimit: 100,
      saveFile: true,
      useVerboseRenderer: false,
      skipContentModel: SKIP_MODEL,
      skipContent: SKIP_CONTENT,
      skipWebhooks: true,
      skipRoles: true,
      skipEditorInterfaces: false,
    });
    console.log("\n✅  Export complete.\n");
  } catch (err) {
    console.error("\n❌  Export failed:", err.message || err);
    process.exit(1);
  }

  // ── Step 2: Import into target ──────────────────────────────────────────

  console.log("━━━ Step 2/2: Importing into target space ━━━\n");

  try {
    await contentfulImport({
      spaceId: TARGET_SPACE,
      environmentId: TARGET_ENV,
      managementToken: CMA_TOKEN,
      contentFile: exportFile,
      skipContentModel: SKIP_MODEL,
      skipContentPublishing: false,
      useVerboseRenderer: false,
      uploadAssets: true,
      assetsDirectory: EXPORT_DIR,
    });
    console.log("\n✅  Import complete.\n");
  } catch (err) {
    console.error("\n❌  Import failed:", err.message || err);
    console.error(
      "\nℹ️   If the import partially failed, you can re-run with:\n" +
        "   SKIP_CONTENT_MODEL=true  to skip content types (if they already exist)\n" +
        "   The import tool is idempotent for entries/assets that already exist.\n"
    );
    process.exit(1);
  }

  // ── Done ──────────────────────────────────────────────────────────────────

  console.log("╔══════════════════════════════════════════════════════╗");
  console.log("║              Migration Complete! 🎉                  ║");
  console.log("╚══════════════════════════════════════════════════════╝");
  console.log(`\nNext steps:`);
  console.log(`  1. Update .env.local with the new space credentials:`);
  console.log(`     CONTENTFUL_SPACE_ID=${TARGET_SPACE}`);
  console.log(`  2. Generate new API keys in the target space:`);
  console.log(`     https://app.contentful.com/spaces/${TARGET_SPACE}/api/keys`);
  console.log(`  3. Update CONTENTFUL_ACCESS_TOKEN and CONTENTFUL_PREVIEW_TOKEN`);
  console.log(`  4. Run \`npm run dev\` to verify everything works\n`);
}

main();
