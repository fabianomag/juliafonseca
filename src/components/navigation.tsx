"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  getLocalizedPath,
  getSiteContent,
  routeMaps,
  type Locale,
} from "@/content/site";
import { BrandWordmark } from "@/components/brand-wordmark";

const localePreferenceKey = "studio-flamboyant-locale";

function isCurrent(pathname: string, href: string) {
  if (href === "/" || href === "/pt") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isDarkSurface(pathname: string, locale: Locale) {
  const routes = routeMaps[locale];
  return (
    pathname === routes.home ||
    pathname === routes.contact ||
    pathname.startsWith(`${routes.projectBase}/`)
  );
}

export function Wordmark({ locale }: { locale: Locale }) {
  return (
    <Link
      className="wordmark"
      href={routeMaps[locale].home}
      aria-label="Studio Flamboyant"
    >
      <BrandWordmark />
    </Link>
  );
}

export function Navigation({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const content = getSiteContent(locale);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const targetLocale: Locale = locale === "en" ? "pt" : "en";
  const alternatePath = getLocalizedPath(pathname, targetLocale);
  const compact = scrolled || open;
  const inlineItems = content.navigation.primary.filter((item) => item.key !== "contact");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 64);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (!open) return;

    const panel = panelRef.current;
    const panelFocusable = Array.from(panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ) ?? []);
    const focusable = [triggerRef.current, ...panelFocusable].filter(
      (element): element is HTMLElement => element !== null,
    );
    panelFocusable[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setOpen(false));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  const rememberLocale = () => {
    window.localStorage.setItem(localePreferenceKey, targetLocale);
    setOpen(false);
  };

  return (
    <>
      <header
        className="site-header"
        data-open={open}
        data-scrolled={scrolled}
        data-surface={isDarkSurface(pathname, locale) ? "dark" : "light"}
      >
        <nav className="site-nav" aria-label={locale === "pt" ? "Principal" : "Primary"}>
          <Wordmark locale={locale} />

          <div className="nav-inline" aria-hidden={compact}>
            {inlineItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                tabIndex={compact ? -1 : undefined}
                aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            <Link
              className="locale-link"
              href={alternatePath}
              hrefLang={targetLocale === "pt" ? "pt-BR" : "en"}
              onClick={rememberLocale}
              tabIndex={compact ? -1 : undefined}
              aria-label={content.global.changeLanguage}
            >
              {targetLocale.toUpperCase()}
            </Link>
            <Link
              className="nav-contact"
              href={routeMaps[locale].contact}
              aria-current={isCurrent(pathname, routeMaps[locale].contact) ? "page" : undefined}
              tabIndex={open ? -1 : undefined}
            >
              <span>{locale === "pt" ? "Contato" : "Contact"}</span>
              <i aria-hidden="true" />
            </Link>
            <button
              ref={triggerRef}
              className="menu-trigger"
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? content.global.closeMenu : content.global.openMenu}
            </button>
          </div>
        </nav>
      </header>

      <div
        ref={panelRef}
        id="site-menu"
        className="menu-panel"
        data-open={open}
        aria-hidden={!open}
      >
        <div className="menu-panel__inner">
          <ol className="menu-list">
            {content.navigation.primary.map((item, index) => (
              <li key={item.key}>
                <Link href={item.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ol>

          <aside className="menu-aside">
            <p>{content.brand.tagline}</p>
            <Link
              className="text-link"
              href={alternatePath}
              hrefLang={targetLocale === "pt" ? "pt-BR" : "en"}
              tabIndex={open ? 0 : -1}
              onClick={rememberLocale}
            >
              {targetLocale === "pt" ? "Português" : "English"}
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}
