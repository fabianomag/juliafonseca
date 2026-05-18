"use client";

import Image from "next/image";
import { useEffect } from "react";

const INTRO_DURATION_MS = 3360;
const FULL_LOCKUP_WIDTH = 439;
const SYMBOL_WIDTH = 87;
const SYMBOL_SHIELD_WIDTH = 104;
const WORDMARK_LEFT = 86;
const WORDMARK_WIDTH = 349;
const CENTER_SHIFT = ((FULL_LOCKUP_WIDTH - SYMBOL_WIDTH) / 2 / FULL_LOCKUP_WIDTH) * 100;

export function SiteIntro() {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timeout = window.setTimeout(() => {
      document.body.style.overflow = previousOverflow;
      window.dispatchEvent(new Event("jf:intro-complete"));
    }, INTRO_DURATION_MS);

    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <>
      <div className="site-intro fixed inset-0 z-[140] flex items-center justify-center overflow-hidden bg-black" aria-hidden="true">
        <div className="site-intro__lockup relative w-[min(78vw,439px)] aspect-[439/140]">
          <div
            className="site-intro__symbol absolute inset-0"
            style={{ transform: `translateX(${CENTER_SHIFT}%) scale(0.985)` }}
          >
            <span className="site-intro__symbol-shield" />
            <Image
              src="/images/brand/intro-assets/jf-symbol-1x.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 52vw, 87px"
              className="object-contain object-left"
            />
          </div>

          <div
            className="site-intro__wordmark absolute inset-y-0 overflow-hidden"
            style={{
              left: `${(WORDMARK_LEFT / FULL_LOCKUP_WIDTH) * 100}%`,
              width: `${(WORDMARK_WIDTH / FULL_LOCKUP_WIDTH) * 100}%`,
              opacity: 0,
              clipPath: "inset(0 100% 0 0)",
              transform: "translateX(-1.8%)",
            }}
          >
            <Image
              src="/images/brand/intro-assets/jf-wordmark-1x.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 62vw, 349px"
              className="object-contain object-left"
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .site-intro {
          animation: site-intro-overlay ${INTRO_DURATION_MS}ms linear forwards;
        }

        .site-intro__lockup {
          animation: site-intro-lockup ${INTRO_DURATION_MS}ms linear forwards;
        }

        .site-intro__symbol {
          z-index: 2;
          transform: translateX(${CENTER_SHIFT}%) scale(0.985);
          animation: site-intro-symbol ${INTRO_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          will-change: transform;
        }

        .site-intro__symbol-shield {
          position: absolute;
          inset: 0 auto 0 0;
          width: ${(SYMBOL_SHIELD_WIDTH / FULL_LOCKUP_WIDTH) * 100}%;
          background: #000;
          opacity: 0;
          animation: site-intro-symbol-shield ${INTRO_DURATION_MS}ms linear forwards;
        }

        .site-intro__wordmark {
          z-index: 1;
          opacity: 0;
          clip-path: inset(0 100% 0 0);
          transform: translateX(-1.8%);
          animation: site-intro-wordmark ${INTRO_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: opacity, clip-path, transform;
        }

        @keyframes site-intro-symbol {
          0%,
          12% {
            transform: translateX(${CENTER_SHIFT}%) scale(0.985);
          }

          46%,
          68% {
            transform: translateX(0%) scale(1);
          }

          82% {
            transform: translateX(0%) scale(1);
          }

          100% {
            transform: translateX(${CENTER_SHIFT}%) scale(0.99);
          }
        }

        @keyframes site-intro-wordmark {
          0%,
          18% {
            opacity: 0;
            clip-path: inset(0 100% 0 0);
            transform: translateX(-1.8%);
          }

          48%,
          62% {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transform: translateX(0%);
          }

          74% {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transform: translateX(0%);
          }

          88%,
          100% {
            opacity: 0;
            clip-path: inset(0 100% 0 0);
            transform: translateX(-1.8%);
          }
        }

        @keyframes site-intro-symbol-shield {
          0%,
          80% {
            opacity: 0;
          }

          84%,
          100% {
            opacity: 1;
          }
        }

        @keyframes site-intro-lockup {
          0%,
          90% {
            opacity: 1;
            transform: scale(1);
          }

          100% {
            opacity: 0;
            transform: scale(0.985);
          }
        }

        @keyframes site-intro-overlay {
          0%,
          90% {
            opacity: 1;
            visibility: visible;
          }

          100% {
            opacity: 0;
            visibility: hidden;
          }
        }
      `}</style>
    </>
  );
}
