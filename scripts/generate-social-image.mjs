import { readFile } from "node:fs/promises";
import { chromium } from "playwright";

// Use the existing logo framing so the artwork stays legible in square thumbnails.
const logo = (await readFile("src/assets/jps-white.png")).toString("base64");
const browser = await chromium.launch({
  channel: process.env.BROWSER_CHANNEL || (process.platform === "win32" ? "msedge" : undefined),
});
try {
  const page = await browser.newPage({
    viewport: { width: 1024, height: 1024 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<!doctype html><html lang="es"><head><meta charset="utf-8"><style>
    * { box-sizing: border-box; }
    body { margin: 0; background: #0c2945; width: 1024px; height: 1024px; display: grid; place-items: center; }
    .mark { position: relative; width: 860px; height: 645px; overflow: hidden; }
    img { position: absolute; width: 178.6047%; height: auto; left: -43.0233%; top: -28.125%; }
  </style></head><body><div class="mark">
    <img src="data:image/png;base64,${logo}" alt="Logo JPS">
  </div></body></html>`);
  await page.locator("img").evaluate((image) => image.decode());
  await page.screenshot({
    path: "public/media/jps-social-v4-logo.png",
    type: "png",
  });
} finally {
  await browser.close();
}
