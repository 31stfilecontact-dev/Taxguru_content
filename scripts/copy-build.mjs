import fs from "node:fs";
import path from "node:path";

const candidates = [
  path.resolve(process.cwd(), "dist"),
  path.resolve(process.cwd(), "artifacts/dashboard/dist"),
  path.resolve(process.cwd(), "artifacts/dashboard/dist/public"),
  path.resolve(process.cwd(), "public"),
];

// Find a built directory that contains index.html
let validSource = null;
for (const cand of candidates) {
  if (fs.existsSync(path.join(cand, "index.html"))) {
    validSource = cand;
    break;
  }
}

if (!validSource) {
  console.warn("[Deploy Warning] Could not find a build directory containing index.html");
} else {
  const targets = [
    path.resolve(process.cwd(), "dist"),
    path.resolve(process.cwd(), "public"),
    path.resolve(process.cwd(), "artifacts/dashboard/dist"),
    path.resolve(process.cwd(), "artifacts/dashboard/dist/public"),
  ];

  for (const target of targets) {
    if (target !== validSource) {
      fs.mkdirSync(target, { recursive: true });
      fs.cpSync(validSource, target, { recursive: true });
    }
  }

  console.log(`[Deploy Ready] Synchronized production build from ${validSource} across all Vercel output targets: ./dist, ./public, ./artifacts/dashboard/dist`);
}
