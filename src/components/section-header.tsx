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
    <div className={`mb-24 w-full relative z-10 ${align === "center" ? "text-center mb-32" : ""}`}>
      {eyebrow && (
        <p className="text-label font-sans uppercase text-ambient-canyon/55 mb-6">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-5xl sm:text-7xl lg:text-display-massive text-ambient-dark leading-[0.84] tracking-[-0.05em] uppercase">
        {title}
      </h2>
      {description && (
        <p className={`mt-8 font-sans font-normal text-ambient-canyon/80 text-lg md:text-xl leading-relaxed ${align === "center" ? "max-w-2xl mx-auto" : "max-w-xl border-l-[1px] border-ambient-stone pl-6"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
