import { expect, test } from "@playwright/test";

import { PUBLIC_ROUTES, RETIRED_ROUTES } from "./site-contract";

test.describe("public route contract", () => {
  for (const route of PUBLIC_ROUTES) {
    test(`${route.path} renders in ${route.locale}`, async ({ page }) => {
      const runtimeErrors: string[] = [];
      page.on("pageerror", (error) => runtimeErrors.push(error.message));

      const response = await page.goto(route.path, {
        waitUntil: "domcontentloaded",
      });

      expect(response, `No document response for ${route.path}`).not.toBeNull();
      expect(response?.status(), `Unexpected status for ${route.path}`).toBe(200);
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("html")).toHaveAttribute(
        "lang",
        new RegExp(`^${route.locale}`, "i"),
      );
      await expect(page).toHaveTitle(/\S/);
      expect(runtimeErrors, `Runtime errors on ${route.path}`).toEqual([]);
    });
  }
});

test.describe("retired routes", () => {
  for (const path of RETIRED_ROUTES) {
    test(`${path} is not publicly available`, async ({ page }) => {
      const response = await page.goto(path, {
        waitUntil: "domcontentloaded",
      });

      expect(response, `No document response for ${path}`).not.toBeNull();
      expect(response?.status(), `${path} must remain retired`).toBe(404);
    });
  }
});

test("creator credit links verified profiles and keeps identity data on the Person", async ({
  page,
}) => {
  await page.goto("/projects", { waitUntil: "domcontentloaded" });

  const linkedin = page.locator(
    '.site-footer a[href="https://www.linkedin.com/in/fabianomag/"]',
  );
  const github = page.locator(
    '.site-footer a[href="https://github.com/fabianomag"]',
  );

  await expect(linkedin).toHaveText("@fabianomag");
  await expect(github).toHaveText("@fabianomag");
  await expect(linkedin).toHaveAttribute("rel", /author.*external.*noopener/);
  await expect(github).toHaveAttribute("rel", /author.*external.*noopener/);

  const websiteSchema = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) =>
      scripts
        .map((script) => JSON.parse(script.textContent ?? "{}"))
        .find((entry) => entry["@type"] === "WebSite"),
    );

  expect(websiteSchema?.creator).toMatchObject({
    "@type": "Person",
    alternateName: ["Fabiano Mag", "@fabianomag"],
    sameAs: [
      "https://www.linkedin.com/in/fabianomag/",
      "https://github.com/fabianomag",
    ],
  });
});
