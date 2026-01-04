import path from "path";
import fs from "fs-extra";
import simpleGit from "simple-git";
import { buildTree } from "./treeService.js";
import { detectEntryPoints } from "./entryService.js";
import { inferArchitecture } from "./archService.js";

export async function startAnalysis(repoUrl) {
  const id = Date.now().toString();
  const repoPath = path.join("temp", id);

  await fs.ensureDir(repoPath);

  const git = simpleGit();
  await git.clone(repoUrl, repoPath, ["--depth", "1"]);

  const tree = await buildTree(repoPath);
  const entryPoints = detectEntryPoints(tree);
  const architecture = inferArchitecture(tree);

  return {
    repoUrl,
    tree,
    entryPoints,
    architecture,
    meta: {
      analyzedAt: new Date().toISOString(),
      files: tree.fileCount
    }
  };
}
