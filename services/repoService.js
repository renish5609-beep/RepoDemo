import path from "path";
import fs from "fs-extra";
import simpleGit from "simple-git";
import crypto from "crypto";
import { buildTree } from "./treeService.js";
import { detectEntryPoints } from "./entryService.js";
import { inferArchitecture } from "./archService.js";
import { generateDemoScript } from "./aiService.js";

const TEMP_ROOT = "temp";
const CLONE_DEPTH = 1;
const CLONE_RETRIES = 2;
const CLEANUP_DELAY = 1200;

export async function startAnalysis(repoUrl) {
  const normalized = normalizeRepoUrl(repoUrl);
  const id = generateId(normalized);
  const repoPath = path.join(TEMP_ROOT, id);

  const timings = {};
  const startedAt = Date.now();

  try {
    await mark(timings, "prepare", async () => {
      await fs.ensureDir(repoPath);
    });

    await mark(timings, "clone", async () => {
      await cloneWithRetry(normalized, repoPath);
    });

    const stats = await fs.stat(repoPath);

    if (!stats.isDirectory()) {
      throw new Error("Invalid repository path");
    }

    const [tree, aiAnalysis] = await mark(timings, "analysis", async () => {
      return Promise.all([
        buildTree(repoPath),
        generateDemoScript(repoPath)
      ]);
    });

    const entryPoints = await mark(timings, "entrypoints", async () => {
      return detectEntryPoints(tree);
    });

    const architecture = await mark(timings, "architecture", async () => {
      return inferArchitecture(tree);
    });

    const finishedAt = Date.now();

    return {
      repoUrl: normalized,
      id,
      tree,
      entryPoints,
      architecture,
      aiAnalysis,
      meta: {
        startedAt: new Date(startedAt).toISOString(),
        finishedAt: new Date(finishedAt).toISOString(),
        durationMs: finishedAt - startedAt,
        timings,
        files: tree?.stats?.files || tree?.fileCount || 0,
        directories: tree?.stats?.directories || 0
      }
    };
  } catch (error) {
    throw enrichError(error, {
      repoUrl: normalized,
      id,
      stage: currentStage(timings)
    });
  } finally {
    scheduleCleanup(repoPath);
  }
}

async function cloneWithRetry(url, target) {
  let attempt = 0;
  let lastError;

  while (attempt <= CLONE_RETRIES) {
    try {
      const git = simpleGit({
        timeout: {
          block: 120000
        }
      });

      await git.clone(url, target, [
        "--depth",
        String(CLONE_DEPTH)
      ]);

      return;
    } catch (e) {
      lastError = e;
      attempt++;
      await delay(400 * attempt);
    }
  }

  throw lastError;
}

function normalizeRepoUrl(url) {
  let u = url.trim();

  if (u.endsWith(".git")) {
    u = u.slice(0, -4);
  }

  if (u.startsWith("git@")) {
    const parts = u.split(":");
    u = "https://github.com/" + parts[1];
  }

  if (!u.startsWith("http")) {
    throw new Error("Invalid repository URL");
  }

  return u;
}

function generateId(input) {
  return crypto
    .createHash("sha256")
    .update(input + Date.now())
    .digest("hex")
    .slice(0, 16);
}

async function mark(bucket, label, fn) {
  const start = Date.now();
  const result = await fn();
  const end = Date.now();
  bucket[label] = end - start;
  return result;
}

function scheduleCleanup(dir) {
  setTimeout(async () => {
    try {
      if (await fs.pathExists(dir)) {
        await fs.remove(dir);
      }
    } catch {}
  }, CLEANUP_DELAY);
}

function enrichError(error, context) {
  const e = new Error(error.message);
  e.stack = error.stack;
  e.context = context;
  return e;
}

function currentStage(timings) {
  const keys = Object.keys(timings);
  return keys.length ? keys[keys.length - 1] : "init";
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
