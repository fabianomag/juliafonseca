const LOCAL_SITE_URL = "http://localhost:3000";

function normalizeSiteUrl(value: string, source: string): URL {
  const rawValue = value.trim();

  if (!rawValue) {
    throw new Error(`${source} cannot be empty.`);
  }

  const explicitProtocol = rawValue.match(/^([a-z][a-z\d+.-]*):\/\//i)?.[1];

  if (
    explicitProtocol &&
    explicitProtocol.toLowerCase() !== "http" &&
    explicitProtocol.toLowerCase() !== "https"
  ) {
    throw new Error(`${source} must use http or https.`);
  }

  const candidate = /^https?:\/\//i.test(rawValue)
    ? rawValue
    : `https://${rawValue}`;

  let url: URL;

  try {
    url = new URL(candidate);
  } catch {
    throw new Error(`${source} must be a valid absolute URL.`);
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`${source} must use http or https.`);
  }

  url.pathname = "/";
  url.search = "";
  url.hash = "";

  return url;
}

/**
 * Returns the canonical runtime origin without inventing a production domain.
 * Vercel's production URL is preferred over the deployment-specific preview URL.
 */
export function getSiteUrl(): URL {
  const candidates: Array<[string | undefined, string]> = [
    [process.env.NEXT_PUBLIC_SITE_URL, "NEXT_PUBLIC_SITE_URL"],
    [
      process.env.VERCEL_PROJECT_PRODUCTION_URL,
      "VERCEL_PROJECT_PRODUCTION_URL",
    ],
    [process.env.VERCEL_URL, "VERCEL_URL"],
  ];

  for (const [value, source] of candidates) {
    if (value?.trim()) {
      return normalizeSiteUrl(value, source);
    }
  }

  return new URL(LOCAL_SITE_URL);
}

/**
 * Used by mutation endpoints that should enforce the explicitly configured
 * public origin. Vercel preview URLs are intentionally not admitted here.
 */
export function getConfiguredPublicOrigin(): string | null {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!configuredUrl?.trim()) {
    return null;
  }

  return normalizeSiteUrl(configuredUrl, "NEXT_PUBLIC_SITE_URL").origin;
}

export function absoluteUrl(pathname = "/"): string {
  return new URL(pathname, getSiteUrl()).toString();
}
