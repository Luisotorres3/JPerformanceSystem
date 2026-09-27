import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { chromium } from "playwright";

const require = createRequire(import.meta.url);
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:4173";
const browser = await chromium.launch({
  channel: process.env.BROWSER_CHANNEL || (process.platform === "win32" ? "msedge" : undefined),
});
const routes = [
  "/",
  "/planes",
  "/planes?tipo=conjunto",
  "/retos",
  "/retos?tipo=fuerza",
  "/retos?tipo=eventos",
  "/futbolistas",
  "/contacto",
  "/checkout?plan=Running",
  "/privacidad",
  "/cookies",
  "/aviso-legal",
  "/condiciones",
  "/no-existe",
];
const results = [];
await mkdir("qa.local/release", { recursive: true });
try {
  const page = await browser.newPage({ reducedMotion: "reduce" });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => localStorage.setItem("cookieConsent", "rejected"));
  // This suite must never send real messages or analytics.
  await page.route(/api\.emailjs\.com|google-analytics\.com|googletagmanager\.com/, (route) =>
    route.abort()
  );
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(`${base}${route}`);
      await page.locator("h1").waitFor();
      await page.evaluate(async () => {
        await document.fonts.ready;
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 20));
        }
        scrollTo(0, 0);
      });
      await page.waitForTimeout(150);
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
        `${width} ${route}: overflow`
      );
      assert.equal(await page.locator("img:not([alt])").count(), 0);
      const brokenImages = await page
        .locator("img")
        .evaluateAll((images) =>
          images.filter((img) => img.complete && !img.naturalWidth).map((img) => img.src)
        );
      assert.deepEqual(brokenImages, [], `${route}: broken images`);
      if (width === 1440 || width === 390) {
        await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
        const violations = await page.evaluate(async () =>
          (
            await window.axe.run(document, {
              runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
            })
          ).violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.failureSummary) }))
        );
        assert.deepEqual(violations, [], `${width} ${route}: accessibility`);
      }
      if (route === "/" || route === "/planes") {
        await page.screenshot({
          path: `qa.local/release/${width}-${route === "/" ? "home" : "plans"}.png`,
          fullPage: true,
        });
      }
      results.push({ width, route, passed: true });
    }
    for (const joint of [false, true]) {
      await page.goto(`${base}/planes${joint ? "?tipo=conjunto" : ""}`);
      const picker = page.getByLabel(joint ? "Tu pack" : "Tu entrenamiento", { exact: true });
      await picker.waitFor();
      const titles = await picker
        .locator("option")
        .evaluateAll((nodes) => nodes.map((n) => n.value));
      assert.equal(titles.length, joint ? 3 : 4);
      for (const period of ["mensual", "trimestral", "semestral"]) {
        await page.getByRole("button", { name: new RegExp(period, "i") }).click();
        for (const title of titles) {
          await picker.selectOption(title);
          assert.equal(await page.locator(".plan-summary h3").innerText(), title);
          const target = new URL(
            await page.locator(".plan-inclusions > a").getAttribute("href"),
            base
          );
          assert.equal(target.searchParams.get("plan"), title);
          assert.equal(target.searchParams.get("periodo"), period);
          assert.equal(await page.locator(".welcome-gift s").count(), period === "mensual" ? 1 : 0);
          assert.equal(
            await page.locator(".welcome-gift-option").count(),
            period === "mensual" ? 0 : 1
          );
          assert.equal(await page.locator(".welcome-gift-period").count(), 0);
          const gift = await page.locator(".welcome-gift").innerText();
          if (period === "trimestral") {
            assert.match(gift, /500 g/);
            assert.doesNotMatch(gift, /2 kg|1 kg/);
          }
          if (period === "semestral") {
            assert.match(gift, /2 kg/);
            assert.match(gift, /1 kg/);
            assert.doesNotMatch(gift, /500 g/);
          }
        }
      }
      const total = await page.locator(".plan-detail-price strong").innerText();
      await page.getByRole("link", { name: "Reservar entrevista", exact: true }).click();
      await page.locator('[data-testid="checkout-total"]').waitFor();
      assert.equal(await page.locator('[data-testid="checkout-total"]').innerText(), total);
    }
    console.log(`PASS ${width}: routes, accessibility, plans, gifts and checkout`);
  }
  if (existsSync("dist/v1/index.html")) {
    for (const route of ["/v1/", "/v1/#/planes", "/v1/#/contacto"]) {
      await page.goto(`${base}${route}`);
      await page
        .locator(route === "/v1/" ? "h2" : "h1")
        .first()
        .waitFor();
      assert((await page.locator("#root").innerText()).length > 100);
      await page.waitForTimeout(300);
      const broken = await page
        .locator("img")
        .evaluateAll((nodes) =>
          nodes.filter((n) => n.complete && !n.naturalWidth).map((n) => n.src)
        );
      assert.deepEqual(broken, [], `V1 assets: ${route}`);
      assert.equal(
        await page.locator('meta[name="robots"]').getAttribute("content"),
        "noindex,nofollow"
      );
    }
    console.log("PASS V1 preview: home, plans, contact and assets");
  }
  assert.deepEqual(errors, []);
  const metadata = JSON.parse(await readFile("src/data/seo.json", "utf8"));
  const crawler = await browser.newPage({ javaScriptEnabled: false });
  for (const route of Object.keys(metadata)) {
    const html = await readFile(`dist${route === "/" ? "" : route}/index.html`, "utf8");
    assert(html.includes(metadata[route].title), `Missing static title: ${route}`);
    await crawler.setContent(html);
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
      assert.equal(await crawler.locator(selector).getAttribute("content"), metadata[route].title);
    }
    for (const selector of [
      'meta[name="description"]',
      'meta[property="og:description"]',
      'meta[name="twitter:description"]',
    ]) {
      assert.equal(
        await crawler.locator(selector).getAttribute("content"),
        metadata[route].description
      );
    }
    for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
      assert.equal(
        await crawler.locator(selector).getAttribute("content"),
        "https://jperformancesystem.es/media/jps-social-v2-20260927.jpg"
      );
    }
    assert.equal(
      await crawler.locator('meta[property="og:image:width"]').getAttribute("content"),
      "1200"
    );
    assert.equal(
      await crawler.locator('meta[property="og:image:height"]').getAttribute("content"),
      "630"
    );
  }
  const { default: sharp } = await import("sharp");
  const socialImage = await sharp("dist/media/jps-social-v2-20260927.jpg").metadata();
  assert.equal(socialImage.width, 1200);
  assert.equal(socialImage.height, 630);
  assert.equal(socialImage.format, "jpeg");
  await crawler.close();
  await writeFile("qa.local/release/results.json", JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
