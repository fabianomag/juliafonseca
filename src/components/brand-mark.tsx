"use client";

import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { withLang, type Lang } from "@/lib/i18n";
import { setPendingRouteShellTransition } from "@/lib/route-shell-transition";

export type LogoVariant = "jf-original" | "jf-arq" | "julia-square" | "jf-square" | "j-symbol-f" | "julia-jacobsen" | "jf-star-side" | "juf-arq-ta" | "jf-classic";

const BRAND_STORAGE_KEY = "julia-brand-variant";
const logoVariants: LogoVariant[] = ["jf-original", "jf-star-side", "julia-jacobsen", "juf-arq-ta", "jf-classic", "jf-arq", "julia-square"];

interface BrandMarkProps {
  inverted?: boolean;
  large?: boolean;
  lang?: Lang;
  variant?: LogoVariant;
}

interface BrandHeaderSymbolProps {
  inverted?: boolean;
  lang?: Lang;
  className?: string;
}

function resolveLogoVariant(value?: string | null): LogoVariant {
  return logoVariants.includes(value as LogoVariant) ? (value as LogoVariant) : "jf-original";
}

export function BrandSymbol({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      viewBox="0 0 44 44"
      aria-hidden="true"
      className={clsx(compact ? "h-[0.72em] w-[0.72em]" : "h-[0.88em] w-[0.88em]")}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 6V28L36 20V10L22 6Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M22 28L36 36V20"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M22 28L8 20V32L22 40V28Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M8 32L22 40L36 32"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M22 40V28"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function JacobsenStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={clsx("h-[0.82em] w-[0.82em]", className)}
      id="jacobsen-star"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/*
      <defs>
        <linearGradient id="jacobsen-star-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="100%" stopColor="#6d7f71" />
          <stop offset="55%" stopColor="#b97a59" />
          <stop offset="0%" stopColor="#1a1a1a" />
        </linearGradient>

        <radialGradient id="jacobsen-star-glow" cx="35%" cy="20%" r="85%">
          <stop offset="10%" stopColor="rgba(0,255,255,0.35)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      */}
      <path
        d="M50 0 L52 20 L68 7 L65 27 L85 20 L75 38 L96 40 L80 50 L96 60 L75 62 L85 80 L65 73 L68 93 L52 80 L50 100 L48 80 L32 93 L35 73 L15 80 L25 62 L4 60 L20 50 L4 40 L25 38 L15 20 L35 27 L32 7 L48 20 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BrandWordmark({
  variant,
  inverted,
  large,
}: {
  variant: LogoVariant;
  inverted: boolean;
  large: boolean;
}) {
  const baseClass = clsx(
    "inline-grid font-display font-[800] uppercase leading-[0.8] tracking-[-0.09em]",
    large ? "gap-y-0 text-[3.1rem]" : "gap-y-0 text-[1.9rem]",
    inverted ? "text-white" : "text-ambient-dark"
  );
  const symbolColorClass = inverted ? "text-ambient-cyan" : "text-ambient-electric";
  const symbolWrapClass = large ? "ml-[0.1em]" : "ml-[0.08em]";

  switch (variant) {
    case "jf-original":
      return (
        <span className={clsx("relative block", large ? "h-[4.8rem] w-[15.1rem]" : "h-[4.8rem] w-[15.1rem]")}>
          <Image
            src="/images/brand/jf-arquitetura-original.png"
            alt="JF Arquitetura"
            fill
            sizes={large ? "15.1rem" : "15.1rem"}
            className={clsx(
              "object-contain object-left",
              inverted
                ? "brightness-0 invert drop-shadow-[0_0_16px_rgba(255,255,255,0.22)]"
                : "brightness-0 [filter:brightness(0)_saturate(100%)_invert(22%)_sepia(29%)_saturate(1078%)_hue-rotate(151deg)_brightness(94%)_contrast(90%)_drop-shadow(0_0_10px_rgba(29,79,95,0.12))]"
            )}
            priority={large}
          />
        </span>
      );
    case "jf-arq":
      return (
        <span className={clsx("inline-flex items-start gap-[0.14em]", inverted ? "text-white" : "text-ambient-dark")}>
          <span className={clsx(symbolColorClass, large ? "pt-[0.1em] text-[3rem]" : "pt-[0.08em] text-[1.8rem]")}>
            <BrandSymbol />
          </span>
          <span className={clsx(baseClass, "w-[2.1em]")}>
            <span>JF</span>
            <span>ARQ</span>
          </span>
        </span>
      );
    case "jf-square":
      return (
        <span className={clsx(baseClass, "w-[2.5em]")}>
          <span className="flex items-end gap-[0.08em]">
            <span>JF</span>
            <span className={clsx(symbolWrapClass, symbolColorClass)}>
              <BrandSymbol compact />
            </span>
          </span>
          <span>ARQ</span>
        </span>
      );

    case "jf-classic":
      return (
        <span className={clsx(
          "inline-grid font-display font-[900] uppercase leading-[0.72] tracking-[-0.04em]",
          large ? "gap-y-[0.12em] text-[2.2rem]" : "gap-y-[0.08em] text-[1.15rem]",
          inverted ? "text-white" : "text-ambient-dark"
        )}>
          <span>JF</span>
          <span className="text-[0.6em] tracking-[0.2em] leading-none opacity-80">ARQUITETURA</span>
        </span>
      );
    case "jf-star-side":
      return (
        <span className={clsx(
          large ? "text-[3.8rem]" : "text-[2.8rem]",
          "inline-flex items-start font-display font-[900] uppercase leading-[0.72] tracking-[-0.04em] gap-[0.14em]",
          inverted ? "text-white" : "text-ambient-dark"
        )}>
          <span className="flex flex-col items-start gap-[0.2em] leading-none">
            <span className="flex justify-between gap-[0.2em]"><span>J</span><span>F</span>
              <span>
                <JacobsenStar />
              </span>
            </span>
            <span className="flex justify-between gap-[0.2em]"><span>A</span><span>R</span><span>Q</span></span>
          </span>
        </span>
      );
    case "juf-arq-ta":
      return (
        <span className={clsx(
          "inline-grid font-display font-[900] uppercase leading-[0.72] tracking-[-0.04em]",
          large ? "gap-y-[0.1em] text-[2.2rem]" : "gap-y-[0.05em] text-[1.15rem]",
          inverted ? "text-white" : "text-ambient-dark"
        )}>
          <span className="flex justify-between gap-[0.2em]"><span>J</span><span>U</span><span>F</span></span>
          <span className="flex justify-between gap-[0.2em]"><span>A</span><span>R</span><span>Q</span></span>
          <span className="flex items-center gap-[0.2em]">
            <span className="text-ambient-limao flex justify-between gap-[0.2em]"><span>T</span><span>A</span></span>
            <span className={clsx("mt-[0.1em] text-ambient-limao")}>
              <JacobsenStar />
            </span>
          </span>
        </span>
      );
    case "julia-jacobsen":
      return (
        <span className={clsx(
          "inline-grid font-display font-[900] uppercase leading-[0.7] tracking-[-0.04em]",
          large ? "gap-y-[0.12em] text-[2.2rem]" : "gap-y-[0] text-[1.12rem]",
          inverted ? "text-white" : "text-ambient-dark"
        )}>
          <span className="flex justify-between gap-[0.2em]"><span>J</span><span>U</span><span>L</span><span>I</span><span>A</span></span>
          <span className="flex justify-between gap-[0.2em]"><span>F</span><span>O</span><span>N</span><span>S</span><span>E</span></span>
          <span className="flex items-center gap-[0.2em]">
            <span>C</span><span>A</span>
            <span className={clsx("ml-[0.16em] mt-[0.05em] text-ambient-limao")}>
              <JacobsenStar />
            </span>
          </span>
        </span>
      );
  }
}

