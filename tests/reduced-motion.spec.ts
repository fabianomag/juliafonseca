import { expect, test } from "@playwright/test";

for (const path of ["/", "/projects/horizon-pavilion", "/studio", "/contact"] as const) {
  test(`${path} remains navigable with reduced motion`, async ({ page }) => {
    const runtimeErrors: string[] = [];
    page.on("pageerror", (error) => runtimeErrors.push(error.message));
    await page.emulateMedia({ reducedMotion: "reduce" });

    await page.goto(path, { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toBeVisible();
    expect(
      await page.evaluate(() =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      ),
    ).toBe(true);

    const canScroll = await page.evaluate(
      () => document.documentElement.scrollHeight > window.innerHeight,
    );
    if (canScroll) {
      await page.mouse.wheel(
        0,
        Math.max(600, await page.evaluate(() => innerHeight)),
      );
      await expect
        .poll(() => page.evaluate(() => window.scrollY))
        .toBeGreaterThan(0);
    }

    if (path === "/studio") {
      await expect(page.locator(".studio-media__control")).toBeHidden();
      const start = await page.locator(".studio-media").evaluate(
        (element) => element.scrollTop,
      );
      await page.waitForTimeout(250);
      expect(
        await page.locator(".studio-media").evaluate((element) => element.scrollTop),
      ).toBe(start);
    }

    expect(runtimeErrors, `Runtime errors on ${path}`).toEqual([]);
  });
}
