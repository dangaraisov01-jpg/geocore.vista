export interface ProposalPdfInput {
  lang: "ru" | "kk" | "en";
  fullName: string;
  company: string;
  phone: string;
  plan: "pilot" | "annual" | "both";
  planName: string;
  todayStr: string;
  contactPhone: string;
  contactEmail: string;
  copy: {
    docType: string;
    docNumber: string;
    docToLabel: string;
    docToDefaultCompany: string;
    docToDefaultPerson: string;
    docFromLabel: string;
    docFromValue: string;
    page1Label: string;
    page2Label: string;
    offerEyebrow: string;
    offerTitle: string;
    offerSubtitle: string;
    sec1Title: string;
    sec1Intro: string;
    sec1Points: { bold: string; text: string }[];
    sec2Title: string;
    sec2Intro: string;
    sec2Points: { bold: string; text: string }[];
    sec3Title: string;
    sec3Metrics: { value: string; label: string; desc: string }[];
    sec4Title: string;
    tariff1Badge: string;
    tariff1Title: string;
    tariff1Target: string;
    tariff1Points: { bold: string; text: string }[];
    tariff1Result: string;
    tariff2Badge: string;
    tariff2Title: string;
    tariff2Target: string;
    tariff2Points: { bold: string; text: string }[];
    tariff2Result: string;
    sec5Title: string;
    sec5Headline: string;
    sec5Intro: string;
    sec5Bullets: string[];
    sec5Footer: string;
  };
}

// Base layout coordinate space (A4 ratio 1 : 1.4142)
const LOGICAL_W = 1654;
const LOGICAL_H = 2339;
// Ultra-HD 425 DPI Print Master scale factor -> 3508 x 4961 px per page
const PRINT_SCALE = 2.121;
const CANVAS_W = Math.round(LOGICAL_W * PRINT_SCALE);
const CANVAS_H = Math.round(LOGICAL_H * PRINT_SCALE);

const MARGIN_X = 96;
const CONTENT_W = LOGICAL_W - MARGIN_X * 2;

// Exact website typography & brand tokens from index.css
const SANS_FONT = '"Golos Text", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const MONO_FONT = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

const COLORS = {
  ink: "#192d27",
  pine: "#142824",
  paper: "#f5f3ec",
  white: "#ffffff",
  copper: "#c9613c",
  muted: "#707971",
  line: "#d9ddd4",
};

function createHiDpiPageCanvas(): {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
} {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext("2d", { alpha: false })!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.scale(PRINT_SCALE, PRINT_SCALE);
  ctx.textBaseline = "top";
  return { canvas, ctx };
}

