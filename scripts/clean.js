/**
 * This script removes the contents of the specified directories, not the directories themselves.
 * If a directory does not exist, it logs that there's nothing to clean.
 */

import { promises as fs } from "fs";
import { join, resolve } from "path";

async function cleanDir(dir) {
  const dirPath = resolve(dir);
  try {
    await fs.access(dirPath);

    const files = await fs.readdir(dirPath);

    await Promise.all(
      files.map((file) =>
        fs.rm(join(dirPath, file), { recursive: true, force: true })
      )
    );
    console.log(`Cleaned contents of "${dir}".`);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`Nothing to clean, because "${dir}" does not exist.`);
    } else {
      console.error(`Error cleaning "${dir}":`, err);
    }
  }
}

async function clean() {
  console.log(`Starting cleanup...`);
  await cleanDir("dist");
  await cleanDir("bin");
  console.log(`Cleanup complete.`);
}

let ms = Date.now();
clean()
  .catch((err) => {
    console.error("Cleanup failed:", err);
    process.exit(1);
  })
  .finally(() => {
    ms = Date.now() - ms;
    console.log(`Took: ${ms}ms.\n\n`);
  });
