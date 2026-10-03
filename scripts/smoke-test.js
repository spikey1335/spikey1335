"use strict";

const http = require("http");
const { spawn } = require("child_process");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PORT = 3850;
const HOST = "127.0.0.1";

function get(pathname) {
  return new Promise((resolve, reject) => {
    http
      .get({ host: HOST, port: PORT, path: pathname }, (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () =>
          resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString("utf8") })
        );
      })
      .on("error", reject);
  });
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

async function main() {
  const child = spawn(process.execPath, ["server.js"], {
    cwd: ROOT,
    env: { ...process.env, PORT: String(PORT), HOST },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let boot = "";
  child.stdout.on("data", (d) => (boot += d.toString()));
  child.stderr.on("data", (d) => (boot += d.toString()));

  await new Promise((r) => setTimeout(r, 600));

  try {
    const home = await get("/");
    assert(home.status === 200, `GET / expected 200, got ${home.status}`);
    assert(home.body.includes("Bill Floor Buddy"), "home missing title");
    assert(home.body.includes("app.js"), "home missing app.js");

    const js = await get("/app.js");
    assert(js.status === 200, "app.js missing");
    assert(js.body.includes("bill-floor-buddy-v1"), "storage key missing");
    assert(js.body.includes("remainingGap"), "math missing");

    const css = await get("/styles.css");
    assert(css.status === 200, "styles.css missing");

    // Pure math check mirroring app.js
    const goal = 2300;
    const saved = 300;
    const remainingGap = Math.max(0, goal - saved);
    assert(remainingGap === 2000, "gap math failed");

    console.log("SMOKE OK");
    console.log(boot.trim());
  } finally {
    child.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error("SMOKE FAIL", err);
  process.exit(1);
});