function setFont(
  ctx: CanvasRenderingContext2D,
  weight: string | number,
  sizePx: number,
  mono = false,
) {
  ctx.font = `${weight} ${sizePx}px ${mono ? MONO_FONT : SANS_FONT}`;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    const test = current ? `${current} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = w;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const lines = wrapLines(ctx, text, maxWidth);
  let curY = y;
  for (const line of lines) {
    ctx.fillText(line, x, curY);
    curY += lineHeight;
  }
  return curY;
}

function drawBoldAndRegularParagraph(
  ctx: CanvasRenderingContext2D,
  boldText: string,
  regularText: string,
  x: number,
  y: number,
  maxWidth: number,
  fontSize: number,
  lineHeight: number,
  boldColor = COLORS.ink,
  regColor = "#2f3e36",
  measureOnly = false,
): number {
  const tokens: { word: string; bold: boolean }[] = [];
  for (const w of boldText.trim().split(/\s+/).filter(Boolean)) {
    tokens.push({ word: w, bold: true });
  }
  for (const w of regularText.trim().split(/\s+/).filter(Boolean)) {
    tokens.push({ word: w, bold: false });
  }

  let lineTokens: { word: string; bold: boolean }[] = [];
  let lineW = 0;
  let curY = y;

  const flushLine = (items: { word: string; bold: boolean }[]) => {
    if (!measureOnly) {
      let curX = x;
      for (let i = 0; i < items.length; i++) {
        const tk = items[i];
        setFont(ctx, tk.bold ? 600 : 400, fontSize);
        ctx.fillStyle = tk.bold ? boldColor : regColor;
        const piece = i < items.length - 1 ? `${tk.word} ` : tk.word;
        ctx.fillText(piece, curX, curY);
        curX += ctx.measureText(piece).width;
      }
    }
    curY += lineHeight;
  };

  for (const tk of tokens) {
    setFont(ctx, tk.bold ? 600 : 400, fontSize);
    const wWidth = ctx.measureText(`${tk.word} `).width;
    if (lineTokens.length > 0 && lineW + wWidth > maxWidth) {
      flushLine(lineTokens);
      lineTokens = [tk];
      lineW = wWidth;
    } else {
      lineTokens.push(tk);
      lineW += wWidth;
    }
  }
  if (lineTokens.length > 0) {
    flushLine(lineTokens);
  }
  return curY;
}

/**
 * Draws the exact official Geocore.vista vector logo (/public/logos/geocore-logo.svg)
 * with infinite vector resolution using Path2D, plus the exact brand wordmark.
 */
function drawOfficialGeocoreBrand(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  iconSize: number,
  fontSize: number,
  subtitle?: string,
): number {
  ctx.save();
  // SVG viewBox is "4 4 92 92"
  const scale = iconSize / 92;
  ctx.translate(x - 4 * scale, y - 4 * scale);
  ctx.scale(scale, scale);

  // Clip circle cx="50" cy="50" r="46"
  ctx.beginPath();
  ctx.arc(50, 50, 46, 0, Math.PI * 2);
  ctx.clip();

  // Base circle fill="#59878D"
  ctx.fillStyle = "#59878D";
  ctx.beginPath();
  ctx.arc(50, 50, 46, 0, Math.PI * 2);
  ctx.fill();

  // Light teal sector fill="#73B2B4"
  const p1 = new Path2D(
    "M 17.47 82.53 A 46 46 0 0 1 50 4 L 50 20 A 30 30 0 0 0 28.79 71.21 Z",
  );
  ctx.fillStyle = "#73B2B4";
  ctx.fill(p1);

  // Dark slate top-right sector fill="#354E5F"
  const p2 = new Path2D("M 50 50 L 50 13.2 A 36.8 36.8 0 0 1 86.8 50 Z");
  ctx.fillStyle = "#354E5F";
  ctx.fill(p2);

  // Dark slate bottom sector fill="#354E5F"
  const p3 = new Path2D("M 50 50 L 80 50 A 30 30 0 0 1 28.79 71.21 Z");
  ctx.fillStyle = "#354E5F";
  ctx.fill(p3);

  // Dark strokes stroke="#1B1C1E" stroke-width="3.8"
  ctx.strokeStyle = "#1B1C1E";
  ctx.lineWidth = 3.8;
  ctx.lineCap = "butt";

  const s1 = new Path2D("M 80 50 A 30 30 0 1 1 50 20");
  ctx.stroke(s1);

  const s2 = new Path2D("M 50 13.2 A 36.8 36.8 0 0 1 86.8 50");
  ctx.stroke(s2);

  // Radial lines
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(50, 2);
  ctx.moveTo(50, 50);
  ctx.lineTo(98, 50);
  ctx.moveTo(50, 50);
  ctx.lineTo(15, 85);
  ctx.stroke();

  // Inner core circle cx="50" cy="50" r="13.8" fill="#C8CAC8" stroke="#1B1C1E"
  ctx.beginPath();
  ctx.arc(50, 50, 13.8, 0, Math.PI * 2);
  ctx.fillStyle = "#C8CAC8";
  ctx.fill();
  ctx.stroke();

  ctx.restore();

  // Wordmark: geocore.vista (matching .brand in Intro.tsx & index.css)
  const textX = x + iconSize + 18;
  const textY = subtitle ? y + 2 : y + (iconSize - fontSize) / 2 - 2;

  setFont(ctx, 600, fontSize);
  ctx.fillStyle = COLORS.ink;
  ctx.fillText("geocore", textX, textY);
  const geoW = ctx.measureText("geocore").width;

  ctx.fillStyle = COLORS.copper;
  ctx.fillText(".", textX + geoW, textY);
  const dotW = ctx.measureText(".").width;

  setFont(ctx, 400, fontSize);
  ctx.fillStyle = COLORS.ink;
  ctx.fillText("vista", textX + geoW + dotW, textY);
  const vistaW = ctx.measureText("vista").width;

  if (subtitle) {
    setFont(ctx, 500, 13, true);
    ctx.fillStyle = COLORS.muted;
    ctx.fillText(subtitle, textX, textY + fontSize + 6);
  }

  return textX + geoW + dotW + vistaW;
}

function renderPage1(input: ProposalPdfInput): HTMLCanvasElement {
  const { canvas, ctx } = createHiDpiPageCanvas();
  const { copy: c } = input;

  // Clean crisp white sheet background
  ctx.fillStyle = COLORS.white;
  ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);

  // Top pine & copper header bar
  ctx.fillStyle = COLORS.pine;
  ctx.fillRect(0, 0, LOGICAL_W, 10);
  ctx.fillStyle = COLORS.copper;
  ctx.fillRect(0, 10, 420, 4);

  let y = 58;

  // Official Company Logo + Wordmark
  drawOfficialGeocoreBrand(
    ctx,
    MARGIN_X,
    y,
    58,
    34,
    "FIELD GEOLOGICAL DATABASE & DOCUMENTATION",
  );

  // Right document metadata
  setFont(ctx, 700, 17, true);
  ctx.fillStyle = COLORS.pine;
  const docTypeW = ctx.measureText(c.docType).width;
  ctx.fillText(c.docType, LOGICAL_W - MARGIN_X - docTypeW, y + 4);

  setFont(ctx, 500, 14.5, true);
  ctx.fillStyle = COLORS.muted;
  const docMeta = `${c.docNumber} · ${input.todayStr}`;
  const docMetaW = ctx.measureText(docMeta).width;
  ctx.fillText(docMeta, LOGICAL_W - MARGIN_X - docMetaW, y + 32);

  y += 78;
  ctx.fillStyle = COLORS.pine;
  ctx.fillRect(MARGIN_X, y, CONTENT_W, 3);
  y += 24;

  // Recipient Bar (matching .kp-recipient-bar)
  const recH = 136;
  ctx.fillStyle = "#f5f6f1";
  ctx.fillRect(MARGIN_X, y, CONTENT_W, recH);
  ctx.strokeStyle = "#dce2d6";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(MARGIN_X, y, CONTENT_W, recH);

  // Copper left border accent
  ctx.fillStyle = COLORS.copper;
  ctx.fillRect(MARGIN_X, y, 6, recH);

  const colW = (CONTENT_W - 64) / 2;
  const col1X = MARGIN_X + 26;
  const col2X = MARGIN_X + 38 + colW;

  // Vertical divider
  ctx.fillStyle = "#dce2d6";
  ctx.fillRect(MARGIN_X + CONTENT_W / 2, y + 18, 1.5, recH - 36);

  // Left col: Recipient
  setFont(ctx, 600, 13.5, true);
  ctx.fillStyle = "#6f7c6f";
  ctx.fillText(c.docToLabel, col1X, y + 18);

  setFont(ctx, 600, 20.5);
  ctx.fillStyle = COLORS.ink;
  const companyLine =
    wrapLines(
      ctx,
      input.company.trim() || c.docToDefaultCompany,
      colW - 14,
    )[0] || "";
  ctx.fillText(companyLine, col1X, y + 46);

  setFont(ctx, 400, 17);
  ctx.fillStyle = "#4f5d52";
  const personStr = input.fullName.trim()
    ? `${input.fullName.trim()}${input.phone.trim() ? ` · Тел.: ${input.phone.trim()}` : ""}`
    : c.docToDefaultPerson;
  drawWrappedText(ctx, personStr, col1X, y + 80, colW - 14, 22);

  // Right col: Sender
  setFont(ctx, 600, 13.5, true);
  ctx.fillStyle = "#6f7c6f";
  ctx.fillText(c.docFromLabel, col2X, y + 18);

  setFont(ctx, 600, 19);
  ctx.fillStyle = COLORS.ink;
  const fromLine = wrapLines(ctx, c.docFromValue, colW - 14)[0] || "";
  ctx.fillText(fromLine, col2X, y + 46);

  setFont(ctx, 400, 16);
  ctx.fillStyle = "#4f5d52";
  const senderContact = `Тел. / WhatsApp: ${input.contactPhone} · ${input.contactEmail}`;
  ctx.fillText(senderContact, col2X, y + 76);

  setFont(ctx, 600, 16);
  ctx.fillStyle = COLORS.copper;
  const planLine =
    wrapLines(ctx, input.planName, colW - 14)[0] || input.planName;
  ctx.fillText(planLine, col2X, y + 101);

  y += recH + 24;

  // 1. Headline / Offer Box (matching .kp-offer-hero)
  setFont(ctx, 600, 31);
  const titleLines = wrapLines(ctx, c.offerTitle, CONTENT_W - 68);
  setFont(ctx, 400, 18.5);
  const subLines = wrapLines(ctx, c.offerSubtitle, CONTENT_W - 68);
  const offerH = 56 + titleLines.length * 39 + 12 + subLines.length * 26 + 26;

  ctx.fillStyle = COLORS.pine;
  ctx.fillRect(MARGIN_X, y, CONTENT_W, offerH);

  let oy = y + 24;
  setFont(ctx, 600, 14.5, true);
  ctx.fillStyle = "#e49778";
  ctx.fillText(c.offerEyebrow, MARGIN_X + 34, oy);
  oy += 28;

  setFont(ctx, 600, 31);
  ctx.fillStyle = COLORS.white;
  for (const line of titleLines) {
    ctx.fillText(line, MARGIN_X + 34, oy);
    oy += 39;
  }
  oy += 10;

  setFont(ctx, 400, 18.5);
  ctx.fillStyle = "#c6d2c7";
  for (const line of subLines) {
    ctx.fillText(line, MARGIN_X + 34, oy);
    oy += 26;
  }

  y += offerH + 28;

  // 2. Problem Statement
  setFont(ctx, 600, 22);
  ctx.fillStyle = COLORS.pine;
  ctx.fillText(c.sec1Title, MARGIN_X, y);
  y += 30;

  ctx.fillStyle = "#e1e6dc";
  ctx.fillRect(MARGIN_X, y, CONTENT_W, 2);
  y += 14;

  setFont(ctx, 400, 18);
  ctx.fillStyle = "#4a574d";
  y = drawWrappedText(ctx, c.sec1Intro, MARGIN_X, y, CONTENT_W, 25);
  y += 12;

  for (let i = 0; i < c.sec1Points.length; i++) {
    const pt = c.sec1Points[i];
    const textH =
      drawBoldAndRegularParagraph(
        ctx,
        pt.bold,
        pt.text,
        MARGIN_X + 64,
        0,
        CONTENT_W - 84,
        18,
        25,
        COLORS.ink,
        "#2f3e36",
        true,
      ) + 22;

    ctx.fillStyle = "#fafbf8";
    ctx.fillRect(MARGIN_X, y, CONTENT_W, textH);
    ctx.strokeStyle = "#e6ebe1";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(MARGIN_X, y, CONTENT_W, textH);

    // Index badge
    ctx.fillStyle = "#f7e9e3";
    ctx.fillRect(MARGIN_X + 14, y + 12, 36, 26);
    setFont(ctx, 600, 14, true);
    ctx.fillStyle = COLORS.copper;
    ctx.fillText(`0${i + 1}`, MARGIN_X + 22, y + 17);

    drawBoldAndRegularParagraph(
      ctx,
      pt.bold,
      pt.text,
      MARGIN_X + 64,
      y + 11,
      CONTENT_W - 84,
      18,
      25,
      COLORS.ink,
      "#2f3e36",
      false,
    );

    y += textH + 10;
  }

  y += 18;

  // 3. Solution Section
  setFont(ctx, 600, 22);
  ctx.fillStyle = COLORS.pine;
  ctx.fillText(c.sec2Title, MARGIN_X, y);
  y += 30;

  ctx.fillStyle = "#e1e6dc";
  ctx.fillRect(MARGIN_X, y, CONTENT_W, 2);
  y += 14;

  setFont(ctx, 400, 18);
  ctx.fillStyle = "#4a574d";
  y = drawWrappedText(ctx, c.sec2Intro, MARGIN_X, y, CONTENT_W, 25);
  y += 12;

  for (let i = 0; i < c.sec2Points.length; i++) {
    const pt = c.sec2Points[i];
    const textH =
      drawBoldAndRegularParagraph(
        ctx,
        pt.bold,
        pt.text,
        MARGIN_X + 64,
        0,
        CONTENT_W - 84,
        18,
        25,
        COLORS.ink,
        "#2f3e36",
        true,
      ) + 22;

    ctx.fillStyle = "#fafbf8";
    ctx.fillRect(MARGIN_X, y, CONTENT_W, textH);
    ctx.strokeStyle = "#e6ebe1";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(MARGIN_X, y, CONTENT_W, textH);

    // Check badge
    ctx.fillStyle = "#dff0e4";
    ctx.fillRect(MARGIN_X + 14, y + 12, 34, 28);
    setFont(ctx, 700, 17);
    ctx.fillStyle = "#1f5c3a";
    ctx.fillText("✓", MARGIN_X + 24, y + 16);

    drawBoldAndRegularParagraph(
      ctx,
      pt.bold,
      pt.text,
      MARGIN_X + 64,
      y + 11,
      CONTENT_W - 84,
      18,
      25,
      COLORS.ink,
      "#2f3e36",
      false,
    );

    y += textH + 10;
  }

  y += 18;

  // 4. Quantified Results (4 Metric Cards)
  setFont(ctx, 600, 22);
  ctx.fillStyle = COLORS.pine;
  ctx.fillText(c.sec3Title, MARGIN_X, y);
  y += 30;

  ctx.fillStyle = "#e1e6dc";
  ctx.fillRect(MARGIN_X, y, CONTENT_W, 2);
  y += 16;

  const cardGap = 18;
  const cardW = (CONTENT_W - cardGap * 3) / 4;
  const cardH = 224;

  for (let i = 0; i < c.sec3Metrics.length; i++) {
    const m = c.sec3Metrics[i];
    const cx = MARGIN_X + i * (cardW + cardGap);

    ctx.fillStyle = "#f4f6f0";
    ctx.fillRect(cx, y, cardW, cardH);
    ctx.strokeStyle = "#d7dfd1";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx, y, cardW, cardH);

    // Top pine accent bar (matching .kp-metric-card border-top: 3px solid var(--pine))
    ctx.fillStyle = COLORS.pine;
    ctx.fillRect(cx, y, cardW, 5);

    setFont(ctx, 600, 32, true);
    ctx.fillStyle = COLORS.copper;
    ctx.fillText(m.value, cx + 18, y + 22);

    setFont(ctx, 600, 18);
    ctx.fillStyle = COLORS.ink;
    const lblEnd = drawWrappedText(ctx, m.label, cx + 18, y + 66, cardW - 36, 22);

    setFont(ctx, 400, 15.5);
    ctx.fillStyle = "#556357";
    drawWrappedText(ctx, m.desc, cx + 18, lblEnd + 8, cardW - 36, 21);
  }

  // Footer
  const footerY = LOGICAL_H - 72;
  ctx.fillStyle = "#e1e6dc";
  ctx.fillRect(MARGIN_X, footerY - 16, CONTENT_W, 2);

  setFont(ctx, 500, 14.5, true);
  ctx.fillStyle = COLORS.muted;
  ctx.fillText(c.page1Label, MARGIN_X, footerY);

  const rightFoot = `GEOCORE.VISTA · ${input.contactPhone}`;
  const rfW = ctx.measureText(rightFoot).width;
  ctx.fillText(rightFoot, LOGICAL_W - MARGIN_X - rfW, footerY);

  return canvas;
}

function renderPage2(input: ProposalPdfInput): HTMLCanvasElement {
  const { canvas, ctx } = createHiDpiPageCanvas();
  const { copy: c } = input;

  // Clean crisp white sheet background
  ctx.fillStyle = COLORS.white;
  ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);

  // Top pine & copper header bar
  ctx.fillStyle = COLORS.pine;
  ctx.fillRect(0, 0, LOGICAL_W, 10);
  ctx.fillStyle = COLORS.copper;
  ctx.fillRect(0, 10, 420, 4);

  let y = 58;

  // Official Company Logo + Wordmark on Page 2
  const brandEndX = drawOfficialGeocoreBrand(ctx, MARGIN_X, y, 46, 29);

  setFont(ctx, 500, 14, true);
  ctx.fillStyle = COLORS.muted;
  const forCompany = input.company.trim()
    ? `  ·  ${input.company.trim().toUpperCase()}`
    : `  ·  ${c.docType}`;
  ctx.fillText(forCompany, brandEndX + 10, y + 12);

  setFont(ctx, 500, 14.5, true);
  ctx.fillStyle = COLORS.muted;
  const p2W = ctx.measureText(c.page2Label).width;
  ctx.fillText(c.page2Label, LOGICAL_W - MARGIN_X - p2W, y + 12);

  y += 62;
  ctx.fillStyle = COLORS.pine;
  ctx.fillRect(MARGIN_X, y, CONTENT_W, 3);
  y += 32;

  // 5. Cooperation Options (2 Tariffs side by side)
  setFont(ctx, 600, 23);
  ctx.fillStyle = COLORS.pine;
  ctx.fillText(c.sec4Title, MARGIN_X, y);
  y += 32;

  ctx.fillStyle = "#e1e6dc";
  ctx.fillRect(MARGIN_X, y, CONTENT_W, 2);
  y += 22;

  const colGap = 28;
  const cardW = (CONTENT_W - colGap) / 2;
  const cardH = 920;

  const drawTariffCard = (
    cx: number,
    badge: string,
    title: string,
    target: string,
    points: { bold: string; text: string }[],
    result: string,
    selected: boolean,
    isCopperBadge: boolean,
  ) => {
    ctx.fillStyle = selected ? "#ffffff" : "#fafbf8";
    ctx.fillRect(cx, y, cardW, cardH);
    ctx.strokeStyle = selected ? COLORS.copper : "#d5ddd0";
    ctx.lineWidth = selected ? 3.5 : 1.5;
    ctx.strokeRect(cx, y, cardW, cardH);

    // Top bar on selected tariff
    if (selected) {
      ctx.fillStyle = COLORS.copper;
      ctx.fillRect(cx, y, cardW, 6);
    }

    let ty = y + 28;
    const padX = cx + 26;
    const innerW = cardW - 52;

    // Badge
    setFont(ctx, 600, 13.5, true);
    const bW = ctx.measureText(badge).width + 24;
    ctx.fillStyle = isCopperBadge ? "#f7e7e0" : "#e3ebe4";
    ctx.fillRect(padX, ty, bW, 28);
    ctx.fillStyle = isCopperBadge ? "#9e3e1c" : COLORS.pine;
    ctx.fillText(badge, padX + 12, ty + 7);

    ty += 44;

    // Tariff Title
    setFont(ctx, 600, 24);
    ctx.fillStyle = COLORS.ink;
    ty = drawWrappedText(ctx, title, padX, ty, innerW, 31);
    ty += 10;

    // Target description
    setFont(ctx, 400, 17.5);
    ctx.fillStyle = "#526055";
    ty = drawWrappedText(ctx, target, padX, ty, innerW, 24);
    ty += 16;

    ctx.fillStyle = "#e1e6dc";
    ctx.fillRect(padX, ty, innerW, 1.5);
    ty += 20;

    // Bullet points
    for (const pt of points) {
      setFont(ctx, 700, 20);
      ctx.fillStyle = COLORS.copper;
      ctx.fillText("•", padX, ty);

      ty = drawBoldAndRegularParagraph(
        ctx,
        pt.bold,
        pt.text,
        padX + 22,
        ty,
        innerW - 22,
        17.5,
        25,
        COLORS.ink,
        "#2f3e36",
        false,
      );
      ty += 16;
    }

    // Outcome box anchored near bottom of card
    const outBoxH = 148;
    const outY = y + cardH - outBoxH - 24;
    ctx.fillStyle = "#f2f5ef";
    ctx.fillRect(padX, outY, innerW, outBoxH);
    ctx.fillStyle = COLORS.pine;
    ctx.fillRect(padX, outY, 5, outBoxH);

    setFont(ctx, 600, 17);
    ctx.fillStyle = COLORS.ink;
    drawWrappedText(ctx, result, padX + 18, outY + 18, innerW - 32, 24);
  };

  drawTariffCard(
    MARGIN_X,
    c.tariff1Badge,
    c.tariff1Title,
    c.tariff1Target,
    c.tariff1Points,
    c.tariff1Result,
    input.plan === "pilot" || input.plan === "both",
    false,
  );

  drawTariffCard(
    MARGIN_X + cardW + colGap,
    c.tariff2Badge,
    c.tariff2Title,
    c.tariff2Target,
    c.tariff2Points,
    c.tariff2Result,
    input.plan === "annual" || input.plan === "both",
    true,
  );

  y += cardH + 38;

  // 6. Call to Action Box (15-Minute Demo)
  const ctaH = 665;
  ctx.fillStyle = COLORS.pine;
  ctx.fillRect(MARGIN_X, y, CONTENT_W, ctaH);
  // Copper top border
  ctx.fillStyle = COLORS.copper;
  ctx.fillRect(MARGIN_X, y, CONTENT_W, 6);

  let cy = y + 34;
  const cPadX = MARGIN_X + 38;
  const cInnerW = CONTENT_W - 76;

  setFont(ctx, 600, 14.5, true);
  ctx.fillStyle = "#e49778";
  ctx.fillText(c.sec5Title.toUpperCase(), cPadX, cy);
  cy += 30;

  setFont(ctx, 600, 29);
  ctx.fillStyle = COLORS.white;
  cy = drawWrappedText(ctx, c.sec5Headline, cPadX, cy, cInnerW, 37);
  cy += 12;

  setFont(ctx, 400, 18.5);
  ctx.fillStyle = "#c6d2c7";
  cy = drawWrappedText(ctx, c.sec5Intro, cPadX, cy, cInnerW, 26);
  cy += 20;

  for (const b of c.sec5Bullets) {
    const lines = wrapLines(ctx, b, cInnerW - 56);
    const bH = Math.max(54, lines.length * 26 + 24);

    ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
    ctx.fillRect(cPadX, cy, cInnerW, bH);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.14)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cPadX, cy, cInnerW, bH);

    setFont(ctx, 700, 19);
    ctx.fillStyle = "#e49778";
    ctx.fillText("✓", cPadX + 18, cy + 14);

    setFont(ctx, 400, 18);
    ctx.fillStyle = "#eef2ec";
    let by = cy + 14;
    for (const ln of lines) {
      ctx.fillText(ln, cPadX + 48, by);
      by += 26;
    }

    cy += bH + 12;
  }

  cy += 12;
  setFont(ctx, 400, 17);
  ctx.fillStyle = "#c6d2c7";
  cy = drawWrappedText(ctx, c.sec5Footer, cPadX, cy, cInnerW, 24);
  cy += 18;

  // Contact buttons row at bottom of CTA
  ctx.fillStyle = COLORS.copper;
  ctx.fillRect(cPadX, cy, 480, 56);
  setFont(ctx, 600, 18);
  ctx.fillStyle = COLORS.white;
  ctx.fillText(`WhatsApp / Тел.: ${input.contactPhone}`, cPadX + 24, cy + 18);

  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.fillRect(cPadX + 500, cy, 450, 56);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(cPadX + 500, cy, 450, 56);
  setFont(ctx, 500, 18);
  ctx.fillStyle = COLORS.white;
  ctx.fillText(`Email: ${input.contactEmail}`, cPadX + 524, cy + 18);

  // Page 2 Footer
  const footerY = LOGICAL_H - 72;
  ctx.fillStyle = "#e1e6dc";
  ctx.fillRect(MARGIN_X, footerY - 16, CONTENT_W, 2);

  setFont(ctx, 500, 14.5, true);
  ctx.fillStyle = COLORS.muted;
  ctx.fillText(c.page2Label, MARGIN_X, footerY);

  const rightFoot = input.company.trim()
    ? `${input.company.trim()} · ${input.fullName.trim()} · ${input.phone.trim()}`
    : `GEOCORE.VISTA · ${input.contactEmail}`;
  const rfW = ctx.measureText(rightFoot).width;
  ctx.fillText(rightFoot, LOGICAL_W - MARGIN_X - rfW, footerY);

  return canvas;
}

function dataUrlToUint8Array(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(",")[1] || "";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Packs an array of high-resolution A4 images into a multi-page A4 PDF 1.4 binary.
 */
function buildMultiPageA4PdfFromJpegs(
  pages: { jpegBytes: Uint8Array; width: number; height: number }[],
): Blob {
  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  let offset = 0;

  const pushStr = (s: string) => {
    const arr = encoder.encode(s);
    chunks.push(arr);
    offset += arr.length;
  };

  const pushBytes = (arr: Uint8Array) => {
    chunks.push(arr);
    offset += arr.length;
  };

  const offsets: number[] = [0];

  const startObj = (id: number) => {
    offsets[id] = offset;
    pushStr(`${id} 0 obj\n`);
  };

  const endObj = () => {
    pushStr(`endobj\n`);
  };

  pushStr("%PDF-1.4\n%\xFF\xFF\xFF\xFF\n");

  // Object 1: Catalog
  startObj(1);
  pushStr("<< /Type /Catalog /Pages 2 0 R >>\n");
  endObj();

  const pageObjIds = pages.map((_, i) => 3 + i * 3);

  // Object 2: Pages
  startObj(2);
  pushStr(
    `<< /Type /Pages /Kids [${pageObjIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pages.length} >>\n`,
  );
  endObj();

  const a4PtW = 595.28;
  const a4PtH = 841.89;

  pages.forEach((p, i) => {
    const pageId = 3 + i * 3;
    const contentId = 4 + i * 3;
    const imgId = 5 + i * 3;
    const imgName = `/Im${i + 1}`;

    startObj(pageId);
    pushStr(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${a4PtW} ${a4PtH}] /Contents ${contentId} 0 R /Resources << /XObject << ${imgName} ${imgId} 0 R >> >> >>\n`,
    );
    endObj();

    const contentCmd = `q\n${a4PtW} 0 0 ${a4PtH} 0 0 cm\n${imgName} Do\nQ\n`;
    const contentBytes = encoder.encode(contentCmd);
    startObj(contentId);
    pushStr(`<< /Length ${contentBytes.length} >>\nstream\n`);
    pushBytes(contentBytes);
    pushStr(`\nendstream\n`);
    endObj();

    startObj(imgId);
    pushStr(
      `<< /Type /XObject /Subtype /Image /Width ${p.width} /Height ${p.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Interpolate true /Length ${p.jpegBytes.length} >>\nstream\n`,
    );
    pushBytes(p.jpegBytes);
    pushStr(`\nendstream\n`);
    endObj();
  });

  const totalObjs = 2 + pages.length * 3;
  const xrefOffset = offset;
  pushStr(`xref\n0 ${totalObjs + 1}\n`);
  pushStr(`0000000000 65535 f \n`);
  for (let id = 1; id <= totalObjs; id++) {
    const offStr = String(offsets[id] || 0).padStart(10, "0");
    pushStr(`${offStr} 00000 n \n`);
  }
  pushStr(
    `trailer\n<< /Size ${totalObjs + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`,
  );

  return new Blob(chunks, { type: "application/pdf" });
}

export async function downloadCommercialProposalPdf(
  input: ProposalPdfInput,
): Promise<void> {
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // continue
    }
  }

  const canvas1 = renderPage1(input);
  const canvas2 = renderPage2(input);

  // Maximum 1.0 quality at 3508 x 4961 px (425 DPI print master resolution)
  const jpeg1 = dataUrlToUint8Array(canvas1.toDataURL("image/jpeg", 1.0));
  const jpeg2 = dataUrlToUint8Array(canvas2.toDataURL("image/jpeg", 1.0));

  const pdfBlob = buildMultiPageA4PdfFromJpegs([
    { jpegBytes: jpeg1, width: canvas1.width, height: canvas1.height },
    { jpegBytes: jpeg2, width: canvas2.width, height: canvas2.height },
  ]);

  const safeCompany = input.company
    .trim()
    .replace(/[^a-zA-Zа-яА-ЯёЁәіңғүұқөһӘІҢҒҮҰҚӨҺ0-9_-]+/g, "_")
    .replace(/^_+|_+$/g, "");

  const fileName = safeCompany
    ? `Geocore_Vista_KP_${safeCompany}.pdf`
    : `Geocore_Vista_KP_2026.pdf`;

  const url = URL.createObjectURL(pdfBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 1500);
}
