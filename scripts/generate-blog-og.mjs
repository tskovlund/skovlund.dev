/**
 * Generate Open Graph images for blog posts.
 *
 * Usage: node scripts/generate-blog-og.mjs
 *
 * Produces 1200x630 PNGs at public/og/<slug>.png for each blog post.
 * Embeds Monaspace Neon for consistent branding with the site.
 */

import { mkdirSync, readdirSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import sharp from "sharp";

/** Parse YAML frontmatter from a markdown file (avoids gray-matter dependency). */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const data = {};
  for (const line of match[1].split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    // Strip surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    // Coerce booleans
    if (value === "true") value = true;
    else if (value === "false") value = false;
    data[key] = value;
  }
  return data;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC_DIR = join(ROOT, "public");
const OG_DIR = join(PUBLIC_DIR, "og");
const BLOG_DIR = join(ROOT, "src/content/blog");

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

// Colors (Tokyo Night)
const BG = "#1a1b26";
const BLUE = "#7aa2f7";
const MUTED = "#565f89";
const FG = "#a9b1d6";

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

const RAINBOW_COLORS = [
  BLUE,
  "#9ece6a",
  "#e0af68",
  "#f7768e",
  "#bb9af7",
  "#2ac3de",
];

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Wrap text to fit within a max width, given approximate character width.
 * Returns an array of lines.
 */
function wrapText(text, maxCharsPerLine) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (candidate.length <= maxCharsPerLine) {
      currentLine = candidate;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

function generateBlogOgSvg(title, description) {
  // Rainbow bar at bottom
  const barSegmentWidth = OG_WIDTH / RAINBOW_COLORS.length;
  const rainbowBars = RAINBOW_COLORS.map(
    (color, index) =>
      `<rect x="${index * barSegmentWidth}" y="0" width="${barSegmentWidth + 1}" height="6" fill="${color}"/>`,
  ).join("");

  // Title: large, bold, blue — wrap to fit
  const titleFontSize = 52;
  const titleMaxChars = 28;
  const titleLines = wrapText(title, titleMaxChars);
  const titleLineHeight = titleFontSize * 1.3;

  // Description: smaller, muted — wrap to fit
  const descFontSize = 24;
  const descMaxChars = 52;
  const descLines = wrapText(description, descMaxChars);
  const descLineHeight = descFontSize * 1.4;

  // Layout: title block + gap + description block, vertically centered
  const gapBetween = 28;
  const titleBlockHeight = titleLines.length * titleLineHeight;
  const descBlockHeight = descLines.length * descLineHeight;
  const totalHeight = titleBlockHeight + gapBetween + descBlockHeight;
  const startY = (OG_HEIGHT - totalHeight) / 2;

  // Horizontal padding
  const paddingX = 80;
  const textX = paddingX;

  const titleTextElements = titleLines
    .map((line, index) => {
      const y = startY + index * titleLineHeight + titleFontSize * 0.85;
      return `<text x="${textX}" y="${y}" font-family="${FONT}" font-size="${titleFontSize}" font-weight="700"
            fill="${BLUE}" dominant-baseline="auto">${escapeXml(line)}</text>`;
    })
    .join("\n    ");

  const descStartY = startY + titleBlockHeight + gapBetween;
  const descTextElements = descLines
    .map((line, index) => {
      const y = descStartY + index * descLineHeight + descFontSize * 0.85;
      return `<text x="${textX}" y="${y}" font-family="${FONT}" font-size="${descFontSize}" font-weight="400"
            fill="${FG}" dominant-baseline="auto">${escapeXml(line)}</text>`;
    })
    .join("\n    ");

  // Attribution at bottom-right
  const attrX = OG_WIDTH - paddingX;
  const attrY = OG_HEIGHT - 36;

  return `<svg width="${OG_WIDTH}" height="${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    ${FONT_FACE_DEFS}
    <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="${BG}"/>
    ${titleTextElements}
    ${descTextElements}
    <text x="${attrX}" y="${attrY}" font-family="${FONT}" font-size="18" font-weight="400"
          fill="${MUTED}" text-anchor="end" dominant-baseline="auto">skovlund.dev</text>
    <g transform="translate(0, ${OG_HEIGHT - 6})">
      ${rainbowBars}
    </g>
  </svg>`;
}

async function main() {
  mkdirSync(OG_DIR, { recursive: true });

  // Find all blog post directories
  const slugs = readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  for (const slug of slugs) {
    // Read frontmatter from .md or .mdx
    let frontmatter;
    for (const ext of ["index.mdx", "index.md"]) {
      try {
        const content = readFileSync(join(BLOG_DIR, slug, ext), "utf-8");
        frontmatter = parseFrontmatter(content);
        break;
      } catch {
        // Try next extension
      }
    }

    if (!frontmatter) {
      console.warn(`Skipping ${slug}: no frontmatter found`);
      continue;
    }

    if (frontmatter.draft) {
      console.log(`Skipping draft: ${slug}`);
      continue;
    }

    const svg = generateBlogOgSvg(frontmatter.title, frontmatter.description);
    const outputPath = join(OG_DIR, `${slug}.png`);

    await sharp(Buffer.from(svg)).png().toFile(outputPath);
    console.log(`${slug}.png → ${outputPath}`);
  }
}

main().catch(console.error);
