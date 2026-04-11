"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { Reveal } from "./reveal";

interface ProjectPageProps {
  project: Project;
  nextProject?: Project;
}

export function ProjectPage({ project, nextProject }: ProjectPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[85vh]">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-stone-900/20" />
        <div className="absolute bottom-0 left-0 right-0 section-padding pb-16 md:pb-24">
          <Link
            href={`/${project.section}`}
            className="inline-flex items-center gap-2 text-white/60 text-xs tracking-widest uppercase mb-6 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> {project.category}
          </Link>
          <h1 className="font-display text-display-sm md:text-display-md text-white">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Meta + description */}
      <section className="py-16 md:py-24 section-padding">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <dl className="space-y-6">
              {[
                { label: "Ano", value: project.year },
                { label: "Localiza\u00e7\u00e3o", value: project.location },
                { label: "\u00c1rea", value: project.area },
                { label: "Tipologia", value: project.category },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                    {item.label}
                  </dt>
                  <dd className="text-stone-800">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="md:col-span-2">
            <Reveal>
              <p className="text-xl md:text-2xl text-stone-700 leading-relaxed font-light">
                {project.description}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-16 md:pb-24 section-padding">
        <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
          {project.images.map((img, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="relative aspect-[16/10] bg-stone-200">
                <Image
                  src={img}
                  alt={`${project.title} \u2014 imagem ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Next project */}
      {nextProject && (
        <Link href={`/${nextProject.section}/${nextProject.slug}`} className="block group">
          <section className="relative h-[50vh] flex items-center justify-center">
            <Image
              src={nextProject.cover}
              alt={nextProject.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-stone-900/50 group-hover:bg-stone-900/40 transition-colors duration-500" />
            <div className="relative z-10 text-center">
              <p className="text-white/60 text-xs tracking-widest uppercase mb-3">
                Pr&oacute;ximo projeto
              </p>
              <h2 className="font-display text-display-sm text-white">
                {nextProject.title}
              </h2>
              <ArrowRight
                size={20}
                className="mx-auto mt-4 text-white/60 group-hover:translate-x-2 transition-transform"
              />
            </div>
          </section>
        </Link>
      )}
    </>
  );
}
