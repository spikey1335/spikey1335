"use strict";
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const OUT = path.join(__dirname, "..", "demo-assets");
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome-stable",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto("http://127.0.0.1:3847", { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });

  await page.screenshot({ path: path.join(OUT, "01-empty.png"), fullPage: true });

  await page.fill("#saved-input", "350");
  await page.click("#goal-form button[type=submit]");
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, "02-saved-updated.png"), fullPage: true });

  const bills = [
    ["Rent", "900"],
    ["Utilities", "180"],
    ["Groceries buffer", "400"],
  ];
  for (const [name, amount] of bills) {
    await page.fill("#bill-name", name);
    await page.fill("#bill-amount", amount);
    await page.click("#bill-form button[type=submit]");
    await page.waitForTimeout(250);
  }
  await page.screenshot({ path: path.join(OUT, "03-bills-added.png"), fullPage: true });

  // Highlight daily needed by scrolling to hero
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(OUT, "04-hero-focus.png"), fullPage: false });

  await browser.close();
  console.log("screenshots ok", fs.readdirSync(OUT).join(", "));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
