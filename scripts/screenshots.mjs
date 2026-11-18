// Headless screenshots (desktop + mobile, light + dark) of a running copy of the site.
// Uses puppeteer-core with a system Chrome:   npm i --no-save puppeteer-core
//   node scripts/screenshots.mjs [baseUrl] [outDir]
import puppeteer from "puppeteer-core";
import fs from "node:fs";

const base = process.argv[2] ?? "http://localhost:4173/debt-angel-site/";
const out = process.argv[3] ?? "screenshots";
const chrome = process.env.CHROME ?? "/usr/bin/google-chrome";
fs.mkdirSync(out, { recursive: true });

const views = [
  ["desktop", { width: 1440, height: 900, deviceScaleFactor: 1 }],
  ["mobile", { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }],
];
const pages = [["home", ""], ["privacy", "privacy/"], ["terms", "terms/"]];

const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ["--no-sandbox"] });
for (const [vname, vp] of views) {
  for (const theme of ["light", "dark"]) {
    for (const [pname, path] of pages) {
      if (pname !== "home" && vname === "mobile" && theme === "dark") continue;
      const page = await browser.newPage();
      await page.setViewport(vp);
      await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: theme }]);
      await page.goto(base + path, { waitUntil: "networkidle0" });
      // scroll through the page so the scroll-triggered animations play, then wait for them to finish
      const h = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < h; y += 500) { await page.evaluate((v) => window.scrollTo(0, v), y); await new Promise((r) => setTimeout(r, 120)); }
      await new Promise((r) => setTimeout(r, 2800));
      await page.evaluate(() => window.scrollTo(0, 0));
      const file = `${out}/${pname}-${vname}-${theme}.png`;
      await page.screenshot({ path: file, fullPage: true });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      console.log(file, overflow > 0 ? `HORIZONTAL OVERFLOW ${overflow}px` : "ok");
      await page.close();
    }
  }
}
await browser.close();
