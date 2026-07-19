import type { MetadataRoute } from "next";

import {
  getProjectRoute,
  projectIds,
  routeMaps,
} from "@/content/site";
import { absoluteUrl } from "@/lib/site-url";

type RoutePair = {
  en: string;
  pt: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

const routePairs: RoutePair[] = [
  {
    en: routeMaps.en.home,
    pt: routeMaps.pt.home,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    en: routeMaps.en.projects,
    pt: routeMaps.pt.projects,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    en: routeMaps.en.studio,
    pt: routeMaps.pt.studio,
    changeFrequency: "yearly",
    priority: 0.7,
  },
  ...projectIds.map((projectId) => ({
    en: getProjectRoute("en", projectId),
    pt: getProjectRoute("pt", projectId),
    changeFrequency: "monthly",
    priority: 0.8,
  }) satisfies RoutePair),
];

function toEntry(pair: RoutePair, pathname: string): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(pathname),
    changeFrequency: pair.changeFrequency,
    priority: pair.priority,
    alternates: {
      languages: {
        en: absoluteUrl(pair.en),
        "pt-BR": absoluteUrl(pair.pt),
        "x-default": absoluteUrl(pair.en),
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedRoutes = routePairs.flatMap((pair) => [
    toEntry(pair, pair.en),
    toEntry(pair, pair.pt),
  ]);

  return [
    ...localizedRoutes,
    ...["/llms.txt", "/sitemap.md", "/case-study.md", "/licensing.txt"].map((pathname) => ({
      url: absoluteUrl(pathname),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
