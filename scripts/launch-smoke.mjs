import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:4173";
await mkdir("qa.local", { recursive: true });
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || (process.platform === "win32" ? "msedge" : undefined), headless: true });
const context = await browser.newContext({ reducedMotion: "reduce" });
const page = await context.newPage();
const errors = [];
page.on("pageerror", error => errors.push(error.message));
await page.addInitScript(() => localStorage.setItem("cookieConsent", "rejected"));
const paths = ["/", "/planes/", "/retos/", "/clientes/", "/colaboraciones/", "/contacto/", "/privacidad/", "/cookies/", "/aviso-legal/", "/condiciones/", "/checkout/?plan=Running", "/no-existe"];
const links = new Set();
const timings = [];
try {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of paths) {
      await page.goto(`${base}${path}`);
      await page.locator("h1").waitFor();
      await page.waitForTimeout(180);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${width} ${path}: horizontal overflow`);
      assert.equal(await page.locator("img:not([alt])").count(), 0, `${path}: missing alt`);
      if (path === "/no-existe") assert.equal(await page.locator('meta[name="robots"]').getAttribute("content"), "noindex,follow");
      const local = await page.locator("a[href]").evaluateAll(nodes => nodes.map(n => n.href).filter(href => href.startsWith(location.origin)));
      for (const link of local) links.add(link);
      if (width === 1440) timings.push({ path, ...await page.evaluate(() => { const n = performance.getEntriesByType("navigation")[0]; return { domContentLoadedMs: Math.round(n.domContentLoadedEventEnd), transferBytes: performance.getEntriesByType("resource").reduce((sum, r) => sum + r.transferSize, 0) }; }) });
    }
  }
  for (const link of links) {
    const url = new URL(link);
    assert(paths.some(path => new URL(path, base).pathname.replace(/\/$/, "") === url.pathname.replace(/\/$/, "")) || ["/blog", "/reviews"].includes(url.pathname), `Unknown internal route: ${link}`);
  }
  for (const legacy of ["/futbolistas/", "/reviews/", "/#/futbolistas"]) {
    await page.goto(`${base}${legacy}`);
    await page.waitForURL(/\/clientes\/?$/);
    await page.getByRole("heading", { name: "Clientes", exact: true }).waitFor();
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), "https://jperformancesystem.es/clientes/");
  }
  await page.goto(`${base}/#/contacto?reto=banca-100kg`);
  await page.locator("#message").waitFor();
  assert.match(page.url(), /\/contacto\?reto=banca-100kg$/);
  assert.match(await page.locator("#message").inputValue(), /100 kg/);
  assert.equal(await page.locator("#cookies").count(), 0);
  let sends = 0;
  await page.route("https://api.emailjs.com/**", async route => {
    sends++;
    assert.match(route.request().postDataJSON().template_params.message, /100 kg/);
    await route.fulfill({ status: 200, contentType: "text/plain", body: "OK" });
  });
  await page.locator("#name").fill("Prueba QA");
  await page.locator("#email").fill("prueba@example.com");
  await page.locator("#message").fill("Quiero preparar mi objetivo de fuerza.");
  await page.locator("#privacy").click();
  await page.locator("#phone").fill("abc");
  await page.getByRole("button", { name: "Enviar solicitud", exact: true }).click();
  await page.locator(".form-error").waitFor();
  assert.equal(sends, 0);
  await page.locator("#phone").fill("600123456");
  await page.locator("#website").evaluate(node => { const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set; setter.call(node, "bot.test"); node.dispatchEvent(new Event("input", { bubbles: true })); });
  await page.getByRole("button", { name: "Enviar solicitud", exact: true }).click();
  assert.equal(sends, 0);
  await page.locator("#website").evaluate(node => { const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set; setter.call(node, ""); node.dispatchEvent(new Event("input", { bubbles: true })); });
  await page.getByRole("button", { name: "Enviar solicitud", exact: true }).click();
  await page.waitForTimeout(500);
  assert.equal(sends, 1);
  assert.deepEqual(errors, []);
  await writeFile("qa.local/launch-results.json", JSON.stringify({ checkedViews: paths.length * 3, internalLinks: links.size, timings, errors, simulatedEmailSends: sends }, null, 2));
  console.log(`PASS: ${paths.length * 3} responsive views, ${links.size} internal links, legacy URLs, alt attributes, validation, honeypot, simulated email.`);
} finally { await browser.close(); }
