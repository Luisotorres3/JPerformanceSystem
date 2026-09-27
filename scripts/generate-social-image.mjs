import { readFile } from "node:fs/promises";
import { chromium } from "playwright";

// Render a share card from the actual brand assets, without modifying the originals.
const portrait = (await readFile("src/assets/juan-personal.webp")).toString("base64");
const font = (await readFile("public/fonts/anton-latin.woff2")).toString("base64");
const browser = await chromium.launch({
  channel: process.env.BROWSER_CHANNEL || (process.platform === "win32" ? "msedge" : undefined),
});
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<!doctype html><html lang="es"><head><meta charset="utf-8"><style>
    @font-face { font-family: Anton; src: url(data:font/woff2;base64,${font}) format('woff2'); }
    * { box-sizing: border-box; }
    body { margin: 0; background: #fff; color: #0a2747; font-family: Arial, sans-serif; }
    main { position: relative; height: 630px; padding: 52px; overflow: hidden; border-bottom: 12px solid #f3bf31; }
    .brand { margin: 0 0 62px; font-size: 26px; font-weight: 700; }
    h1 { position: relative; z-index: 1; margin: 0; font: 70px/1.2 Anton, sans-serif; letter-spacing: 0; }
    h1 span { color: #936500; }
    .name { margin: 30px 0 12px; font-size: 25px; font-weight: 700; }
    .services { margin: 0; font-size: 22px; color: #44576a; }
    .url { position: absolute; bottom: 36px; left: 52px; font-size: 21px; }
    img { position: absolute; width: 535px; height: 550px; object-fit: contain; object-position: bottom; right: 8px; bottom: 0; }
  </style></head><body><main>
    <p class="brand">J PERFORMANCE SYSTEM</p>
    <h1>EMPIEZA AHORA<br><span>EMPIEZA DE VERDAD</span></h1>
    <p class="name">Juan Pasquau · Entrenador</p>
    <p class="services">Running · Fuerza · Oposiciones</p>
    <p class="url">jperformancesystem.es</p>
    <img src="data:image/webp;base64,${portrait}" alt="Juan Pasquau">
  </main></body></html>`);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((image) => image.decode()));
  });
  await page.screenshot({
    path: "public/media/jps-social-v2-20260927.jpg",
    type: "jpeg",
    quality: 90,
  });
} finally {
  await browser.close();
}
