import { cn } from "@/lib/utils";

export function LocationBadge({
  label = "Montes Claros · MG",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex whitespace-nowrap border border-white/14 bg-black/38 px-4 py-2 text-[0.62rem] uppercase tracking-[0.24em] text-white/62 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl",
        className,
      )}
    >
      {label}
    </div>
  );
}
