/**
 * This script renames files in the 'bin' directory to include architecture and the version number from package.json.
 */

import { promises as fs } from "fs";
import path from "path";
import packageFile from "../package.json" with { type: "json" };

async function renameFile(oldPath, newPath) {
  try {
    if (!oldPath || !newPath) {
      throw new Error("Both oldPath and newPath must be provided.");
    }

    const oldFilePath = path.normalize(oldPath);
    const newFilePath = path.normalize(newPath);

    await fs.rename(oldFilePath, newFilePath);
    console.log(`Renamed "${oldFilePath}" to "${newFilePath}"`);
  } catch (error) {
    console.error("Error renaming file:", error);
  }
}

renameFile("bin/coinflip-linux", `bin/coinflip-${packageFile.version}-linux-x64`);
renameFile("bin/coinflip-win.exe", `bin/coinflip-${packageFile.version}-win-x64.exe`);
renameFile("bin/coinflip-macos", `bin/coinflip-${packageFile.version}-macos-x64`);
