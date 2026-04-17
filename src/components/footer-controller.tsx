"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Footer } from "./footer";
import { ProjectDetailFooter } from "./project-detail-footer";
import { resolveLang } from "@/lib/i18n";

const projectDetailPattern = /^\/(residencial|comercial|interiores)\/.+$/;

export function FooterController() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = resolveLang(searchParams.get("lang"));
  const currentHref = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

  if (projectDetailPattern.test(pathname)) {
    return <ProjectDetailFooter lang={lang} />;
  }

  return <Footer lang={lang} pathname={currentHref} />;
}
