#!/usr/bin/env npx tsx
/**
 * Sync Google Drive → projects.json
 *
 * Usage:
 *   npx tsx scripts/sync-drive.ts
 *
 * Required env vars (in .env.local):
 *   GOOGLE_SERVICE_ACCOUNT_JSON — full JSON of the service account key
 *   GOOGLE_DRIVE_FOLDER_ID — ID of the root folder shared with the service account
 *
 * See DRIVE-SETUP.md for full instructions.
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { syncDrive } from "../src/lib/drive-sync";

async function main() {
  console.log("=== Julia Fonseca — Drive Sync ===\n");

  if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    console.error(
      "❌ GOOGLE_SERVICE_ACCOUNT_JSON not found in .env.local\n" +
        "   See DRIVE-SETUP.md for setup instructions."
    );
    process.exit(1);
  }

  if (!process.env.GOOGLE_DRIVE_FOLDER_ID) {
    console.error(
      "❌ GOOGLE_DRIVE_FOLDER_ID not found in .env.local\n" +
        "   See DRIVE-SETUP.md for setup instructions."
    );
    process.exit(1);
  }

  try {
    const result = await syncDrive();
    console.log("\n✅ Sync complete!");
    console.log(
      `   ${result.added.length} new, ${result.updated.length} updated, ${result.preserved.length} preserved.`
    );

    if (result.added.length > 0) {
      console.log(
        "\n💡 New projects added! Run 'npm run dev' to see them on the site."
      );
    }
  } catch (err) {
    console.error("❌ Sync failed:", err);
    process.exit(1);
  }
}

main();
