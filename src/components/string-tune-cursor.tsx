"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    StringTuneContext?: unknown;
    __jfStringTuneCursorStarted?: boolean;
  }
}

const cursorAttrs = {
  "string-cursor": "",
  "string-cursor-lerp": "0.75",
} as const;

export function StringTuneCursor() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.__jfStringTuneCursorStarted) {
      return;
    }

    let cancelled = false;
    const defaultCopyLabel = "Copiar";
    const defaultCopiedLabel = "Copiado";

    const setCursorLabels = (copyLabel?: string, copiedLabel?: string) => {
      document.querySelectorAll<HTMLElement>(".jf-string-cursor__copy").forEach((element) => {
        element.textContent = copyLabel ?? defaultCopyLabel;
      });

      document.querySelectorAll<HTMLElement>(".jf-string-cursor__copied").forEach((element) => {
        element.textContent = copiedLabel ?? defaultCopiedLabel;
      });
    };

    const syncCursorTarget = (eventTarget: EventTarget | null) => {
      if (!(eventTarget instanceof Element)) {
        setCursorLabels();
        return;
      }

      const target = eventTarget.closest<HTMLElement>("[data-copy-cursor-label]");
      setCursorLabels(
        target?.dataset.copyCursorLabel,
        target?.dataset.copyCursorCopiedLabel,
      );
    };

    const handleCopyState = (event: Event) => {
      const copied = event instanceof CustomEvent && event.detail?.copied === true;
      document
        .querySelectorAll(".jf-string-cursor, .jf-string-cursor-echo")
        .forEach((element) => element.classList.toggle("jf-copy-target--copied", copied));
    };

    const handlePointerOver = (event: Event) => {
      syncCursorTarget(event.target);
    };

    const handleFocusIn = (event: Event) => {
      syncCursorTarget(event.target);
    };

    const handlePointerLeave = () => {
      setCursorLabels();
    };

    const startCursor = async () => {
      const { StringTune, StringCursor } = await import("@fiddle-digital/string-tune");

      if (cancelled) {
        return;
      }

      const stringTune = StringTune.getInstance();
      window.StringTuneContext = stringTune;
      window.__jfStringTuneCursorStarted = true;

      stringTune.use(StringCursor);
      stringTune.start(0);
      requestAnimationFrame(() => stringTune.onResize(true));
    };

    window.addEventListener("jf:copy-cursor", handleCopyState);
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("pointerleave", handlePointerLeave);
    startCursor().catch((error) => {
      window.__jfStringTuneCursorStarted = false;
      console.error("[StringTuneCursor]", error);
    });

    return () => {
      cancelled = true;
      window.removeEventListener("jf:copy-cursor", handleCopyState);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <>
      <div {...cursorAttrs} className="jf-string-cursor" aria-hidden="true">
        <span className="jf-string-cursor__copy">Copiar</span>
        <span className="jf-string-cursor__copied">Copiado</span>
      </div>
      <div {...cursorAttrs} className="jf-string-cursor-echo" aria-hidden="true" />
      <div
        {...{ "string-cursor": "", "string-cursor-lerp": "0.9" }}
        className="jf-string-cursor-echo jf-string-cursor-echo--slow"
        aria-hidden="true"
      />
    </>
  );
}
