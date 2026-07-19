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
  sourceAsset: `${number}.webp`;
  alt: string;
  presentation: "hero" | "wide" | "paired-left" | "paired-right";
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

export type CtaContent = Readonly<{
  eyebrow: string;
  title: string;
  body: string;
  action: string;
  href: string;
}>;

export type PrivacySection = Readonly<{
  title: string;
  paragraphs: readonly string[];
}>;

export type LocalizedSiteContent = Readonly<{
  brand: Readonly<{
    name: "Studio Flamboyant";
    tagline: string;
    caseLabel: string;
    disclosure: string;
  }>;
  global: Readonly<{
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
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
    eyebrow: string;
    title: string;
    intro: string;
    scrollCue: string;
    featuredLabel: string;
    projectsAction: string;
    projectsHref: string;
    serviceCta: CtaContent;
  }>;
  projectsIndex: Readonly<{
    seo: Readonly<{ title: string; description: string }>;
    eyebrow: string;
    title: string;
    intro: string;
    countLabel: (count: number) => string;
    disclosure: string;
    serviceCta: CtaContent;
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
    serviceCta: CtaContent;
  }>;
  contact: Readonly<{
    seo: Readonly<{ title: string; description: string }>;
    eyebrow: string;
    title: string;
    intro: string;
    responseNote: string;
    form: Readonly<{
      requiredHint: string;
      fields: Readonly<{
        name: Readonly<{ label: string; placeholder: string }>;
        email: Readonly<{ label: string; placeholder: string }>;
        company: Readonly<{
          label: string;
          optional: string;
          placeholder: string;
        }>;
        projectType: Readonly<{
          label: string;
          placeholder: string;
          options: readonly Readonly<{ value: string; label: string }>[];
        }>;
        budget: Readonly<{
          label: string;
          optional: string;
          placeholder: string;
        }>;
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
    disclosure: string;
    privacyLabel: string;
    privacyHref: string;
  }>;
}>;

const projectAssets = {
  "horizon-pavilion": [
    {
      src: "/images/projects/horizon-pavilion/01.webp",
      sourceAsset: "1.webp",
      presentation: "hero",
    },
    {
      src: "/images/projects/horizon-pavilion/02.webp",
      sourceAsset: "2.webp",
      presentation: "paired-left",
    },
    {
      src: "/images/projects/horizon-pavilion/03.webp",
      sourceAsset: "10.webp",
      presentation: "wide",
    },
  ],
  "mist-house": [
    {
      src: "/images/projects/mist-house/01.webp",
      sourceAsset: "3.webp",
      presentation: "hero",
    },
    {
      src: "/images/projects/mist-house/02.webp",
      sourceAsset: "6.webp",
      presentation: "paired-left",
    },
    {
      src: "/images/projects/mist-house/03.webp",
      sourceAsset: "7.webp",
      presentation: "wide",
    },
    {
      src: "/images/projects/mist-house/04.webp",
      sourceAsset: "9.webp",
      presentation: "paired-right",
    },
  ],
  "courtyard-house": [
    {
      src: "/images/projects/courtyard-house/01.webp",
      sourceAsset: "4.webp",
      presentation: "hero",
    },
    {
      src: "/images/projects/courtyard-house/02.webp",
      sourceAsset: "5.webp",
      presentation: "paired-left",
    },
    {
      src: "/images/projects/courtyard-house/03.webp",
      sourceAsset: "8.webp",
      presentation: "wide",
    },
  ],
} as const satisfies Record<
  ProjectId,
  readonly Omit<ProjectImage, "alt">[]
>;

type ProjectImageAltMap = Readonly<{
  "horizon-pavilion": readonly [string, string, string];
  "mist-house": readonly [string, string, string, string];
  "courtyard-house": readonly [string, string, string];
}>;

const imageAlts = {
  en: {
    "horizon-pavilion": [
      "Monolithic concrete pavilion with a tall glazed opening reflected in still water at dusk.",
      "Low white pavilion with a broad cantilevered roof, warm interior light and a reflection on water.",
      "Symmetrical glass pavilion beneath a thin dark roof, illuminated at its centre and mirrored in water at blue hour.",
    ],
    "mist-house": [
      "Dark timber-and-glass house beside a still lake, with mist crossing snow-covered mountains.",
      "Small tree in a ceramic vessel lit by a roof opening against a dark concrete interior.",
      "Glass-and-timber house extending over a lake in a snowy mountain landscape.",
      "Small tree and timber bench beneath a roof opening in a shadowed concrete room.",
    ],
    "courtyard-house": [
      "Minimal living room with timber screens, low seating and two potted trees in angled sunlight.",
      "Wooden dining table below a roof light in a pale room, with a potted tree at the edge.",
      "Calm living room framed by timber screens, with low seating, circular wall art and a potted tree.",
    ],
  },
  pt: {
    "horizon-pavilion": [
      "Pavilhão monolítico de concreto com uma abertura alta envidraçada, refletido em água parada ao entardecer.",
      "Pavilhão branco e baixo com ampla cobertura em balanço, luz interna quente e reflexo sobre a água.",
      "Pavilhão simétrico de vidro sob uma cobertura escura e fina, iluminado ao centro e espelhado na água durante a hora azul.",
    ],
    "mist-house": [
      "Casa de madeira escura e vidro junto a um lago calmo, com névoa atravessando montanhas cobertas de neve.",
      "Pequena árvore em vaso de cerâmica iluminada por uma abertura zenital diante de um interior de concreto escuro.",
      "Casa de vidro e madeira avançando sobre um lago em uma paisagem montanhosa coberta de neve.",
      "Pequena árvore e banco de madeira sob uma abertura zenital em um ambiente de concreto sombreado.",
    ],
    "courtyard-house": [
      "Sala minimalista com painéis de madeira, assentos baixos e duas árvores em vasos sob luz inclinada.",
      "Mesa de jantar de madeira sob uma abertura zenital em um ambiente claro, com uma árvore em vaso na lateral.",
      "Sala serena emoldurada por painéis de madeira, com assentos baixos, arte circular na parede e uma árvore em vaso.",
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

const serviceCtas = {
  en: {
    eyebrow: "The work behind the case",
    title: "Need a digital presence with the same level of care?",
    body: "Fabiano Frank designs and engineers high-craft websites and frontend experiences for real businesses, studios and products.",
    action: "Start a digital project",
    href: routeMaps.en.contact,
  },
  pt: {
    eyebrow: "O trabalho por trás do case",
    title: "Precisa de uma presença digital com este nível de cuidado?",
    body: "Fabiano Frank projeta e desenvolve sites e experiências frontend de alto nível para negócios, estúdios e produtos reais.",
    action: "Iniciar um projeto digital",
    href: routeMaps.pt.contact,
  },
} as const satisfies Record<Locale, CtaContent>;

export const siteContent = {
  en: {
    brand: {
      name: "Studio Flamboyant",
      tagline: "Architecture imagined. Digital craft made real.",
      caseLabel: "Conceptual architecture · Frontend case",
      disclosure:
        "Studio Flamboyant is a fictional architecture practice created as a design and frontend case by Fabiano Frank.",
    },
    global: {
      skipToContent: "Skip to content",
      openMenu: "Open menu",
      closeMenu: "Close menu",
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
        title: "Studio Flamboyant — Conceptual Architecture",
        description:
          "Three unbuilt studies in light, landscape and stillness—presented as a senior frontend case by Fabiano Frank.",
      },
      eyebrow: "Conceptual architecture · Frontend case",
      title: "Structures for stillness.",
      intro:
        "Three unbuilt studies test how light, proportion and landscape can turn restraint into atmosphere.",
      scrollCue: "Scroll to enter",
      featuredLabel: "Selected studies",
      projectsAction: "Explore all projects",
      projectsHref: routeMaps.en.projects,
      serviceCta: serviceCtas.en,
    },
    projectsIndex: {
      seo: {
        title: "Projects — Studio Flamboyant",
        description:
          "Explore three unbuilt Studio Flamboyant studies shaped by horizon, mist, courtyards and measured light.",
      },
      eyebrow: "Selected work",
      title: "Three studies. One pursuit: space with less noise.",
      intro:
        "Each project is a conceptual, unbuilt visual study. Together they form an editorial exploration of threshold, shelter and filtered light.",
      countLabel: (count) => `${count} conceptual studies`,
      disclosure:
        "These projects are fictional and unbuilt. No location, client, area, team or photographer is being claimed.",
      serviceCta: serviceCtas.en,
    },
    studio: {
      seo: {
        title: "Studio — Studio Flamboyant",
        description:
          "Meet Studio Flamboyant, a fictional architecture practice and a real design-engineering case by Fabiano Frank.",
      },
      eyebrow: "A practice imagined for the screen",
      title: "A studio built as a point of view.",
      manifesto: [
        "Studio Flamboyant is a fictional architecture practice shaped around one premise: restraint can be vivid. Its studies use broad planes, deep shade and carefully placed openings to give stillness a physical edge.",
        "The name comes from the flamboyant tree—familiar across Brazil and northern Minas Gerais, generous in shade and suddenly flame-coloured. That tension between calm structure and vivid presence guides the visual language.",
        "The architecture is conceptual and unbuilt. The digital work is real: Fabiano Frank created this case to demonstrate art direction, frontend engineering, motion, accessibility and performance as one coherent system.",
      ],
      principlesLabel: "Working principles",
      principles: [
        {
          number: "01",
          title: "Restraint with intent",
          body: "Remove until every remaining line, surface and interaction has a clear role.",
        },
        {
          number: "02",
          title: "Atmosphere through light",
          body: "Treat shadow and reflection as spatial material, not decoration.",
        },
        {
          number: "03",
          title: "Continuity across scales",
          body: "Carry the same rhythm from a building edge to a line of type and a transition on screen.",
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
      serviceCta: serviceCtas.en,
    },
    contact: {
      seo: {
        title: "Contact — Studio Flamboyant",
        description:
          "Contact Fabiano Frank about a design-led website, frontend experience or digital product—not an architecture commission.",
      },
      eyebrow: "A real conversation",
      title: "Want a site with this level of care?",
      intro:
        "Studio Flamboyant is a conceptual case, not an architecture practice accepting commissions. This form reaches Fabiano Frank for websites, frontend systems and digital products.",
      responseNote:
        "Share the context, the constraint and what success should feel like. You will receive a direct reply from Fabiano.",
      form: {
        requiredHint: "Fields marked with an asterisk are required.",
        fields: {
          name: { label: "Name *", placeholder: "Your name" },
          email: { label: "Email *", placeholder: "you@company.com" },
          company: {
            label: "Company",
            optional: "Optional",
            placeholder: "Company or studio",
          },
          projectType: {
            label: "Project type *",
            placeholder: "Choose one",
            options: [
              { value: "editorial-site", label: "Editorial or portfolio site" },
              { value: "product-frontend", label: "Product frontend" },
              { value: "frontend-review", label: "Frontend review or rescue" },
              { value: "other", label: "Something else" },
            ],
          },
          budget: {
            label: "Budget",
            optional: "Optional",
            placeholder: "A range is enough",
          },
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
        submit: "Send enquiry",
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
      updated: "Last updated 18 July 2026",
      intro:
        "Fabiano Frank is responsible for the information processed through this portfolio case. The site collects only what is needed to reply to a project enquiry, understand aggregate performance and remember a language choice.",
      sections: [
        {
          title: "Information you submit",
          paragraphs: [
            "The contact form asks for your name, email, project type, message and consent. Company and budget are optional. Locale and non-content anti-abuse fields are also sent so the request can be validated safely.",
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
            "Fabiano Frank is the contact for privacy requests. To ask about access, correction, withdrawal of consent or deletion of information sent through the form, open the contact page and choose ‘Something else’. Include enough context to identify the original enquiry without resending sensitive data.",
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
      caseCredit: "Concept, design and frontend by Fabiano Frank.",
      disclosure:
        "Studio Flamboyant is a fictional architecture practice. All projects shown are conceptual and unbuilt.",
      privacyLabel: "Privacy",
      privacyHref: routeMaps.en.privacy,
    },
  },
  pt: {
    brand: {
      name: "Studio Flamboyant",
      tagline: "Arquitetura imaginada. Engenharia digital real.",
      caseLabel: "Arquitetura conceitual · Case frontend",
      disclosure:
        "Studio Flamboyant é um escritório de arquitetura fictício criado como case de design e frontend por Fabiano Frank.",
    },
    global: {
      skipToContent: "Ir para o conteúdo",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
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
        title: "Studio Flamboyant — Arquitetura conceitual",
        description:
          "Três estudos não construídos sobre luz, paisagem e pausa — apresentados como case frontend sênior por Fabiano Frank.",
      },
      eyebrow: "Arquitetura conceitual · Case frontend",
      title: "Estruturas para a pausa.",
      intro:
        "Três estudos não construídos investigam como luz, proporção e paisagem transformam contenção em atmosfera.",
      scrollCue: "Role para entrar",
      featuredLabel: "Estudos selecionados",
      projectsAction: "Explorar todos os projetos",
      projectsHref: routeMaps.pt.projects,
      serviceCta: serviceCtas.pt,
    },
    projectsIndex: {
      seo: {
        title: "Projetos — Studio Flamboyant",
        description:
          "Conheça três estudos não construídos do Studio Flamboyant, moldados por horizonte, neblina, pátios e luz medida.",
      },
      eyebrow: "Trabalhos selecionados",
      title: "Três estudos. Uma busca: espaço com menos ruído.",
      intro:
        "Cada projeto é um estudo visual conceitual e não construído. Juntos, formam uma investigação editorial sobre passagem, abrigo e luz filtrada.",
      countLabel: (count) => `${count} estudos conceituais`,
      disclosure:
        "Estes projetos são fictícios e não construídos. Não reivindicamos localização, cliente, área, equipe ou fotógrafo.",
      serviceCta: serviceCtas.pt,
    },
    studio: {
      seo: {
        title: "Escritório — Studio Flamboyant",
        description:
          "Conheça o Studio Flamboyant, um escritório de arquitetura fictício e um case real de design e engenharia por Fabiano Frank.",
      },
      eyebrow: "Uma prática imaginada para a tela",
      title: "Um escritório construído como ponto de vista.",
      manifesto: [
        "Studio Flamboyant é um escritório de arquitetura fictício guiado por uma premissa: contenção também pode ser vibrante. Seus estudos usam planos amplos, sombra profunda e aberturas precisas para dar presença física à pausa.",
        "O nome vem do flamboyant — árvore familiar no Brasil e no Norte de Minas, generosa em sombra e subitamente acesa como chama. Essa tensão entre estrutura calma e presença viva conduz a linguagem visual.",
        "A arquitetura é conceitual e não construída. O trabalho digital é real: Fabiano Frank criou este case para demonstrar direção de arte, engenharia frontend, motion, acessibilidade e performance como um único sistema coerente.",
      ],
      principlesLabel: "Princípios de trabalho",
      principles: [
        {
          number: "01",
          title: "Contenção com intenção",
          body: "Remover até que cada linha, superfície e interação restante tenha uma função clara.",
        },
        {
          number: "02",
          title: "Atmosfera pela luz",
          body: "Tratar sombra e reflexo como matéria espacial, não como decoração.",
        },
        {
          number: "03",
          title: "Continuidade entre escalas",
          body: "Levar o mesmo ritmo da borda de um edifício à linha tipográfica e à transição na tela.",
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
      serviceCta: serviceCtas.pt,
    },
    contact: {
      seo: {
        title: "Contato — Studio Flamboyant",
        description:
          "Fale com Fabiano Frank sobre um site de direção autoral, uma experiência frontend ou um produto digital — não sobre um projeto de arquitetura.",
      },
      eyebrow: "Uma conversa real",
      title: "Quer um site com este nível de cuidado?",
      intro:
        "Studio Flamboyant é um case conceitual, não um escritório que recebe projetos de arquitetura. Este formulário chega a Fabiano Frank para sites, sistemas frontend e produtos digitais.",
      responseNote:
        "Conte o contexto, a restrição e como o sucesso deve ser percebido. Você receberá uma resposta direta do Fabiano.",
      form: {
        requiredHint: "Campos marcados com asterisco são obrigatórios.",
        fields: {
          name: { label: "Nome *", placeholder: "Seu nome" },
          email: { label: "E-mail *", placeholder: "voce@empresa.com" },
          company: {
            label: "Empresa",
            optional: "Opcional",
            placeholder: "Empresa ou estúdio",
          },
          projectType: {
            label: "Tipo de projeto *",
            placeholder: "Escolha uma opção",
            options: [
              { value: "editorial-site", label: "Site editorial ou portfólio" },
              { value: "product-frontend", label: "Frontend de produto" },
              { value: "frontend-review", label: "Revisão ou resgate frontend" },
              { value: "other", label: "Outro contexto" },
            ],
          },
          budget: {
            label: "Orçamento",
            optional: "Opcional",
            placeholder: "Uma faixa já ajuda",
          },
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
        submit: "Enviar solicitação",
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
      updated: "Última atualização em 18 de julho de 2026",
      intro:
        "Fabiano Frank é o responsável pelas informações processadas por este case de portfólio. O site coleta apenas o necessário para responder a uma solicitação de projeto, entender a performance agregada e lembrar uma escolha de idioma.",
      sections: [
        {
          title: "Dados enviados por você",
          paragraphs: [
            "O formulário solicita nome, e-mail, tipo de projeto, mensagem e consentimento. Empresa e orçamento são opcionais. O idioma e campos técnicos sem conteúdo pessoal também são enviados para validar a solicitação com segurança.",
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
            "Fabiano Frank é o contato para assuntos de privacidade. Para pedir acesso, correção, retirada do consentimento ou exclusão de informações enviadas pelo formulário, abra a página de contato e escolha ‘Outro contexto’. Inclua informação suficiente para identificar a solicitação original, sem reenviar dados sensíveis.",
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
      caseCredit: "Conceito, design e frontend por Fabiano Frank.",
      disclosure:
        "Studio Flamboyant é um escritório de arquitetura fictício. Todos os projetos exibidos são conceituais e não construídos.",
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
