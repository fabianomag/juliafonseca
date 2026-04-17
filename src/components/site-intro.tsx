"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { JacobsenStar } from "./brand-mark";

const lineOne = "Julia Fonseca";
const lineTwo = "ARQUITETURA";

type IntroPhase =
  | "typing-1"
  | "pause-1"
  | "typing-2"
  | "hold"
  | "selecting"
  | "closing"
  | "hidden";

function IntroLine({
  text,
  typedCount,
  className,
  normalCase = false,
  showCaret = false,
  showStar = false,
}: {
  text: string;
  typedCount: number;
  className: string;
  normalCase?: boolean;
  showCaret?: boolean;
  showStar?: boolean;
}) {
  const characters = text.split("");
  const visibleCount = Math.min(typedCount, characters.length);
  const caretIndex = Math.max(0, visibleCount - 1);

  return (
    <div className={className}>
      {characters.map((char, index) => {
        const visible = index < visibleCount;
        const isCaretHost = showCaret && index === caretIndex;

        return (
          <span
            key={`${char}-${index}`}
            className="relative inline-flex min-w-[0.36em] items-center justify-center"
          >
            <span
              className={[
                "inline-block transition-opacity duration-100",
                normalCase ? "normal-case" : "uppercase",
                visible ? "opacity-100" : "opacity-0",
              ].join(" ")}
            >
              {char === " " ? "\u00A0" : char}
            </span>
            {isCaretHost && (
              <span className="absolute right-[-0.11em] top-[0.06em] inline-block h-[0.78em] w-[0.05em] animate-pulse bg-white/95" />
            )}
          </span>
        );
      })}

      {showStar && (
        <span className="inline-flex min-w-[0.32em] items-center justify-center pl-[0.08em]">
          <JacobsenStar className="h-[0.34em] w-[0.34em] opacity-95" />
        </span>
      )}
    </div>
  );
}

export function SiteIntro() {
  const [phase, setPhase] = useState<IntroPhase>("typing-1");
  const [typedOneCount, setTypedOneCount] = useState(0);
  const [typedTwoCount, setTypedTwoCount] = useState(0);
  const [showStar, setShowStar] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    document.body.style.overflow = phase === "hidden" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    const schedule = (callback: () => void, delay: number) => {
      const id = window.setTimeout(callback, delay);
      timeoutsRef.current.push(id);
    };

    const getRandomSpeed = (min: number, max: number, currentChar: string) => {
      const base = Math.floor(Math.random() * (max - min + 1)) + min;
      return currentChar === " " ? base + 70 : base;
    };

    const typeLine = (
      text: string,
      setter: React.Dispatch<React.SetStateAction<number>>,
      onComplete: () => void,
      minDelay: number,
      maxDelay: number
    ) => {
      let index = 0;

      const step = () => {
        index += 1;
        setter(index);

        if (index >= text.length) {
          onComplete();
          return;
        }

        schedule(step, getRandomSpeed(minDelay, maxDelay, text[index - 1]));
      };

      schedule(step, 150);
    };

    typeLine(lineOne, setTypedOneCount, () => {
      setPhase("pause-1");

      schedule(() => {
        setPhase("typing-2");

        typeLine(lineTwo, setTypedTwoCount, () => {
          setShowStar(true);
          setPhase("hold");

          schedule(() => {
            setPhase("selecting");

            schedule(() => {
              setTypedOneCount(0);
              setTypedTwoCount(0);
              setShowStar(false);
              setPhase("closing");

              schedule(() => {
                setPhase("hidden");
              }, 180);
            }, 110);
          }, 920);
        }, 46, 94);
      }, 260);
    }, 52, 116);

    return () => {
      clearAllTimeouts();
    };
  }, []);

  const overlayVisible = phase !== "hidden";
  const closing = phase === "closing";
  const selecting = phase === "selecting";
  const showCaretLineOne = phase === "typing-1" || phase === "pause-1";
  const showCaretLineTwo = phase === "typing-2";

  const rootClassName = useMemo(
    () =>
      [
        "fixed inset-0 z-[140] flex items-center overflow-hidden transition-opacity duration-200",
        overlayVisible ? "pointer-events-auto" : "pointer-events-none",
        closing ? "opacity-0" : "opacity-100",
      ].join(" "),
    [closing, overlayVisible]
  );

  if (!overlayVisible) {
    return null;
  }

  return (
    <div className={rootClassName} aria-hidden="true">
      <div className="absolute inset-0 bg-[#08090d]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_18%,rgba(0,255,255,0.22),transparent_22%),linear-gradient(145deg,#b97a59_0%,#111111_52%,#6d7f71_100%)]" />

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-5 md:px-8">
        <div className="flex w-full max-w-[132rem] flex-col items-center justify-center gap-[0.3vw]">
          <div className="relative w-[92vw] overflow-hidden">
            {selecting && <div className="absolute inset-0 bg-white/18" />}
            <IntroLine
              text={lineOne}
              typedCount={typedOneCount}
              normalCase
              showCaret={showCaretLineOne}
              className="flex w-full items-center justify-between font-display text-[14vw] font-[500] leading-[0.84] tracking-[-0.07em] text-white md:text-[10.2rem] lg:text-[11.8rem] xl:text-[12.8rem]"
            />
          </div>

          <div className="relative w-[98vw] overflow-hidden">
            {selecting && <div className="absolute inset-0 bg-white/22" />}
            <IntroLine
              text={lineTwo}
              typedCount={typedTwoCount}
              showCaret={showCaretLineTwo}
              showStar={showStar}
              className="flex w-full items-end justify-between font-display text-[15.4vw] font-[800] leading-[0.78] tracking-[-0.08em] text-white md:text-[11.1rem] lg:text-[12.8rem] xl:text-[14rem]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
