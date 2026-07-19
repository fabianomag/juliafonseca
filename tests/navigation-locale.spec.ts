import { expect, type Page, test } from "@playwright/test";

async function revealLink(page: Page, href: string) {
  await page.waitForLoadState("networkidle");
  let link = page.locator(`a[href="${href}"]:visible`).first();

  if ((await link.count()) === 0) {
    const menuButton = page
      .getByRole("button", {
        name: /menu|navigation|open|abrir|navega[cç][aã]o/i,
      })
      .first();

    await expect(menuButton).toBeVisible();
    await menuButton.click();
    link = page.locator(`a[href="${href}"]:visible`).first();
  }

  await expect(link).toBeVisible();
  return link;
}

test("primary navigation reaches the studio", async ({ page }) => {
  await page.goto("/projects", { waitUntil: "domcontentloaded" });

  const studioLink = await revealLink(page, "/studio");
  await studioLink.click();

  await expect(page).toHaveURL(/\/studio\/?$/);
  await expect(page.locator("main")).toBeVisible();
});

test("locale switch preserves the conceptual project", async ({ page }) => {
  await page.goto("/projects/horizon-pavilion", {
    waitUntil: "domcontentloaded",
  });

  const portugueseLink = await revealLink(
    page,
    "/pt/projetos/pavilhao-horizonte",
  );
  await portugueseLink.click();

  await expect(page).toHaveURL(/\/pt\/projetos\/pavilhao-horizonte\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", /^pt/i);

  const canonical = page.locator('link[rel="canonical"]');
  await expect(canonical).toHaveAttribute(
    "href",
    /\/pt\/projetos\/pavilhao-horizonte\/?$/,
  );
  await expect(
    page.locator('link[rel="alternate"][hreflang="en"]'),
  ).toHaveAttribute("href", /\/projects\/horizon-pavilion\/?$/);
  await expect(
    page.locator('link[rel="alternate"][hreflang="pt-BR"]'),
  ).toHaveAttribute("href", /\/pt\/projetos\/pavilhao-horizonte\/?$/);
  await expect(
    page.locator('link[rel="alternate"][hreflang="x-default"]'),
  ).toHaveAttribute("href", /\/projects\/horizon-pavilion\/?$/);
});

test("home opens on the first project and navigation follows the viewport", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { level: 1, name: "Horizon Pavilion" })).toBeVisible();
  await expect(page.getByText("Structures for stillness")).toHaveCount(0);
  await expect(page.getByText("Scroll to enter")).toHaveCount(0);
  await expect(page.locator("[data-grid-cells]")).toHaveCount(3);
  await expect(page.locator('[data-grid-cells="0"] [data-grid-cell]').first()).toHaveAttribute(
    "opacity",
    "1",
  );

  const viewport = page.viewportSize();
  const menuButton = page.getByRole("button", { name: /open menu/i });

  if (viewport && viewport.width <= 960) {
    await expect(menuButton).toBeVisible();
    await expect(page.locator(".nav-inline")).toBeHidden();
    await page.evaluate(() => window.scrollTo(0, 120));
    await expect(page.locator(".wordmark")).toBeHidden();
  } else {
    await expect(page.locator(".nav-inline")).toBeVisible();
    await expect(page.locator(".nav-contact")).toBeVisible();
    await expect(menuButton).toBeHidden();

    await page.evaluate(() => window.scrollTo(0, 120));
    await expect(menuButton).toBeVisible();
    await expect(page.locator(".wordmark")).toBeHidden();
  }

  await menuButton.click();
  await expect(page.locator("#site-menu")).toHaveAttribute("data-open", "true");
  await expect(page.getByRole("link", { name: /01 projects/i })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#site-menu")).toHaveAttribute("data-open", "false");
});
