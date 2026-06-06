export type TreflePlaneDefinition = {
  accentColor: string;
  backgroundColor: string;
  blob1Color: string;
  blob2Color: string;
  fallbackColor: string;
  label: {
    color: string;
    pms: string;
    word: string;
  };
  position: {
    x: number;
    y: number;
  };
  textureSrc: string;
};

export const trefleGalleryPlaneData: TreflePlaneDefinition[] = [
  {
    fallbackColor: "#feca4f",
    accentColor: "#feca4f",
    textureSrc: "/images/galeria-trefle/flower-01.webp",
    position: { x: -0.9, y: 0 },
    backgroundColor: "#fffaf0",
    blob1Color: "#ffdf94",
    blob2Color: "#fce7c4",
    label: {
      word: "golden",
      pms: "PMS 135 C",
      color: "#2e2e2e",
    },
  },
  {
    fallbackColor: "#80455a",
    accentColor: "#80455a",
    textureSrc: "/images/galeria-trefle/flower-02.webp",
    position: { x: 0.8, y: 0 },
    backgroundColor: "#fffaf0",
    blob1Color: "#d29a41",
    blob2Color: "#bb96af",
    label: {
      word: "violet",
      pms: "PMS 4985 C",
      color: "#2e2e2e",
    },
  },
  {
    fallbackColor: "#fa7b71",
    accentColor: "#fa7b71",
    textureSrc: "/images/galeria-trefle/flower-03.webp",
    position: { x: -0.7, y: 0 },
    backgroundColor: "#5f81ab",
    blob1Color: "#f88b8d",
    blob2Color: "#cfbbdd",
    label: {
      word: "afterglow",
      pms: "PMS 170 C",
      color: "#f4f4f4",
    },
  },
  {
    fallbackColor: "#3c72c6",
    accentColor: "#3c72c6",
    textureSrc: "/images/galeria-trefle/flower-04.webp",
    position: { x: 1, y: 0 },
    backgroundColor: "#5b9bc2",
    blob1Color: "#ffaa00",
    blob2Color: "#00e1ff",
    label: {
      word: "cobalt",
      pms: "PMS 660 C",
      color: "#f4f4f4",
    },
  },
  {
    fallbackColor: "#fdd895",
    accentColor: "#fdd895",
    textureSrc: "/images/galeria-trefle/flower-05.webp",
    position: { x: -0.7, y: 0 },
    backgroundColor: "#7d936e",
    blob1Color: "#fdd895",
    blob2Color: "#a5b599",
    label: {
      word: "meadow",
      pms: "PMS 7507 C",
      color: "#f4f4f4",
    },
  },
];
