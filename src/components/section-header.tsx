interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : ""}`}>
      {eyebrow && (
        <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-display-sm md:text-display-md text-stone-900">
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-stone-500 text-lg leading-relaxed ${align === "center" ? "max-w-2xl mx-auto" : "max-w-xl"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
