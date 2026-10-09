const { chromium } = require("playwright-core");
const fs = require("node:fs/promises");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

// Read-only source application, fresh browser, public built-in demo only.
// No credentials, no source edits, no production data, all remote APIs blocked.
(async () => {
  const source = process.env.GEOLOG_SOURCE || "/home/ubuntu/GEOLOG-STUDIO";
  const origin = process.env.GEOLOG_CAPTURE_URL || "http://127.0.0.1:4173";
  const output = path.resolve("public/examples");
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  const context = await browser.newContext({
    viewport: { width: 1680, height: 1100 },
    deviceScaleFactor: 1,
    acceptDownloads: true,
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await context.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (url.origin !== origin && !["data:", "blob:"].includes(url.protocol))
      return route.abort();
    if (url.pathname.startsWith("/api/")) return route.abort();
    return route.continue();
  });
  await page.goto(origin);
  await page.waitForFunction(
    () => window.GeoLogData?.getHolesFull?.().length >= 10,
  );
  await page.evaluate(() => {
    window.GeoLogSync.setReady(false);
    window.GeoLogRBAC.getCurrentUser = () => ({
      uid: "portfolio-demo",
      name: "Демонстрация",
      role: "GEOLOGIST",
      status: "ACTIVE",
      companyId: "DEFAULT",
    });
    window.GeoLogRBAC.canUserEditProject = () => false;
    window.GeoLogRBAC.filterAccessibleHoles = (rows) =>
      rows.filter((row) => /^HOLE-SHOWCASE-\d{2}$/.test(row.id));
    window.GeoLogRBAC.filterAccessibleProjects = (names) =>
      names.filter((name) => /Бурабай/.test(name));
  });
  // Omit the login overlay in this isolated demo capture, not the application interface.
  await page.addStyleTag({
    content: "#geologWelcomeGate, .bottom-nav { display:none!important }",
  });
  const hole = await page.evaluate(() =>
    window.GeoLogData.getHolesFull().find((h) => h.id === "HOLE-SHOWCASE-01"),
  );
  if (!hole) throw new Error("Built-in demo missing");
  const screenshot = async (name, selector = "#pageContent") => {
    await page.waitForTimeout(250);
    const el = page.locator(selector);
    await el.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollTo(0, 0));
    const bounds = await el.boundingBox();
    await page.screenshot({
      path: path.join(output, name + ".png"),
      clip: {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: Math.min(bounds.height, 880),
      },
    });
    console.log("Captured", name);
  };
  await page.evaluate(async (id) => {
    await window.GeoLogData.openHole(id, "registry");
  }, hole.id);
  await screenshot("projects-ui");
  await page.evaluate(async (id) => {
    await window.GeoLogData.openHole(id, "intervals");
  }, hole.id);
  await screenshot("journal-ui");
  await page.evaluate(async (id) => {
    await window.GeoLogData.openHole(id, "sampling");
  }, hole.id);
  await screenshot("sampling-ui");
  await page.evaluate(async (id) => {
    await window.GeoLogData.openHole(id, "map");
  }, hole.id);
  await page.locator('[data-map-mode="section"]').click();
  const profile = page.locator("[data-section-pick-profile]").first();
  await profile.waitFor();
  console.log(
    "Profile",
    await profile.getAttribute("data-section-pick-profile"),
  );
  await profile.click();
  await page.locator("#sectionSvgStage svg").last().waitFor();
  await screenshot("section-ui");
  const section = await page.evaluate(() => {
    const result = buildBoreholeCrossSectionSvg({
      width: 2200,
      height: 1320,
      renderWidth: 4400,
      renderHeight: 2640,
      exportMode: true,
    });
    return {
      svg: result.svgHtml,
      holes: result.holes.length,
      legend: result.legend.length,
    };
  });
  if (!section.svg || section.holes < 2 || section.legend < 2)
    throw new Error("Incomplete original section export");
  await fs.writeFile(path.join(output, "geocore-section.svg"), section.svg);
  console.log(
    "Original SVG export",
    section.holes,
    "holes;",
    section.legend,
    "legend items",
  );
  await page.evaluate(async (id) => {
    await window.GeoLogData.openHole(id, "acts");
    window.GeoLogActs.resetShowcaseActsRecords();
    window.GeoLogActs.selectActRecordByBhid("BUR-26-001");
    document.getElementById("pageContent").innerHTML =
      window.GeoLogActs.renderPage();
  }, hole.id);
  await page.locator('[data-acts-doc="act1"]').click();
  await screenshot("acts-ui");
  const actOne = page.locator(".act-a4-page").first();
  await actOne.screenshot({ path: path.join(output, "act-spudding.png") });
  await page.locator('[data-acts-doc="act2"]').click();
  await page
    .locator(".act-a4-page")
    .first()
    .screenshot({ path: path.join(output, "act-depth-check.png") });
  await page.locator('[data-acts-doc="act3"]').click();
  await page
    .locator(".act-a4-page")
    .first()
    .screenshot({ path: path.join(output, "act-closure.png") });
  await page.locator('[data-acts-doc="ALL"]').click();
  // The real application exporter uses original A4 pages, not recreated templates.
  const downloadPromise = page.waitForEvent("download", { timeout: 90000 });
  await page.evaluate(async (id) => {
    const row = window.GeoLogData.getHolesFull().find((h) => h.id === id);
    await window.GeoLogActs.downloadHoleActPdf(row, "ALL");
  }, hole.id);
  const download = await downloadPromise;
  await download.saveAs(path.join(output, "geocore-demo-acts.pdf"));
  console.log("Original PDF downloaded:", download.suggestedFilename());
  const provenance = {
    sourceRepository: "dangaraisov01-jpg/GEOLOG-STUDIO",
    sourceCommit: execFileSync("git", ["-C", source, "rev-parse", "HEAD"], {
      encoding: "utf8",
    }).trim(),
    dataset:
      "Built-in public showcase: Бурабай-Жалгызагаш / BUR-26-001 and profile selected by original UI",
    capture:
      "Fresh isolated guest browser; remote API calls blocked; login overlay omitted; local read-only demo role fixture only; no source application edits",
    sectionExport: {
      renderer: "buildBoreholeCrossSectionSvg(exportMode:true)",
      holes: section.holes,
      legendItems: section.legend,
    },
    actExport:
      "GeoLogActs.downloadHoleActPdf(publicDemoHole, ALL), original A4 templates",
    runtimeErrors: errors,
  };
  await fs.writeFile(
    path.join(output, "provenance.json"),
    JSON.stringify(provenance, null, 2) + "\n",
  );
  await browser.close();
  if (errors.length) throw new Error(errors.join("; "));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
