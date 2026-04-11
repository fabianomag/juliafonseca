"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";

const links = [
  { href: "/residencial", label: "Residencial" },
  { href: "/comercial", label: "Comercial" },
  { href: "/interiores", label: "Interiores" },
  { href: "/sobre", label: "Escrit\u00f3rio" },
  { href: "/contato", label: "Contato" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-stone-50/95 backdrop-blur-md border-b border-stone-200/50"
          : "bg-transparent"
      )}
    >
      <nav className="section-padding flex items-center justify-between h-20">
        <Link
          href="/"
          className={clsx(
            "font-display text-xl tracking-wide transition-colors duration-300",
            scrolled ? "text-stone-900" : "text-white"
          )}
        >
          Julia Fonseca
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-sm tracking-widest uppercase transition-colors duration-300 hover:opacity-60",
                scrolled ? "text-stone-700" : "text-white/90"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            "md:hidden p-2 transition-colors",
            scrolled ? "text-stone-900" : "text-white"
          )}
          aria-label="Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={clsx(
          "md:hidden fixed inset-0 bg-stone-900 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-white p-2"
          aria-label="Fechar menu"
        >
          <X size={24} />
        </button>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-white text-2xl font-display tracking-wide hover:opacity-60 transition-opacity"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
