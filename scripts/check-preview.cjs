const { chromium } = require("playwright-core");
const assert = require("node:assert/strict");

(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  const failures = [];
  for (const width of [1440, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 980 } });
    page.on("pageerror", (error) => failures.push(error.message));
    await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator("h1").count(), 1);
    const image = await page
      .locator(".hero-art img")
      .evaluate((image) => image.complete && image.naturalWidth > 0);
    assert.ok(image);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      ),
      false,
      `Horizontal overflow at ${width}`,
    );
    await page.screenshot({ path: `/tmp/portfolio-${width}.png` });
    for (let i = 0; i < 5; i++) {
      await page.locator(`#tab-${i}`).click();
      await page.locator(`#panel-${i}`).waitFor();
      assert.equal(
        await page.locator(`[role=tab][aria-selected=true]`).count(),
        1,
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        ),
        false,
        `Overflow at ${width} tab ${i}`,
      );
    }
    const resultButtons = page.locator(".result-selectors button");
    for (let i = 0; i < 6; i++) {
      await resultButtons.nth(i).click();
      await page
        .locator(".result-preview img")
        .first()
        .scrollIntoViewIfNeeded();
      await page.waitForFunction(() => {
        const img = document.querySelector(".result-preview img");
        return img.complete && img.naturalWidth > 0;
      });
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        ),
        false,
        `Results overflow ${width}/${i}`,
      );
    }
    await page.locator(".result-preview .actual-image-button").click();
    await page.locator(".result-preview dialog[open]").waitFor();
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("dialog[open]").count(), 0);
    await resultButtons.nth(0).click();
    if (width === 1440)
      await page
        .locator(".real-results")
        .screenshot({ path: "/tmp/real-results-site.png" });
    if (width === 390) {
      await resultButtons.nth(1).click();
      await page
        .locator(".real-results")
        .screenshot({ path: "/tmp/real-results-mobile.png" });
    }
    await page.locator("#tab-2").focus();
    await page.keyboard.press("ArrowRight");
    assert.equal(
      await page.locator("#tab-3").getAttribute("aria-selected"),
      "true",
    );
    await page.locator("#tab-0").click();
    if (width === 1440)
      await page
        .locator(".product-section")
        .screenshot({ path: "/tmp/portfolio-product.png" });
    await page.locator("#faq summary").first().click();
    assert.equal(
      await page.locator("#faq details").first().getAttribute("open"),
      "",
    );
    const invalid = await page
      .locator('a[href^="#"]')
      .evaluateAll((anchors) =>
        anchors
          .map((a) => a.getAttribute("href"))
          .filter(
            (href) => href !== "#" && !document.getElementById(href.slice(1)),
          ),
      );
    assert.deepEqual(invalid, []);
    if (width < 800) {
      await page.locator(".menu-toggle").click();
      await page.locator(".nav-open").waitFor();
      await page.locator(".nav-open a").first().click();
      assert.equal(
        await page.locator(".menu-toggle").getAttribute("aria-expanded"),
        "false",
      );
    }
    console.log(
      `PASS ${width}px: layout, hero, tabs, real results, image viewer, keyboard, FAQ, links, mobile menu`,
    );
    await page.close();
  }
  await browser.close();
  assert.deepEqual(failures, []);
  console.log("No runtime errors. No Firebase/production writes.");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
