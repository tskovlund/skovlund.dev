/**
 * Generate the site's Open Graph image (public/og.png).
 *
 * Usage: node scripts/generate-og.mjs
 *
 * Produces a 1200x630 PNG with portrait, site title, and author name.
 * Embeds Monaspace Neon for consistent branding with the site.
 */

import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC_DIR = join(ROOT, "public");

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

// Colors (Tokyo Night)
const BG = "#1a1b26";
const BLUE = "#7aa2f7";
const MUTED = "#565f89";

// Font embedding — Monaspace Neon
const FONT_DIR = join(ROOT, "node_modules/@fontsource/monaspace-neon/files");

function loadFontBase64(filename) {
  const fontPath = join(FONT_DIR, filename);
  return readFileSync(fontPath).toString("base64");
}

const fontRegularB64 = loadFontBase64("monaspace-neon-latin-400-normal.woff2");
const fontBoldB64 = loadFontBase64("monaspace-neon-latin-700-normal.woff2");

const FONT_FACE_DEFS = `
  <defs>
    <style type="text/css">
      @font-face {
        font-family: 'Monaspace Neon';
        font-weight: 400;
        font-style: normal;
        src: url('data:font/woff2;base64,${fontRegularB64}') format('woff2');
      }
      @font-face {
        font-family: 'Monaspace Neon';
        font-weight: 700;
        font-style: normal;
        src: url('data:font/woff2;base64,${fontBoldB64}') format('woff2');
      }
    </style>
  </defs>
`;

const FONT = "'Monaspace Neon', monospace";

async function main() {
  const portraitPath = join(PUBLIC_DIR, "portrait.jpg");
  const outputPath = join(PUBLIC_DIR, "og.png");

  const portraitSize = 200;
  const circleMask = Buffer.from(
    `<svg width="${portraitSize}" height="${portraitSize}">
      <circle cx="${portraitSize / 2}" cy="${portraitSize / 2}" r="${portraitSize / 2}" fill="white"/>
    </svg>`,
  );

  const portrait = await sharp(portraitPath)
    .resize(portraitSize, portraitSize, { fit: "cover" })
    .composite([{ input: circleMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const ringSize = portraitSize + 8;
  const ring = Buffer.from(
    `<svg width="${ringSize}" height="${ringSize}">
      <circle cx="${ringSize / 2}" cy="${ringSize / 2}" r="${ringSize / 2}" fill="none"
              stroke="${BLUE}" stroke-width="3" opacity="0.4"/>
    </svg>`,
  );
  const ringBuf = await sharp(ring).png().toBuffer();

  const rainbowColors = [
    BLUE,
    "#9ece6a",
    "#e0af68",
    "#f7768e",
    "#bb9af7",
    "#2ac3de",
  ];
  const barSegmentWidth = OG_WIDTH / rainbowColors.length;
  const rainbowBars = rainbowColors
    .map(
      (color, index) =>
        `<rect x="${index * barSegmentWidth}" y="0" width="${barSegmentWidth + 1}" height="6" fill="${color}"/>`,
    )
    .join("");

  // Text group vertically centered at OG_HEIGHT/2
  // Title (72px) + 20px gap + subtitle (28px) = 120px total
  // Center of group at 315, so title center at 291, subtitle center at 361
  const centerY = OG_HEIGHT / 2;
  const titleY = centerY - 24;
  const subtitleY = centerY + 46;
  const textX = 660;

  const ogSvg = `<svg width="${OG_WIDTH}" height="${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    ${FONT_FACE_DEFS}
    <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="${BG}"/>
    <text x="${textX}" y="${titleY}" font-family="${FONT}" font-size="72" font-weight="700"
          fill="${BLUE}" text-anchor="middle" dominant-baseline="central">skovlund.dev</text>
    <text x="${textX}" y="${subtitleY}" font-family="${FONT}" font-size="28" font-weight="400"
          fill="${MUTED}" text-anchor="middle" dominant-baseline="central">Thomas Skovlund Hansen</text>
    <g transform="translate(0, ${OG_HEIGHT - 6})">
      ${rainbowBars}
    </g>
  </svg>`;

  const ogBase = await sharp(Buffer.from(ogSvg)).png().toBuffer();

  await sharp(ogBase)
    .composite([
      {
        input: ringBuf,
        left: Math.round(240 - ringSize / 2),
        top: Math.round(centerY - ringSize / 2),
      },
      {
        input: portrait,
        left: Math.round(240 - portraitSize / 2),
        top: Math.round(centerY - portraitSize / 2),
      },
    ])
    .png()
    .toFile(outputPath);

  console.log(`og.png → ${outputPath}`);
}

main().catch(console.error);
