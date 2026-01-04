import fs from "fs";
import path from "path";

export function buildTree(root) {
  let fileCount = 0;

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    return entries.map((e) => {
      const full = path.join(dir, e.name);

      if (e.isDirectory()) {
        return {
          type: "dir",
          name: e.name,
          children: walk(full)
        };
      }

      fileCount++;
      return {
        type: "file",
        name: e.name,
        ext: path.extname(e.name)
      };
    });
  }

  return {
    root: path.basename(root),
    children: walk(root),
    fileCount
  };
}
