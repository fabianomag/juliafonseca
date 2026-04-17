"use client";

import { useEffect, useRef, useState } from "react";
import { JacobsenStar } from "./brand-mark";
import TextType from "./TextType";

const introText = "Julia Fonseca Arquitetura";

type IntroPhase = "typing" | "background-out" | "star-out" | "hidden";

const lockupClassName =
  "font-display text-[9.4vw] font-[700] leading-[0.9] tracking-[0.045em] text-white [transform:scaleX(0.88)_scaleY(1.08)] [transform-origin:center_center] sm:text-[7.8vw] md:text-[6.2vw] lg:text-[6.9rem] xl:text-[8rem]";

const starClassName =
  "h-[18vw] w-[18vw] min-h-[5rem] min-w-[5rem] max-h-[9.5rem] max-w-[9.5rem] md:h-[7rem] md:w-[7rem] lg:h-[8.25rem] lg:w-[8.25rem]";

export function SiteIntro() {
  const [phase, setPhase] = useState<IntroPhase>("typing");
  const timeoutsRef = useRef<number[]>([]);

  const schedule = (callback: () => void, delay: number) => {
    const id = window.setTimeout(callback, delay);
    timeoutsRef.current.push(id);
  };

  useEffect(() => {
    document.body.style.overflow = phase === "hidden" ? "" : "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, []);

  if (phase === "hidden") {
    return null;
  }

  const backgroundHidden = phase === "background-out" || phase === "star-out";
  const starHidden = phase === "star-out";

  return (
    <div className="fixed inset-0 z-[140] flex items-center overflow-hidden" aria-hidden="true">
      <div
        className={[
          "absolute inset-0 transition-opacity duration-[180ms] ease-out",
          backgroundHidden ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        <div className="absolute inset-0 bg-[#08090d]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_18%,rgba(0,255,255,0.18),transparent_22%),radial-gradient(circle_at_68%_62%,rgba(185,122,89,0.22),transparent_28%),linear-gradient(145deg,#b97a59_0%,#111111_52%,#6d7f71_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_18%,transparent_82%,rgba(255,255,255,0.04))]" />
      </div>

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-3 md:px-6">
        <div className="flex w-[98vw] max-w-[1920px] items-center justify-center overflow-visible">
          <span
            className={[
              "inline-flex items-center justify-center whitespace-nowrap text-white transition-[opacity,transform] duration-[120ms] ease-out",
              starHidden ? "opacity-0 scale-[0.92]" : "opacity-100 scale-100",
            ].join(" ")}
          >
            <TextType
              as="div"
              text={[introText, ""]}
              typingSpeed={125}
              deletingSpeed={18}
              pauseDuration={740}
              initialDelay={90}
              loop={false}
              className={`whitespace-nowrap text-center ${lockupClassName}`}
              showCursor
              cursorCharacter="_"
              onSentenceComplete={(typedText) => {
                if (typedText !== introText) return;

                setPhase("background-out");
                schedule(() => setPhase("star-out"), 130);
                schedule(() => setPhase("hidden"), 240);
              }}
            />

            <span className="inline-flex items-center self-center pl-[0.12em] text-white">
              <JacobsenStar className={starClassName} />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
