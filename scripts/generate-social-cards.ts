import { resolve } from "node:path";
import sharp from "sharp";

const width = 1200;
const height = 630;
const background = resolve("scripts/assets/social-card-background.png");

type CardCopy = {
  titleLines: readonly string[];
  licenseLabel: string;
  licenseWidth: number;
  credit: string;
  capabilities: string;
};

const cards: Record<string, CardCopy> = {
  "social-card.png": {
    titleLines: ["Architecture", "portfolio", "template"],
    licenseLabel: "AVAILABLE TO LICENSE",
    licenseWidth: 286,
    credit: "DESIGN & FRONTEND BY FABIANO MAGALHÃES",
    capabilities: "NEXT.JS · BILINGUAL · ACCESSIBLE",
  },
  "social-card-pt.png": {
    titleLines: ["Template de", "portfólio para", "arquitetura"],
    licenseLabel: "LICENÇA COMERCIAL DISPONÍVEL",
    licenseWidth: 390,
    credit: "DESIGN E FRONTEND POR FABIANO MAGALHÃES",
    capabilities: "NEXT.JS · BILÍNGUE · ACESSÍVEL",
  },
};

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function overlaySvg(copy: CardCopy) {
  const title = copy.titleLines
    .map((line, index) => {
      const fill = index === copy.titleLines.length - 1 ? "#ff4b25" : "#f4f1ea";
      return `<text x="58" y="${226 + index * 83}" fill="${fill}" font-size="82" font-weight="500" letter-spacing="-4.8">${escapeXml(line)}</text>`;
    })
    .join("");

  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="font-family: Helvetica, Arial, sans-serif">
      <defs>
        <linearGradient id="left-shadow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#080806" stop-opacity="0.9" />
          <stop offset="0.72" stop-color="#080806" stop-opacity="0.58" />
          <stop offset="1" stop-color="#080806" stop-opacity="0" />
        </linearGradient>
      </defs>
      <rect width="800" height="630" fill="url(#left-shadow)" />
      <text x="58" y="82" fill="#f4f1ea" font-size="19" font-weight="700" letter-spacing="2.8">STUDIO FLAMBOYANT</text>
      ${title}
      <rect x="58" y="453" width="${copy.licenseWidth}" height="42" rx="21" fill="#ff4b25" />
      <text x="80" y="480" fill="#080806" font-size="15" font-weight="800" letter-spacing="1.25">${escapeXml(copy.licenseLabel)}</text>
      <line x1="58" y1="554" x2="513" y2="554" stroke="#f4f1ea" stroke-opacity="0.42" />
      <text x="58" y="581" fill="#f4f1ea" font-size="14" font-weight="700" letter-spacing="1.1">${escapeXml(copy.credit)}</text>
      <text x="58" y="607" fill="#f4f1ea" fill-opacity="0.72" font-size="12" font-weight="700" letter-spacing="1.15">${escapeXml(copy.capabilities)}</text>
    </svg>
  `);
}

async function generateSocialCards() {
  for (const [filename, copy] of Object.entries(cards)) {
    await sharp(background)
      .resize(width, height, { fit: "cover", position: "centre" })
      .composite([{ input: overlaySvg(copy), top: 0, left: 0 }])
      .png({ compressionLevel: 9, palette: true, quality: 100 })
      .toFile(resolve("public", filename));
  }
}

void generateSocialCards();
