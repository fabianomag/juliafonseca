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

const TYPING_SPEED = 125;
const DELETING_SPEED = 18;
const PAUSE_DURATION = 740;
const INITIAL_DELAY = 10;

// suavidade melhor que ease-in-out padrão
const STAR_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

// quanto a estrela gira enquanto digita
const STAR_ROTATION_DEG = 72;

// duração da ida e da volta
const STAR_FORWARD_MS = 1850;
const STAR_BACK_MS = 900;

export function SiteIntro() {
  const [phase, setPhase] = useState<IntroPhase>("typing");
  const [starRotated, setStarRotated] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  const schedule = (callback: () => void, delay: number) => {
    const id = window.setTimeout(callback, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  const clearAllScheduled = () => {
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
    return () => {
      clearAllScheduled();
    };
  }, []);

  useEffect(() => {
    // inicia a rotação quase junto com o começo da digitação
    schedule(() => {
      setStarRotated(true);
    }, 80);
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
        <div className="absolute inset-0 bg-black" />
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
              typingSpeed={TYPING_SPEED}
              deletingSpeed={DELETING_SPEED}
              pauseDuration={PAUSE_DURATION}
              initialDelay={INITIAL_DELAY}
              variableSpeedEnabled
              variableSpeedMin={60}
              variableSpeedMax={120}
              cursorBlinkDuration={0.5}
              loop={false}
              className={`whitespace-nowrap text-center ${lockupClassName}`}
              showCursor
              cursorCharacter="_"
              onSentenceComplete={(typedText) => {
                if (typedText !== introText) return;

                // volta suavemente quando começa a apagar
                schedule(() => {
                  setStarRotated(false);
                }, PAUSE_DURATION - 40);

                // estimativa do tempo total para apagar tudo
                const deleteDuration = introText.length * DELETING_SPEED;

                // espera pausa + delete, e só então some com a intro
                schedule(() => {
                  setPhase("background-out");
                  schedule(() => setPhase("star-out"), 130);
                  schedule(() => setPhase("hidden"), 260);
                }, PAUSE_DURATION + deleteDuration);
              }}
            />

            <span
              className="inline-flex items-center self-center pl-[0.12em] text-white transform-gpu origin-center will-change-transform"
              style={{
                transform: `rotate(${starRotated ? STAR_ROTATION_DEG : 0}deg)`,
                transitionProperty: "transform",
                transitionDuration: `${starRotated ? STAR_FORWARD_MS : STAR_BACK_MS}ms`,
                transitionTimingFunction: STAR_EASING,
              }}
            >
              <JacobsenStar className={starClassName} />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}