import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/contact", { waitUntil: "domcontentloaded" });
  await expect(page.locator("form")).toBeVisible();
});

test("minimal showcase keeps the Montes Claros map and secure lead form", async ({
  page,
}) => {
  await expect(page.getByText("Montes Claros · Minas Gerais · Brazil")).toBeVisible();
  await expect(page.getByText("Map data © OpenStreetMap contributors")).toBeVisible();
  await expect(page.locator(".leaflet-container canvas")).toBeVisible();

  const form = page.locator("form");
  await expect(form.locator('[name="name"]')).toBeVisible();
  await expect(form.locator('[name="email"]')).toBeVisible();
  await expect(form.locator('[name="message"]')).toBeVisible();
  await expect(form.locator('[name="company"]')).toHaveCount(0);
  await expect(form.locator('[name="budget"]')).toHaveCount(0);
  await expect(form.locator('[name="projectType"]')).toBeAttached();
  await expect(form.locator('[name="projectType"]')).toHaveValue("other");
  await expect(form.locator('[name="website"]')).toBeAttached();
  await expect(form.locator('[name="consent"]')).toBeVisible();
  await expect(form.getByRole("button", { name: "Send message" })).toBeVisible();
});

test("complete form posts to the secure lead endpoint and announces success", async ({
  page,
}) => {
  const submittedPayloads: Record<string, unknown>[] = [];

  await page.route("**/api/leads", async (route) => {
    submittedPayloads.push(route.request().postDataJSON() as Record<string, unknown>);
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ message: "Accepted safely." }),
    });
  });

  const form = page.locator("form");
  await form.locator('[name="name"]').fill("Test User");
  await form.locator('[name="email"]').fill("test@example.com");
  await form.locator('[name="message"]').fill(
    "This is a focused project context submitted through the minimal contact showcase.",
  );
  await form.locator('[name="consent"]').check();
  await form.getByRole("button", { name: "Send message" }).click();

  await expect(form.getByText("Accepted safely.")).toBeVisible();
  expect(submittedPayloads).toHaveLength(1);
  const submittedPayload = submittedPayloads[0];
  expect(submittedPayload).toMatchObject({
    name: "Test User",
    email: "test@example.com",
    company: "",
    projectType: "other",
    budget: "",
    consent: true,
    locale: "en",
    website: "",
  });
  expect(typeof submittedPayload.startedAt).toBe("number");
  expect(typeof submittedPayload.submissionId).toBe("string");
});

test("empty contact form is rejected before a network submission", async ({
  page,
}) => {
  let submissions = 0;
  await page.route("**/api/leads", async (route) => {
    submissions += 1;
    await route.abort();
  });

  const form = page.locator("form");
  await form.locator('button[type="submit"]').click();

  await expect
    .poll(() =>
      form.evaluate(
        (element) =>
          !(element as HTMLFormElement).checkValidity() ||
          Boolean(
            element.querySelector('[aria-invalid="true"], [role="alert"]'),
          ),
      ),
    )
    .toBe(true);
  expect(submissions).toBe(0);
});

test("malformed email is rejected before a network submission", async ({
  page,
}) => {
  let submissions = 0;
  await page.route("**/api/leads", async (route) => {
    submissions += 1;
    await route.abort();
  });

  const form = page.locator("form");
  const email = form.locator('input[name="email"]');

  await form.locator('input[name="name"]').fill("Test User");
  await email.fill("invalid-email");
  await form.locator('textarea[name="message"]').fill(
    "This message exercises client-side validation without contacting the API.",
  );
  await form.locator('button[type="submit"]').click();

  await expect
    .poll(() =>
      email.evaluate(
        (element) =>
          element.matches(":invalid") ||
          element.getAttribute("aria-invalid") === "true",
      ),
    )
    .toBe(true);
  expect(submissions).toBe(0);
});
