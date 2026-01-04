// File: /services/repoService.js
import path from "path";
import fs from "fs-extra";
import simpleGit from "simple-git";
import { buildTree } from "./treeService.js";
import { detectEntryPoints } from "./entryService.js";
import { inferArchitecture } from "./archService.js";
import { generateDemoScript } from "./aiService.js"; // Import new service

export async function startAnalysis(repoUrl) {
  const id = Date.now().toString();
  const repoPath = path.join("temp", id);

  try {
    // 1. Prepare Directory
    await fs.ensureDir(repoPath);

    // 2. Clone (with timeout/depth safety)
    const git = simpleGit();
    await git.clone(repoUrl, repoPath, ["--depth", "1"]);

    // 3. Parallel Analysis
    // We run the structural scan AND the content analysis at the same time
    const [tree, aiResult] = await Promise.all([
      buildTree(repoPath),
      generateDemoScript(repoPath)
    ]);

    const entryPoints = detectEntryPoints(tree);
    const architecture = inferArchitecture(tree);

    return {
      repoUrl,
      tree,
      entryPoints,
      architecture,
      aiAnalysis: aiResult, // New Field
      meta: {
        analyzedAt: new Date().toISOString(),
        files: tree.fileCount,
        diskUsage: "Cleaned up after response"
      }
    };

  } catch (error) {
    console.error("Repo processing failed:", error);
    throw error;
  } finally {
    // 4. CRITICAL: Cleanup
    // Deletes the folder so your hard drive doesn't explode
    try {
      // Small delay to ensure file locks are released
      setTimeout(() => {
        fs.remove(repoPath).catch(e => console.error("Cleanup error:", e));
      }, 1000);
    } catch (e) {
      console.log("Cleanup scheduling failed");
    }
  }
}
