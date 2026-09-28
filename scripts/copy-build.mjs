import fs from "node:fs";
import path from "node:path";

const src = path.resolve(process.cwd(), "artifacts/dashboard/dist/public");
const distDst = path.resolve(process.cwd(), "dist");
const publicDst = path.resolve(process.cwd(), "public");

if (fs.existsSync(src)) {
  fs.mkdirSync(distDst, { recursive: true });
  fs.cpSync(src, distDst, { recursive: true });

  fs.mkdirSync(publicDst, { recursive: true });
  fs.cpSync(src, publicDst, { recursive: true });

  console.log(`[Deploy Ready] Successfully copied dashboard build to ./public and ./dist`);
} else {
  console.warn(`[Warning] Source directory not found: ${src}`);
}
