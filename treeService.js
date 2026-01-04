import fs from "fs-extra";
import path from "path";
import crypto from "crypto";

const IGNORE = new Set([
  ".git",
  "node_modules",
  ".DS_Store",
  ".next",
  "dist",
  "build"
]);

const MAX_DEPTH = 14;
const MAX_FILES = 25000;

export async function buildTree(root) {
  const rootName = path.basename(root);

  let fileCount = 0;
  let dirCount = 0;
  let maxDepth = 0;
  let truncated = false;

  const visited = new Set();
  const extensionStats = {};
  const sizeBuckets = {
    tiny: 0,
    small: 0,
    medium: 0,
    large: 0
  };

  async function walk(currentPath, depth) {
    if (fileCount > MAX_FILES) {
      truncated = true;
      return [];
    }

    maxDepth = Math.max(maxDepth, depth);

    if (depth > MAX_DEPTH) {
      truncated = true;
      return [];
    }

    let entries;
    try {
      entries = await fs.readdir(currentPath, { withFileTypes: true });
    } catch {
      return [];
    }

    const children = [];

    for (const entry of entries) {
      if (IGNORE.has(entry.name)) continue;

      const fullPath = path.join(currentPath, entry.name);

      let stat;
      try {
        stat = await fs.lstat(fullPath);
      } catch {
        continue;
      }

      if (stat.isSymbolicLink()) {
        children.push({
          type: "symlink",
          name: entry.name,
          hash: hash(entry.name)
        });
        continue;
      }

      if (entry.isDirectory()) {
        if (visited.has(fullPath)) continue;
        visited.add(fullPath);
        dirCount++;

        const dirNode = {
          type: "dir",
          name: entry.name,
          children: await walk(fullPath, depth + 1)
        };

        children.push(dirNode);
        continue;
      }

      fileCount++;

      const ext = path.extname(entry.name) || "none";
      extensionStats[ext] = (extensionStats[ext] || 0) + 1;

      if (stat.size < 1024) sizeBuckets.tiny++;
      else if (stat.size < 10_000) sizeBuckets.small++;
      else if (stat.size < 500_000) sizeBuckets.medium++;
      else sizeBuckets.large++;

      children.push({
        type: "file",
        name: entry.name,
        ext,
        size: stat.size,
        hash: hash(entry.name + stat.size)
      });
    }

    return children;
  }

  const children = await walk(root, 0);

  return {
    root: rootName,
    children,
    stats: {
      files: fileCount,
      directories: dirCount,
      maxDepth,
      truncated,
      extensions: normalizeExtensions(extensionStats),
      sizeBuckets
    }
  };
}

function normalizeExtensions(map) {
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([ext, count]) => ({
      ext,
      count
    }));
}

function hash(input) {
  return crypto
    .createHash("sha1")
    .update(input)
    .digest("hex")
    .slice(0, 8);
}
