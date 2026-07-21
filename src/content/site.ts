export const locales = ["en", "pt"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeDetails = {
  en: {
    htmlLang: "en",
    hreflang: "en",
    label: "English",
    shortLabel: "EN",
    pathPrefix: "",
  },
  pt: {
    htmlLang: "pt-BR",
    hreflang: "pt-BR",
    label: "Português",
    shortLabel: "PT",
    pathPrefix: "/pt",
  },
} as const satisfies Record<
  Locale,
  {
    htmlLang: string;
    hreflang: string;
    label: string;
    shortLabel: string;
    pathPrefix: string;
  }
>;

export type StaticRouteKey =
  | "home"
  | "projects"
  | "studio"
  | "contact"
  | "privacy";

export type RouteMap = Readonly<
  Record<StaticRouteKey, string> & { projectBase: string }
>;

export const routeMaps = {
  en: {
    home: "/",
    projects: "/projects",
    projectBase: "/projects",
    studio: "/studio",
    contact: "/contact",
    privacy: "/privacy",
  },
  pt: {
    home: "/pt",
    projects: "/pt/projetos",
    projectBase: "/pt/projetos",
    studio: "/pt/escritorio",
    contact: "/pt/contato",
    privacy: "/pt/privacidade",
  },
} as const satisfies Record<Locale, RouteMap>;

export const projectIds = [
  "horizon-pavilion",
  "mist-house",
  "courtyard-house",
] as const;

export type ProjectId = (typeof projectIds)[number];

export const projectSlugs = {
  "horizon-pavilion": {
    en: "horizon-pavilion",
    pt: "pavilhao-horizonte",
  },
  "mist-house": {
    en: "mist-house",
    pt: "casa-neblina",
  },
  "courtyard-house": {
    en: "courtyard-house",
    pt: "casa-patio",
  },
} as const satisfies Record<ProjectId, Record<Locale, string>>;

export type ProjectSlug =
  (typeof projectSlugs)[ProjectId][keyof (typeof projectSlugs)[ProjectId]];

export type NavigationItem = Readonly<{
  key: StaticRouteKey;
  label: string;
  href: string;
}>;

export type ProjectImage = Readonly<{
  src: string;
  sourceAsset: string;
  alt: string;
}>;

export type LocalizedProject = Readonly<{
  id: ProjectId;
  slug: ProjectSlug;
  title: string;
  eyebrow: string;
  status: "unbuilt";
  statusLabel: string;
  summary: string;
  statement: readonly string[];
  themes: readonly string[];
  images: readonly ProjectImage[];
  seo: Readonly<{
    title: string;
    description: string;
  }>;
}>;

export type LocalizedProjectCollection = readonly [
  LocalizedProject,
  LocalizedProject,
  LocalizedProject,
];

export type LocaleSuggestionContent = Readonly<{
  message: string;
  action: string;
  dismiss: string;
}>;

export type PrivacySection = Readonly<{
  title: string;
  paragraphs: readonly string[];
}>;

export type LocalizedSiteContent = Readonly<{
  brand: Readonly<{
    name: "Studio Flamboyant";
    tagline: string;
    disclosure: string;
  }>;
  global: Readonly<{
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    menuLabel: string;
    closeMenuLabel: string;
    changeLanguage: string;
    previousProject: string;
    nextProject: string;
    viewProject: string;
    backToProjects: string;
    conceptualLabel: string;
    unbuiltLabel: string;
    imageCounter: (current: number, total: number) => string;
    localeSuggestion: LocaleSuggestionContent;
  }>;
  navigation: Readonly<{
    primary: readonly NavigationItem[];
    utility: readonly NavigationItem[];
  }>;
  home: Readonly<{
    seo: Readonly<{ title: string; description: string }>;
    featuredLabel: string;
  }>;
  projectsIndex: Readonly<{
    seo: Readonly<{ title: string; description: string }>;
    eyebrow: string;
    title: string;
  }>;
  studio: Readonly<{
    seo: Readonly<{ title: string; description: string }>;
    eyebrow: string;
    title: string;
    manifesto: readonly string[];
    principlesLabel: string;
    principles: readonly Readonly<{
      number: string;
      title: string;
      body: string;
    }>[];
    media: readonly Readonly<{
      src: string;
      alt: string;
      caption: string;
    }>[];
  }>;
  contact: Readonly<{
    seo: Readonly<{ title: string; description: string }>;
    title: string;
    form: Readonly<{
      fields: Readonly<{
        name: Readonly<{ label: string; placeholder: string }>;
        email: Readonly<{ label: string; placeholder: string }>;
        message: Readonly<{ label: string; placeholder: string }>;
        consent: Readonly<{
          label: string;
          privacyLinkLabel: string;
          privacyHref: string;
        }>;
      }>;
      submit: string;
      submitting: string;
      successTitle: string;
      successBody: string;
      errorTitle: string;
      errorBody: string;
    }>;
  }>;
  privacy: Readonly<{
    seo: Readonly<{ title: string; description: string }>;
    eyebrow: string;
    title: string;
    updated: string;
    intro: string;
    sections: readonly PrivacySection[];
  }>;
  notFound: Readonly<{
    eyebrow: string;
    title: string;
    body: string;
    action: string;
    href: string;
  }>;
  footer: Readonly<{
    caseCredit: string;
    privacyLabel: string;
    privacyHref: string;
  }>;
}>;

const projectAssets = {
  "horizon-pavilion": [
    {
      src: "/images/projects/horizon-pavilion/01.webp",
      sourceAsset: "1.webp",
    },
    {
      src: "/images/projects/horizon-pavilion/02.webp",
      sourceAsset: "2.webp",
    },
    {
      src: "/images/projects/horizon-pavilion/03.webp",
      sourceAsset: "10.webp",
    },
    {
      src: "/images/projects/horizon-pavilion/04.webp",
      sourceAsset: "generated:exec-fe6e66aa-8713-4816-af51-71d42268bce5.png",
    },
    {
      src: "/images/projects/horizon-pavilion/05.webp",
      sourceAsset: "generated:exec-78d6904d-a11d-44a0-97b9-5210712ef745.png",
    },
    {
      src: "/images/projects/horizon-pavilion/06.webp",
      sourceAsset: "generated:exec-c31fedcf-262c-4141-8ece-8cbc62809126.png",
    },
    {
      src: "/images/projects/horizon-pavilion/07.webp",
      sourceAsset: "generated:exec-fdd4adb0-6754-48ff-8d1a-0d0bd4eea680.png",
    },
    {
      src: "/images/projects/horizon-pavilion/08.webp",
      sourceAsset: "generated:exec-639662ca-e107-42bf-92e7-27b290cdeb63.png",
    },
  ],
  "mist-house": [
    {
      src: "/images/projects/mist-house/01.webp",
      sourceAsset: "3.webp",
    },
    {
      src: "/images/projects/mist-house/02.webp",
      sourceAsset: "6.webp",
    },
    {
      src: "/images/projects/mist-house/03.webp",
      sourceAsset: "7.webp",
    },
    {
      src: "/images/projects/mist-house/04.webp",
      sourceAsset: "9.webp",
    },
    {
      src: "/images/projects/mist-house/05.webp",
      sourceAsset: "generated:exec-f866592b-9d3b-4949-84dd-1e5400f4d4da.png",
    },
    {
      src: "/images/projects/mist-house/06.webp",
      sourceAsset: "generated:exec-48eeedb5-0da5-4bc1-8dcc-6ae4bbb3ef7b.png",
    },
    {
      src: "/images/projects/mist-house/07.webp",
      sourceAsset: "generated:exec-ff6e2859-d025-4895-a79b-d5bfab3f2770.png",
    },
    {
      src: "/images/projects/mist-house/08.webp",
      sourceAsset: "generated:exec-2841689c-c4d9-4ea1-8a26-f0c37d7cc99f.png",
    },
  ],
  "courtyard-house": [
    {
      src: "/images/projects/courtyard-house/01.webp",
      sourceAsset: "4.webp",
    },
    {
      src: "/images/projects/courtyard-house/02.webp",
      sourceAsset: "5.webp",
    },
    {
      src: "/images/projects/courtyard-house/03.webp",
      sourceAsset: "8.webp",
    },
    {
      src: "/images/projects/courtyard-house/04.webp",
      sourceAsset: "generated:exec-b875391a-8596-4a6e-b353-5beac0527ad1.png",
    },
    {
      src: "/images/projects/courtyard-house/05.webp",
      sourceAsset: "generated:exec-4b17fcb7-1094-4e16-b160-a4d3af1d85e7.png",
    },
    {
      src: "/images/projects/courtyard-house/06.webp",
      sourceAsset: "generated:exec-8a1ccf53-0849-4377-9a53-877a67013479.png",
    },
    {
      src: "/images/projects/courtyard-house/07.webp",
      sourceAsset: "generated:exec-46af33cf-cf3a-4ae1-8465-8b76fd14bc2e.png",
    },
    {
      src: "/images/projects/courtyard-house/08.webp",
      sourceAsset: "generated:exec-e7792812-3cef-4d46-834f-218ea513dddb.png",
    },
  ],
} as const satisfies Record<
  ProjectId,
  readonly Omit<ProjectImage, "alt">[]
>;

type ProjectImageAltMap = Readonly<{
  "horizon-pavilion": readonly [string, string, string, string, string, string, string, string];
  "mist-house": readonly [string, string, string, string, string, string, string, string];
  "courtyard-house": readonly [string, string, string, string, string, string, string, string];
}>;

const imageAlts = {
  en: {
    "horizon-pavilion": [
      "Monolithic concrete pavilion with a tall glazed opening reflected in still water at dusk.",
      "Low white pavilion with a broad cantilevered roof, warm interior light and a reflection on water.",
      "Symmetrical glass pavilion beneath a thin dark roof, illuminated at its centre and mirrored in water at blue hour.",
      "Tall concrete portal and glazed corner meeting a reflecting pool in a vertical blue-hour view.",
      "Double-height pavilion interior framed by concrete and glass, looking across still water at blue hour.",
      "Elevated oblique view of the concrete-and-glass pavilion, pale platform and reflecting pool at dusk.",
      "Close view of a board-formed concrete pier, thin roof edge and glass seam above reflective water.",
      "Long glazed pavilion glowing amber across a dark reflecting pool at nightfall.",
    ],
    "mist-house": [
      "Dark timber-and-glass house beside a still lake, with mist crossing snow-covered mountains.",
      "Small tree in a ceramic vessel lit by a roof opening against a dark concrete interior.",
      "Glass-and-timber house extending over a lake in a snowy mountain landscape.",
      "Small tree and timber bench beneath a roof opening in a shadowed concrete room.",
      "Sheltered timber threshold beside a misty alpine lake, seen in a vertical winter view.",
      "Dark timber living room with a concrete hearth and full-height view of a fog-covered snowy lake.",
      "Low timber-and-concrete house revealed between bare trees at the end of a snow-dusted path.",
      "Lakeside house glowing softly beneath a blue winter sky, reflected in dark water.",
    ],
    "courtyard-house": [
      "Minimal living room with timber screens, low seating and two potted trees in angled sunlight.",
      "Wooden dining table below a roof light in a pale room, with a potted tree at the edge.",
      "Calm living room framed by timber screens, with low seating, circular wall art and a potted tree.",
      "Slender courtyard tree rising through a roof opening between oak screens and pale stone surfaces.",
      "Low house wrapping a planted courtyard with oak screens, pale stone and broad garden openings.",
      "Vertical threshold detail of oak slats, pale stone and filtered foliage beside the courtyard.",
      "Long dining room opening directly onto the planted courtyard through full-height glass.",
      "Courtyard tree and adjoining rooms glowing softly through oak screens at night.",
    ],
  },
  pt: {
    "horizon-pavilion": [
      "Pavilhão monolítico de concreto com uma abertura alta envidraçada, refletido em água parada ao entardecer.",
      "Pavilhão branco e baixo com ampla cobertura em balanço, luz interna quente e reflexo sobre a água.",
      "Pavilhão simétrico de vidro sob uma cobertura escura e fina, iluminado ao centro e espelhado na água durante a hora azul.",
      "Portal alto de concreto e canto envidraçado junto a um espelho d'água em um enquadramento vertical na hora azul.",
      "Interior de pé-direito duplo emoldurado por concreto e vidro, voltado para a água parada na hora azul.",
      "Vista elevada e oblíqua do pavilhão de concreto e vidro, da plataforma clara e do espelho d'água ao entardecer.",
      "Detalhe de pilar em concreto aparente, cobertura fina e encontro do vidro acima da água refletiva.",
      "Pavilhão longitudinal envidraçado aceso em âmbar diante de um espelho d'água escuro ao anoitecer.",
    ],
    "mist-house": [
      "Casa de madeira escura e vidro junto a um lago calmo, com névoa atravessando montanhas cobertas de neve.",
      "Pequena árvore em vaso de cerâmica iluminada por uma abertura zenital diante de um interior de concreto escuro.",
      "Casa de vidro e madeira avançando sobre um lago em uma paisagem montanhosa coberta de neve.",
      "Pequena árvore e banco de madeira sob uma abertura zenital em um ambiente de concreto sombreado.",
      "Passagem protegida em madeira junto a um lago alpino coberto de névoa, em um enquadramento vertical de inverno.",
      "Sala de madeira escura com lareira de concreto e vista ampla para um lago nevado coberto de neblina.",
      "Casa baixa de madeira e concreto revelada entre árvores nuas ao fim de um caminho coberto de neve.",
      "Casa à margem do lago iluminada com discrição sob o céu azul de inverno e refletida na água escura.",
    ],
    "courtyard-house": [
      "Sala minimalista com painéis de madeira, assentos baixos e duas árvores em vasos sob luz inclinada.",
      "Mesa de jantar de madeira sob uma abertura zenital em um ambiente claro, com uma árvore em vaso na lateral.",
      "Sala serena emoldurada por painéis de madeira, com assentos baixos, arte circular na parede e uma árvore em vaso.",
      "Árvore esguia de pátio atravessando uma abertura na cobertura entre planos de carvalho e pedra clara.",
      "Casa baixa envolvendo um pátio plantado, com painéis de carvalho, pedra clara e grandes aberturas para o jardim.",
      "Detalhe vertical de passagem com ripas de carvalho, pedra clara e folhagem filtrada junto ao pátio.",
      "Sala de jantar longitudinal aberta diretamente para o pátio plantado através de vidro de piso a teto.",
      "Árvore do pátio e ambientes adjacentes iluminados com suavidade através de ripas de carvalho à noite.",
    ],
  },
} as const satisfies Record<Locale, ProjectImageAltMap>;

function localizeImages(
  locale: Locale,
  projectId: ProjectId,
): readonly ProjectImage[] {
  return projectAssets[projectId].map((asset, index) => ({
    ...asset,
    alt: imageAlts[locale][projectId][index],
  }));
}

export const projectsByLocale = {
  en: [
    {
      id: "horizon-pavilion",
      slug: projectSlugs["horizon-pavilion"].en,
      title: "Horizon Pavilion",
      eyebrow: "Concept study 01",
      status: "unbuilt",
      statusLabel: "Concept study · Unbuilt",
      summary:
        "A pavilion reduced to roof, threshold and reflection—an exercise in making the horizon part of the room.",
      statement: [
        "Horizon Pavilion studies how a single horizontal gesture can hold a place together. A thin roof extends beyond the enclosure, tempering light while keeping the edge visually open.",
        "The surrounding water is not a claimed site. It is an imagined field used to test symmetry, scale and the moment when architecture becomes atmosphere.",
      ],
      themes: ["Horizon", "Reflection", "Threshold"],
      images: localizeImages("en", "horizon-pavilion"),
      seo: {
        title: "Horizon Pavilion — Concept Study",
        description:
          "An unbuilt Studio Flamboyant study of horizon, reflection and a wide cantilevered roof.",
      },
    },
    {
      id: "mist-house",
      slug: projectSlugs["mist-house"].en,
      title: "Mist House",
      eyebrow: "Concept study 02",
      status: "unbuilt",
      statusLabel: "Concept study · Unbuilt",
      summary:
        "An imagined winter retreat where a low structure holds warmth against an expansive, quiet landscape.",
      statement: [
        "Mist House is a study in contrast: precise glass and timber against an indistinct winter horizon. The low profile keeps the dwelling visually subordinate to its imagined landscape.",
        "Inside, roof openings isolate small areas of light. The sequence moves from a distant view to a close, quiet encounter with material, shadow and a single tree.",
      ],
      themes: ["Shelter", "Mist", "Measured light"],
      images: localizeImages("en", "mist-house"),
      seo: {
        title: "Mist House — Concept Study",
        description:
          "An unbuilt Studio Flamboyant study of shelter, winter atmosphere and measured natural light.",
      },
    },
    {
      id: "courtyard-house",
      slug: projectSlugs["courtyard-house"].en,
      title: "Courtyard House",
      eyebrow: "Concept study 03",
      status: "unbuilt",
      statusLabel: "Concept study · Unbuilt",
      summary:
        "An interior study shaped by filtered daylight, timber frames and pockets of living green.",
      statement: [
        "Courtyard House explores an inward kind of openness. Timber screens establish rhythm without sealing the rooms, while roof light turns plain surfaces into a changing clock.",
        "Furniture stays low and the palette remains restrained so that shadow, texture and vegetation carry the composition. The project is a spatial visualisation, not a built residence.",
      ],
      themes: ["Courtyard", "Filtered light", "Continuity"],
      images: localizeImages("en", "courtyard-house"),
      seo: {
        title: "Courtyard House — Concept Study",
        description:
          "An unbuilt Studio Flamboyant interior study of filtered daylight, timber screens and living green.",
      },
    },
  ],
  pt: [
    {
      id: "horizon-pavilion",
      slug: projectSlugs["horizon-pavilion"].pt,
      title: "Pavilhão Horizonte",
      eyebrow: "Estudo conceitual 01",
      status: "unbuilt",
      statusLabel: "Estudo conceitual · Não construído",
      summary:
        "Um pavilhão reduzido a cobertura, passagem e reflexo — um exercício de trazer o horizonte para dentro do espaço.",
      statement: [
        "O Pavilhão Horizonte investiga como um único gesto horizontal pode organizar um lugar. Uma cobertura fina ultrapassa o fechamento, filtra a luz e mantém a borda visualmente aberta.",
        "A água ao redor não representa um terreno real. É um campo imaginado para testar simetria, escala e o instante em que arquitetura se torna atmosfera.",
      ],
      themes: ["Horizonte", "Reflexo", "Passagem"],
      images: localizeImages("pt", "horizon-pavilion"),
      seo: {
        title: "Pavilhão Horizonte — Estudo conceitual",
        description:
          "Estudo não construído do Studio Flamboyant sobre horizonte, reflexo e uma ampla cobertura em balanço.",
      },
    },
    {
      id: "mist-house",
      slug: projectSlugs["mist-house"].pt,
      title: "Casa Neblina",
      eyebrow: "Estudo conceitual 02",
      status: "unbuilt",
      statusLabel: "Estudo conceitual · Não construído",
      summary:
        "Um refúgio de inverno imaginado, onde uma estrutura baixa sustenta o calor diante de uma paisagem ampla e silenciosa.",
      statement: [
        "A Casa Neblina é um estudo de contraste: vidro e madeira precisos diante de um horizonte de inverno indefinido. O perfil baixo mantém a casa visualmente subordinada à paisagem imaginada.",
        "No interior, aberturas zenitais isolam pequenas áreas de luz. A sequência parte da vista distante e chega a um encontro próximo com matéria, sombra e uma única árvore.",
      ],
      themes: ["Abrigo", "Neblina", "Luz medida"],
      images: localizeImages("pt", "mist-house"),
      seo: {
        title: "Casa Neblina — Estudo conceitual",
        description:
          "Estudo não construído do Studio Flamboyant sobre abrigo, atmosfera de inverno e luz natural medida.",
      },
    },
    {
      id: "courtyard-house",
      slug: projectSlugs["courtyard-house"].pt,
      title: "Casa Pátio",
      eyebrow: "Estudo conceitual 03",
      status: "unbuilt",
      statusLabel: "Estudo conceitual · Não construído",
      summary:
        "Um estudo de interiores construído por luz filtrada, planos de madeira e pequenos núcleos de vegetação.",
      statement: [
        "A Casa Pátio explora uma abertura voltada para dentro. Painéis de madeira estabelecem ritmo sem isolar os ambientes, enquanto a luz zenital transforma superfícies simples em um relógio mutável.",
        "O mobiliário permanece baixo e a paleta, contida, para que sombra, textura e vegetação conduzam a composição. O projeto é uma visualização espacial, não uma residência construída.",
      ],
      themes: ["Pátio", "Luz filtrada", "Continuidade"],
      images: localizeImages("pt", "courtyard-house"),
      seo: {
        title: "Casa Pátio — Estudo conceitual",
        description:
          "Estudo não construído do Studio Flamboyant sobre luz filtrada, painéis de madeira e vegetação.",
      },
    },
  ],
} as const satisfies Record<Locale, LocalizedProjectCollection>;

export const siteContent = {
  en: {
    brand: {
      name: "Studio Flamboyant",
      tagline: "Light, landscape and measured form.",
      disclosure:
        "Studio Flamboyant is a fictional architecture practice created as a design and frontend case by Fabiano Magalhães.",
    },
    global: {
      skipToContent: "Skip to content",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      menuLabel: "Menu",
      closeMenuLabel: "Close",
      changeLanguage: "Change language",
      previousProject: "Previous project",
      nextProject: "Next project",
      viewProject: "View study",
      backToProjects: "Back to projects",
      conceptualLabel: "Conceptual architecture",
      unbuiltLabel: "Unbuilt study",
      imageCounter: (current, total) => `Image ${current} of ${total}`,
      localeSuggestion: {
        message: "This experience is also available in Portuguese.",
        action: "View in Portuguese",
        dismiss: "Continue in English",
      },
    },
    navigation: {
      primary: [
        {
          key: "projects",
          label: "Projects",
          href: routeMaps.en.projects,
        },
        { key: "studio", label: "Studio", href: routeMaps.en.studio },
        { key: "contact", label: "Contact", href: routeMaps.en.contact },
      ],
      utility: [
        { key: "home", label: "Home", href: routeMaps.en.home },
        { key: "privacy", label: "Privacy", href: routeMaps.en.privacy },
      ],
    },
    home: {
      seo: {
        title: "Studio Flamboyant — Architecture Portfolio Template",
        description:
          "A licensable, production-ready Next.js architecture portfolio template: bilingual, accessible, SEO-ready and performance-conscious.",
      },
      featuredLabel: "Selected studies",
    },
    projectsIndex: {
      seo: {
        title: "Projects — Studio Flamboyant",
        description:
          "Explore three unbuilt Studio Flamboyant studies shaped by horizon, mist, courtyards and measured light.",
      },
      eyebrow: "Selected work",
      title: "Three studies. One pursuit: space with less noise.",
    },
    studio: {
      seo: {
        title: "Studio — Studio Flamboyant",
        description:
          "Studio Flamboyant explores light, landscape and measured form through three conceptual architecture studies.",
      },
      eyebrow: "Studio Flamboyant",
      title: "Restraint, lit from within.",
      manifesto: [
        "We shape broad planes, deep shade and precise openings, removing until light and proportion carry the atmosphere.",
      ],
      principlesLabel: "Working principles",
      principles: [
        {
          number: "01",
          title: "Restraint with intent",
          body: "Every remaining line has a clear role.",
        },
        {
          number: "02",
          title: "Atmosphere through light",
          body: "Shadow and reflection become spatial material.",
        },
        {
          number: "03",
          title: "Continuity across scales",
          body: "One rhythm connects structure, type and motion.",
        },
      ],
      media: [
        {
          src: "/images/projects/horizon-pavilion/02.webp",
          alt: imageAlts.en["horizon-pavilion"][1],
          caption: "Horizon Pavilion · Study in reflection",
        },
        {
          src: "/images/projects/mist-house/03.webp",
          alt: imageAlts.en["mist-house"][2],
          caption: "Mist House · Study in shelter",
        },
        {
          src: "/images/projects/courtyard-house/02.webp",
          alt: imageAlts.en["courtyard-house"][1],
          caption: "Courtyard House · Study in measured light",
        },
      ],
    },
    contact: {
      seo: {
        title: "Contact — Studio Flamboyant",
        description:
          "Contact Fabiano Magalhães about a design-led website, frontend experience or digital product—not an architecture commission.",
      },
      title: "Want a site with this level of care?",
      form: {
        fields: {
          name: { label: "Name *", placeholder: "Your name" },
          email: { label: "Email *", placeholder: "you@company.com" },
          message: {
            label: "Project context *",
            placeholder:
              "What are you building, what is getting in the way, and what should change?",
          },
          consent: {
            label:
              "I agree that my details may be used to reply to this enquiry.",
            privacyLinkLabel: "Read the privacy notice",
            privacyHref: routeMaps.en.privacy,
          },
        },
        submit: "Send message",
        submitting: "Sending…",
        successTitle: "Message sent.",
        successBody: "Thanks for the context. Fabiano will reply directly.",
        errorTitle: "The message was not sent.",
        errorBody:
          "Please review the fields and try again. If the issue continues, wait a moment before resubmitting.",
      },
    },
    privacy: {
      seo: {
        title: "Privacy — Studio Flamboyant",
        description:
          "How Studio Flamboyant processes contact-form information, language preferences and technical analytics.",
      },
      eyebrow: "Plain-language notice",
      title: "Privacy",
      updated: "Last updated 19 July 2026",
      intro:
        "Fabiano Magalhães is responsible for the information processed through this portfolio case. The site collects only what is needed to reply to a project enquiry, understand aggregate performance and remember a language choice.",
      sections: [
        {
          title: "Information you submit",
          paragraphs: [
            "The contact form asks for your name, email, message and consent. Locale and non-content anti-abuse fields are also sent so the request can be validated safely.",
            "Do not include passwords, financial records or other sensitive personal information in the message.",
          ],
        },
        {
          title: "How it is used",
          paragraphs: [
            "The submitted information is used only to evaluate and reply to your enquiry, prevent automated abuse and troubleshoot delivery failures.",
            "You give explicit consent when submitting the form and may withdraw it for future processing. The information is not sold, used for advertising profiles or added to a marketing list.",
          ],
        },
        {
          title: "Delivery and storage",
          paragraphs: [
            "The application does not maintain its own database of contact submissions. A valid request is processed to send an email through Resend.",
            "The receiving mailbox keeps the enquiry only while it is needed to reply, follow up on the requested work, handle security incidents or meet an applicable legal obligation. Resend and the hosting provider may retain message or technical records under their own policies. Application logs avoid the submitted name, email and message body.",
          ],
        },
        {
          title: "Analytics and preferences",
          paragraphs: [
            "Vercel Analytics and Speed Insights may process aggregate technical signals such as page performance and route usage. This site does not use advertising trackers.",
            "A language preference may be stored in your browser so the site does not repeat the same language suggestion. You can clear it through your browser settings.",
          ],
        },
        {
          title: "Your request",
          paragraphs: [
            "Fabiano Magalhães is the contact for privacy requests. To ask about access, correction, withdrawal of consent or deletion of information sent through the form, use the contact page and include enough context to identify the original enquiry without resending sensitive data.",
          ],
        },
      ],
    },
    notFound: {
      eyebrow: "404 · Outside the plan",
      title: "This plane leads nowhere.",
      body: "The address may have changed, or the page may no longer be part of the study.",
      action: "Return to the projects",
      href: routeMaps.en.projects,
    },
    footer: {
      caseCredit: "Concept, design and frontend by",
      privacyLabel: "Privacy",
      privacyHref: routeMaps.en.privacy,
    },
  },
  pt: {
    brand: {
      name: "Studio Flamboyant",
      tagline: "Luz, paisagem e forma medida.",
      disclosure:
        "Studio Flamboyant é um escritório de arquitetura fictício criado como case de design e frontend por Fabiano Magalhães.",
    },
    global: {
      skipToContent: "Ir para o conteúdo",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      menuLabel: "Menu",
      closeMenuLabel: "Fechar",
      changeLanguage: "Mudar idioma",
      previousProject: "Projeto anterior",
      nextProject: "Próximo projeto",
      viewProject: "Ver estudo",
      backToProjects: "Voltar aos projetos",
      conceptualLabel: "Arquitetura conceitual",
      unbuiltLabel: "Estudo não construído",
      imageCounter: (current, total) => `Imagem ${current} de ${total}`,
      localeSuggestion: {
        message: "Esta experiência também está disponível em inglês.",
        action: "Ver em inglês",
        dismiss: "Continuar em português",
      },
    },
    navigation: {
      primary: [
        {
          key: "projects",
          label: "Projetos",
          href: routeMaps.pt.projects,
        },
        { key: "studio", label: "Escritório", href: routeMaps.pt.studio },
        { key: "contact", label: "Contato", href: routeMaps.pt.contact },
      ],
      utility: [
        { key: "home", label: "Início", href: routeMaps.pt.home },
        {
          key: "privacy",
          label: "Privacidade",
          href: routeMaps.pt.privacy,
        },
      ],
    },
    home: {
      seo: {
        title: "Studio Flamboyant — Template de portfólio para arquitetura",
        description:
          "Template licenciado de portfólio de arquitetura em Next.js: bilíngue, acessível, preparado para SEO e atento à performance.",
      },
      featuredLabel: "Estudos selecionados",
    },
    projectsIndex: {
      seo: {
        title: "Projetos — Studio Flamboyant",
        description:
          "Conheça três estudos não construídos do Studio Flamboyant, moldados por horizonte, neblina, pátios e luz medida.",
      },
      eyebrow: "Trabalhos selecionados",
      title: "Três estudos. Uma busca: espaço com menos ruído.",
    },
    studio: {
      seo: {
        title: "Escritório — Studio Flamboyant",
        description:
          "O Studio Flamboyant explora luz, paisagem e forma medida por meio de três estudos de arquitetura conceitual.",
      },
      eyebrow: "Studio Flamboyant",
      title: "Contenção, acesa por dentro.",
      manifesto: [
        "Trabalhamos com planos amplos, sombra profunda e aberturas precisas, removendo até que luz e proporção sustentem a atmosfera.",
      ],
      principlesLabel: "Princípios de trabalho",
      principles: [
        {
          number: "01",
          title: "Contenção com intenção",
          body: "Cada linha restante tem uma função clara.",
        },
        {
          number: "02",
          title: "Atmosfera pela luz",
          body: "Sombra e reflexo tornam-se matéria espacial.",
        },
        {
          number: "03",
          title: "Continuidade entre escalas",
          body: "Um ritmo conecta estrutura, tipografia e movimento.",
        },
      ],
      media: [
        {
          src: "/images/projects/horizon-pavilion/02.webp",
          alt: imageAlts.pt["horizon-pavilion"][1],
          caption: "Pavilhão Horizonte · Estudo de reflexo",
        },
        {
          src: "/images/projects/mist-house/03.webp",
          alt: imageAlts.pt["mist-house"][2],
          caption: "Casa Neblina · Estudo de abrigo",
        },
        {
          src: "/images/projects/courtyard-house/02.webp",
          alt: imageAlts.pt["courtyard-house"][1],
          caption: "Casa Pátio · Estudo de luz medida",
        },
      ],
    },
    contact: {
      seo: {
        title: "Contato — Studio Flamboyant",
        description:
          "Fale com Fabiano Magalhães sobre um site de direção autoral, uma experiência frontend ou um produto digital — não sobre um projeto de arquitetura.",
      },
      title: "Quer um site com este nível de cuidado?",
      form: {
        fields: {
          name: { label: "Nome *", placeholder: "Seu nome" },
          email: { label: "E-mail *", placeholder: "voce@empresa.com" },
          message: {
            label: "Contexto do projeto *",
            placeholder:
              "O que você está construindo, o que está travando e o que precisa mudar?",
          },
          consent: {
            label:
              "Concordo que meus dados sejam usados para responder a esta solicitação.",
            privacyLinkLabel: "Ler o aviso de privacidade",
            privacyHref: routeMaps.pt.privacy,
          },
        },
        submit: "Enviar mensagem",
        submitting: "Enviando…",
        successTitle: "Mensagem enviada.",
        successBody: "Obrigado pelo contexto. Fabiano responderá diretamente.",
        errorTitle: "A mensagem não foi enviada.",
        errorBody:
          "Revise os campos e tente novamente. Se o problema continuar, aguarde um momento antes de reenviar.",
      },
    },
    privacy: {
      seo: {
        title: "Privacidade — Studio Flamboyant",
        description:
          "Como o Studio Flamboyant processa dados do formulário de contato, preferência de idioma e métricas técnicas.",
      },
      eyebrow: "Aviso em linguagem direta",
      title: "Privacidade",
      updated: "Última atualização em 19 de julho de 2026",
      intro:
        "Fabiano Magalhães é o responsável pelas informações processadas por este case de portfólio. O site coleta apenas o necessário para responder a uma solicitação de projeto, entender a performance agregada e lembrar uma escolha de idioma.",
      sections: [
        {
          title: "Dados enviados por você",
          paragraphs: [
            "O formulário solicita nome, e-mail, mensagem e consentimento. O idioma e campos técnicos sem conteúdo pessoal também são enviados para validar a solicitação com segurança.",
            "Não inclua senhas, dados financeiros ou outras informações pessoais sensíveis na mensagem.",
          ],
        },
        {
          title: "Como os dados são usados",
          paragraphs: [
            "As informações enviadas são usadas somente para avaliar e responder à sua solicitação, impedir abuso automatizado e investigar falhas de entrega.",
            "Você dá consentimento explícito ao enviar o formulário e pode retirá-lo para tratamentos futuros. As informações não são vendidas, usadas para perfis de publicidade nem adicionadas a uma lista de marketing.",
          ],
        },
        {
          title: "Entrega e armazenamento",
          paragraphs: [
            "A aplicação não mantém um banco de dados próprio com as mensagens do formulário. Uma solicitação válida é processada para enviar um e-mail pelo Resend.",
            "A caixa postal de destino mantém a solicitação apenas enquanto ela for necessária para responder, acompanhar o trabalho solicitado, tratar incidentes de segurança ou cumprir uma obrigação legal aplicável. O Resend e o provedor de hospedagem podem manter registros da mensagem ou registros técnicos conforme suas próprias políticas. Os logs da aplicação evitam nome, e-mail e corpo da mensagem.",
          ],
        },
        {
          title: "Métricas e preferências",
          paragraphs: [
            "Vercel Analytics e Speed Insights podem processar sinais técnicos agregados, como performance das páginas e uso de rotas. Este site não utiliza rastreadores de publicidade.",
            "Uma preferência de idioma pode ser salva no navegador para que o site não repita a mesma sugestão. Você pode apagá-la pelas configurações do navegador.",
          ],
        },
        {
          title: "Sua solicitação",
          paragraphs: [
            "Fabiano Magalhães é o contato para assuntos de privacidade. Para pedir acesso, correção, retirada do consentimento ou exclusão de informações enviadas pelo formulário, use a página de contato e inclua informação suficiente para identificar a solicitação original, sem reenviar dados sensíveis.",
          ],
        },
      ],
    },
    notFound: {
      eyebrow: "404 · Fora do plano",
      title: "Este plano não leva a lugar nenhum.",
      body: "O endereço pode ter mudado ou a página pode não fazer mais parte do estudo.",
      action: "Voltar aos projetos",
      href: routeMaps.pt.projects,
    },
    footer: {
      caseCredit: "Conceito, design e frontend por",
      privacyLabel: "Privacidade",
      privacyHref: routeMaps.pt.privacy,
    },
  },
} as const satisfies Record<Locale, LocalizedSiteContent>;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function normalizeLocale(value?: string | null): Locale {
  return value && isLocale(value) ? value : defaultLocale;
}

export function getRoute(locale: Locale, route: StaticRouteKey): string {
  return routeMaps[locale][route];
}

export function getProjectRoute(
  locale: Locale,
  project: ProjectId | LocalizedProject,
): string {
  const id = typeof project === "string" ? project : project.id;
  return `${routeMaps[locale].projectBase}/${projectSlugs[id][locale]}`;
}

export function getNavigation(locale: Locale) {
  return siteContent[locale].navigation;
}

export function getProjects(locale: Locale): readonly LocalizedProject[] {
  return projectsByLocale[locale];
}

export function getProjectById(
  locale: Locale,
  id: ProjectId,
): LocalizedProject {
  const project = projectsByLocale[locale].find((item) => item.id === id);

  if (!project) {
    throw new Error(`Missing project content for ${locale}/${id}`);
  }

  return project;
}

export function getProjectBySlug(
  locale: Locale,
  slug: string,
): LocalizedProject | undefined {
  return projectsByLocale[locale].find((project) => project.slug === slug);
}

export function getProjectIdBySlug(
  locale: Locale,
  slug: string,
): ProjectId | undefined {
  return getProjectBySlug(locale, slug)?.id;
}

export function getSiteContent(locale: Locale) {
  return {
    ...siteContent[locale],
    projects: projectsByLocale[locale],
  } as const;
}

export type RouteAlternates = Readonly<{
  canonical: string;
  languages: Readonly<{
    en: string;
    "pt-BR": string;
    "x-default": string;
  }>;
}>;

export function getPageAlternates(
  locale: Locale,
  route: StaticRouteKey,
): RouteAlternates {
  return {
    canonical: routeMaps[locale][route],
    languages: {
      en: routeMaps.en[route],
      "pt-BR": routeMaps.pt[route],
      "x-default": routeMaps.en[route],
    },
  };
}

export function getProjectAlternates(
  locale: Locale,
  project: ProjectId | LocalizedProject,
): RouteAlternates {
  const id = typeof project === "string" ? project : project.id;

  return {
    canonical: getProjectRoute(locale, id),
    languages: {
      en: getProjectRoute("en", id),
      "pt-BR": getProjectRoute("pt", id),
      "x-default": getProjectRoute("en", id),
    },
  };
}

export function getAlternateProjectRoute(
  currentLocale: Locale,
  currentSlug: string,
  targetLocale: Locale,
): string | undefined {
  const id = getProjectIdBySlug(currentLocale, currentSlug);
  return id ? getProjectRoute(targetLocale, id) : undefined;
}

export function resolveLocaleFromPathname(pathname: string): Locale {
  return pathname === "/pt" || pathname.startsWith("/pt/") ? "pt" : "en";
}

/**
 * Resolves either a known site pathname or a project slug into the equivalent
 * route in another locale. Unknown values fall back to that locale's home.
 */
export function getLocalizedPath(
  pathnameOrSlug: string,
  targetLocale: Locale,
): string {
  const value = pathnameOrSlug.split(/[?#]/, 1)[0] || "/";

  if (!value.startsWith("/")) {
    for (const locale of locales) {
      const id = getProjectIdBySlug(locale, value);
      if (id) return getProjectRoute(targetLocale, id);
    }

    return routeMaps[targetLocale].home;
  }

  const pathname = value.length > 1 ? value.replace(/\/$/, "") : value;
  const currentLocale = resolveLocaleFromPathname(pathname);
  const staticRouteKeys: readonly StaticRouteKey[] = [
    "home",
    "projects",
    "studio",
    "contact",
    "privacy",
  ];

  for (const route of staticRouteKeys) {
    if (pathname === routeMaps[currentLocale][route]) {
      return routeMaps[targetLocale][route];
    }
  }

  const projectPrefix = `${routeMaps[currentLocale].projectBase}/`;
  if (pathname.startsWith(projectPrefix)) {
    const slug = pathname.slice(projectPrefix.length);
    const id = getProjectIdBySlug(currentLocale, slug);
    if (id) return getProjectRoute(targetLocale, id);
  }

  return routeMaps[targetLocale].home;
}