function useBrandVariant(variantOverride?: LogoVariant) {
  const searchParams = useSearchParams();
  const [storedVariant, setStoredVariant] = useState<LogoVariant>(variantOverride ?? "jf-original");

  useEffect(() => {
    if (variantOverride) {
      setStoredVariant(variantOverride);
      return;
    }

    const fromQuery = searchParams.get("logo");
    if (fromQuery) {
      const resolved = resolveLogoVariant(fromQuery);
      setStoredVariant(resolved);
      window.localStorage.setItem(BRAND_STORAGE_KEY, resolved);
      return;
    }

    const fromStorage = window.localStorage.getItem(BRAND_STORAGE_KEY);
    if (fromStorage) {
      setStoredVariant(resolveLogoVariant(fromStorage));
    }
  }, [searchParams, variantOverride]);

  return useMemo(() => variantOverride ?? storedVariant, [storedVariant, variantOverride]);
}

export function BrandMark({ inverted = false, large = false, lang = "pt", variant }: BrandMarkProps) {
  const activeVariant = useBrandVariant(variant);
  const pathname = usePathname();

  return (
    <Link
      href={withLang("/", lang)}
      onClick={() => {
        if (pathname !== "/") {
          setPendingRouteShellTransition("home-enter");
        }
      }}
      className="inline-flex"
      aria-label="Julia Fonseca Arquitetura"
    >
      <BrandWordmark variant={activeVariant} inverted={inverted} large={large} />
    </Link>
  );
}

export function BrandHeaderSymbol({ inverted = false, lang = "pt", className }: BrandHeaderSymbolProps) {
  const pathname = usePathname();

  return (
    <Link
      href={withLang("/", lang)}
      onClick={() => {
        if (pathname !== "/") {
          setPendingRouteShellTransition("home-enter");
        }
      }}
      aria-label="Julia Fonseca Arquitetura"
      className="inline-flex items-center justify-center transition-opacity hover:opacity-70"
    >
      <Image
        src="/images/brand/intro-assets/jf-symbol-1x.png"
        alt="JF"
        width={48}
        height={77}
        priority
        className={clsx(
          "h-auto w-12",
          inverted
            ? "brightness-0 invert drop-shadow-[0_0_12px_rgba(255,255,255,0.18)]"
            : "brightness-0",
          className
        )}
      />
    </Link>
  );
}

export function BrandPicker({ lang = "pt" }: { lang?: Lang }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeVariant = useBrandVariant();

  const pickVariant = (variant: LogoVariant) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("logo", variant);
    params.set("lang", lang);
    window.localStorage.setItem(BRAND_STORAGE_KEY, variant);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-8 hidden w-full overflow-x-auto lg:block">
      <div className="flex flex-row items-center gap-16 pb-6">
        {logoVariants.map((variant) => (
          <button
            key={variant}
            type="button"
            onClick={() => pickVariant(variant)}
            className={clsx(
              "flex flex-shrink-0 items-center justify-center bg-transparent p-0 transition-all",
              activeVariant === variant
                ? "scale-110 ring-2 ring-ambient-electric/20 ring-offset-8"
                : "opacity-40 hover:opacity-100"
            )}
            aria-label={`Selecionar logo ${variant}`}
          >
            <BrandWordmark variant={variant} inverted={false} large={false} />
          </button>
        ))}
      </div>
    </div>
  );
}
