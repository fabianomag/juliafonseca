"use client";

import { usePathname } from "next/navigation";
import { routeMaps, type Locale } from "@/content/site";
import { SiteFooter } from "@/components/site-footer";

export function RouteFooter({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const routes = routeMaps[locale];
  const immersiveRoute =
    pathname === routes.home ||
    pathname === routes.studio ||
    pathname.startsWith(`${routes.projectBase}/`);

  return immersiveRoute ? null : <SiteFooter locale={locale} />;
}
