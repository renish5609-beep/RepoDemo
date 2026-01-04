// File: /services/treeService.js
import fs from "fs-extra";
import path from "path";

export async function buildTree(root) {
  let fileCount = 0;
  // We need to store the relative root to hide the "temp/123456" path from the user
  const rootDirName = path.basename(root);

  async function walk(currentPath) {
    const entries = await fs.readdir(currentPath, { withFileTypes: true });
    
    // Map entries to promises so we can scan in parallel
    const childrenPromises = entries.map(async (e) => {
      const fullPath = path.join(currentPath, e.name);

      if (e.isDirectory()) {
        if (e.name === ".git") return null; // Ignore .git folder
        return {
          type: "dir",
          name: e.name,
          children: await walk(fullPath)
        };
      }

      fileCount++;
      return {
        type: "file",
        name: e.name,
        ext: path.extname(e.name)
      };
    });

    // Wait for all children to be processed, filter out nulls (.git)
    const results = await Promise.all(childrenPromises);
    return results.filter(Boolean);
  }

  const treeData = await walk(root);

  return {
    root: rootDirName,
    children: treeData,
    fileCount
  };
}
