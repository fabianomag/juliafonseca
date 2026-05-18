import type { Lang } from "@/lib/i18n";

export const studioContent = {
  pt: {
    eyebrow: "Escritório",
    titleTop: "Conceito",
    titleBottom: "e Equipe",
    intro: [
      "Um escritório com uma dinâmica criativa e descontraída, prezamos por um ambiente leve e de compromisso, desenvolvendo projetos com personalidade, originalidade e que mescle funcionalidade e estética.",
      "O escritório JF ARQUITETURA, hoje, já possui uma marca projetual e identidade característica visual, ainda que feito personalizado para cada cliente.",
    ],
    quote:
      "A arquitetura ideal tem como objetivo aguçar todos os sentidos do corpo humano, instigando nossa visão, olfato, tato e audição. Proporcionando uma experiência marcante e única.",
    quoteAuthor: "Júlia Fonseca",
    teamTitle: "Equipe",
    cta: "Inicie seu projeto",
    homeTitle: "Escritório",
    homeIntro:
      "Uma equipe pequena, autoral e precisa. O escritório combina identidade forte, leitura contemporânea e acompanhamento próximo em cada projeto.",
    homeCta: "Conheça a equipe",
    officeImageAlt: "Julia Fonseca no escritório",
    team: [
      {
        name: "Júlia Fonseca",
        role: "Sócia-fundadora",
        image: "/images/1 julia.webp",
        bio:
          "Formada em Arquitetura e Urbanismo em 2012 pelo Instituto Metodista Izabela Hendrix em Belo Horizonte, pós-graduada em arquitetura, iluminação e interiores pelo Ipog, Júlia atuou como arquiteta em escritório de Arquitetura em Belo Horizonte e mudou-se para sua cidade Natal, Montes Claros, onde fundou o escritório Júlia Fonseca - Arquitetura e Design no ano de 2016. Desde então, atua em projetos arquitetônicos e de interiores, principalmente residenciais e comerciais.",
      },
      {
        name: "Cecília Nogueira",
        role: "Arquiteta coordenadora",
        image: "/images/2 cecilia.webp",
        bio:
          "Formada em Arquitetura e Urbanismo em 2014 pela Faculdade Santo Agostinho em Montes Claros, pós graduanda em Master em Arquitetura e Iluminação pelo Ipog. Desde 2015, atuando principalmente em projetos de interiores e de consultórios, Cecília antes profissional parceira do escritório, integrou à equipe da JF Arquitetura desde o ano de 2023.",
      },
      {
        name: "Rayssa Souto",
        role: "Estagiária",
        image: "/images/3 rayssa.webp",
        bio:
          "Estudante de Arquitetura e Urbanismo na UNIFIPMOC, em Montes Claros, e formada em curso técnico de Design de Interiores no Conservatório Lorenzo Fernandez.",
      },
      {
        name: "Andréia Silva",
        role: "Estagiária",
        image: "/images/4 andreia.webp",
        bio:
          "Estudante de Curso Técnico em Edificações pelo Senai e graduada em Design de Interiores pelo Conservatório de Montes Claros.",
      },
    ],
  },
  en: {
    eyebrow: "Studio",
    titleTop: "Concept",
    titleBottom: "& team",
    intro: [
      "A studio with a creative and relaxed rhythm, shaped by a light but committed atmosphere. Every project is developed through the balance of personality, originality, functionality and aesthetic clarity.",
      "The studio already carries a recognizable visual identity and project language, even when each solution is fully tailored to the client. The approach is contemporary without losing warmth, comfort and receptiveness.",
    ],
    quote:
      "Ideal architecture should awaken every human sense, engaging sight, smell, touch and hearing while creating a unique and memorable experience.",
    quoteAuthor: "Julia Fonseca",
    teamTitle: "Team",
    cta: "Start your project",
    homeTitle: "Studio",
    homeIntro:
      "A small, highly authored team. The studio combines a clear identity, contemporary language and close involvement throughout each project.",
    homeCta: "Meet the team",
    officeImageAlt: "Julia Fonseca at the studio",
    team: [
      {
        name: "Julia Fonseca",
        role: "Founder",
        image: "/images/1 julia.webp",
        bio:
          "Graduated in Architecture and Urbanism in 2012 at Instituto Metodista Izabela Hendrix in Belo Horizonte, with postgraduate studies in architecture, lighting and interiors at IPOG. After working in architecture studios in Belo Horizonte, she returned to Montes Claros and founded the studio in 2016.",
      },
      {
        name: "Cecília Nogueira",
        role: "Lead architect",
        image: "/images/2 cecilia.webp",
        bio:
          "Graduated in Architecture and Urbanism in 2014 at Faculdade Santo Agostinho in Montes Claros, with postgraduate studies in Architecture and Lighting at IPOG. After years working mainly on interiors and clinics, she formally joined the studio team in 2023.",
      },
      {
        name: "Rayssa Souto",
        role: "Intern",
        image: "/images/3 rayssa.webp",
        bio:
          "Architecture and Urbanism student at UNIFIPMOC in Montes Claros, with a technical degree in Interior Design from Conservatório Lorenzo Fernandez.",
      },
      {
        name: "Andréia Silva",
        role: "Intern",
        image: "/images/4 andreia.webp",
        bio:
          "Technical student in Building Construction at SENAI and graduate in Interior Design from the Conservatory of Montes Claros.",
      },
    ],
  },
} as const;

export function getStudioContent(lang: Lang) {
  return studioContent[lang];
}
