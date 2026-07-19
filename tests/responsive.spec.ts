import { expect, test } from "@playwright/test";

import { RESPONSIVE_ROUTES } from "./site-contract";

for (const path of RESPONSIVE_ROUTES) {
  test(
    `${path} keeps its semantic shell inside the viewport`,
    async ({ page }) => {
      const runtimeErrors: string[] = [];
      page.on("pageerror", (error) => runtimeErrors.push(error.message));

      await page.goto(path, { waitUntil: "domcontentloaded" });
      await expect(page.locator("main")).toBeVisible();
      const primaryHeading = page.getByRole("heading", { level: 1 }).first();
      await expect(primaryHeading).toHaveCount(1);

      if (path === "/projects") {
        await expect(page.getByRole("heading", { level: 2 }).first()).toBeVisible();
      } else {
        await expect(primaryHeading).toBeVisible();
      }

      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      expect(overflow, `Horizontal overflow on ${path}`).toBeLessThanOrEqual(1);
      expect(runtimeErrors, `Runtime errors on ${path}`).toEqual([]);
    },
  );
}

test("immersive layouts preserve their approved responsive contracts", async ({ page }) => {
  const viewport = page.viewportSize();
  expect(viewport).not.toBeNull();

  await page.goto("/studio", { waitUntil: "domcontentloaded" });
  const studioCard = page.locator(".studio-copy");
  const studioMedia = page.locator(".studio-media");
  await expect(studioCard).toBeVisible();
  await expect(studioMedia).toBeVisible();
  await expect(page.locator(".site-footer")).toHaveCount(0);

  if (viewport && viewport.width <= 960) {
    const cardBox = await studioCard.boundingBox();
    expect(cardBox).not.toBeNull();
    expect(cardBox?.x).toBeCloseTo(10, 0);
    expect(cardBox?.width).toBeCloseTo(viewport.width - 20, 0);
    expect(cardBox?.height).toBeCloseTo(viewport.height / 2, 0);
  } else {
    const columns = await page.locator(".studio-page").evaluate(
      (element) => getComputedStyle(element).gridTemplateColumns,
    );
    const [left, right] = columns
      .split(" ")
      .map((value) => Number.parseFloat(value));
    expect(Math.abs(left - right)).toBeLessThanOrEqual(1);
  }

  const initialMediaScroll = await studioMedia.evaluate(
    (element) => element.scrollTop,
  );
  await expect
    .poll(() => studioMedia.evaluate((element) => element.scrollTop))
    .toBeGreaterThan(initialMediaScroll);

  await page.getByRole("button", { name: /pause images/i }).click();
  const pausedMediaScroll = await studioMedia.evaluate(
    (element) => element.scrollTop,
  );
  await page.waitForTimeout(250);
  expect(
    await studioMedia.evaluate((element) => element.scrollTop),
  ).toBeCloseTo(pausedMediaScroll, 0);

  await page.goto("/projects/horizon-pavilion", {
    waitUntil: "domcontentloaded",
  });
  const heroBox = await page.locator(".project-hero").boundingBox();
  expect(heroBox).not.toBeNull();
  expect(heroBox?.height).toBeCloseTo((viewport?.height ?? 0) * 1.75, 0);
  await expect(page.locator(".editorial-gallery__row--feature-left")).toHaveCount(1);
  await expect(page.locator(".editorial-gallery__row--feature-right")).toHaveCount(1);
  await expect(page.locator(".editorial-gallery__row--triptych")).toHaveCount(1);
  await expect(page.locator(".editorial-gallery figure")).toHaveCount(7);
});
