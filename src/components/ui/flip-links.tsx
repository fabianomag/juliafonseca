"use client";

import Link from "next/link";
import { clsx } from "clsx";

interface FlipLinkProps {
  href: string;
  label: string;
  className?: string;
  textClassName?: string;
  hoverTextClassName?: string;
  staggerMs?: number;
  onClick?: () => void;
}

export function FlipLink({
  href,
  label,
  className,
  textClassName,
  hoverTextClassName,
  staggerMs = 24,
  onClick,
}: FlipLinkProps) {
  const letters = Array.from(label);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label={label}
      className={clsx("group relative inline-flex w-fit overflow-hidden whitespace-nowrap", className)}
    >
      <span className="sr-only">{label}</span>

      <span
        aria-hidden="true"
        className={clsx("flex", textClassName)}
        style={{ lineHeight: 0.78 }}
      >
        {letters.map((letter, index) => (
          <span
            key={`${label}-base-${index}`}
            className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-[110%] group-focus-visible:-translate-y-[110%]"
            style={{ transitionDelay: `${index * staggerMs}ms` }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </span>

      <span
        aria-hidden="true"
        className={clsx("pointer-events-none absolute inset-0 flex", hoverTextClassName ?? textClassName)}
        style={{ lineHeight: 0.78 }}
      >
        {letters.map((letter, index) => (
          <span
            key={`${label}-hover-${index}`}
            className="inline-block translate-y-[110%] transition-transform duration-300 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0"
            style={{ transitionDelay: `${index * staggerMs}ms` }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </span>
    </Link>
  );
}
