import fs from "fs-extra";
import path from "path";
import crypto from "crypto";

const IGNORE = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  ".next",
  ".DS_Store"
]);

const LIMITS = {
  maxFiles: 80,
  maxDepth: 6,
  maxLines: 300
};

export async function generateDemoScript(repoPath) {
  const collected = [];
  const folders = new Map();
  const extensions = {};
  const keywords = {};
  let truncated = false;

  async function walk(current, depth) {
    if (depth > LIMITS.maxDepth) {
      truncated = true;
      return;
    }

    let entries;
    try {
      entries = await fs.readdir(current, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (collected.length >= LIMITS.maxFiles) {
        truncated = true;
        return;
      }

      if (IGNORE.has(entry.name)) continue;

      const full = path.join(current, entry.name);
      const rel = normalize(repoPath, full);

      if (entry.isDirectory()) {
        folders.set(entry.name, (folders.get(entry.name) || 0) + 1);
        await walk(full, depth + 1);
        continue;
      }

      let stat;
      try {
        stat = await fs.stat(full);
      } catch {
        continue;
      }

      const ext = path.extname(entry.name) || "none";
      extensions[ext] = (extensions[ext] || 0) + 1;

      const lines = await countLines(full);

      const token = {
        id: hash(rel),
        name: entry.name,
        path: rel,
        ext,
        size: stat.size,
        lines
      };

      collected.push(token);
      extractKeywords(entry.name, keywords);
    }
  }

  await walk(repoPath, 0);

  const entryCandidates = rankEntryCandidates(collected);
  const folderSummary = summarizeFolders(folders);
  const languageSummary = summarizeExtensions(extensions);
  const keywordSummary = summarizeKeywords(keywords);

  const script = buildScript({
    entries: entryCandidates,
    folders: folderSummary,
    languages: languageSummary,
    keywords: keywordSummary
  });

  return {
    id: hash(repoPath + Date.now()),
    truncated,
    stats: {
      filesScanned: collected.length,
      foldersDetected: folders.size,
      extensions: languageSummary
    },
    highlights: {
      entryPoints: entryCandidates.slice(0, 5),
      dominantFolders: folderSummary.slice(0, 5),
      keywords: keywordSummary.slice(0, 10)
    },
    script
  };
}

function rankEntryCandidates(files) {
  return files
    .map(f => {
      let score = 0;

      if (f.name.startsWith("index")) score += 4;
      if (f.name.startsWith("main")) score += 4;
      if (f.name.startsWith("App")) score += 3;
      if (f.name.includes("server")) score += 3;
      if (f.ext === ".jsx" || f.ext === ".tsx") score += 2;
      if (f.ext === ".js" || f.ext === ".ts") score += 1;
      if (f.path.includes("/src")) score += 1;

      score += Math.max(0, 4 - f.path.split("/").length);

      return {
        ...f,
        score
      };
    })
    .filter(f => f.score >= 4)
    .sort((a, b) => b.score - a.score);
}

function summarizeFolders(map) {
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

function summarizeExtensions(map) {
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([ext, count]) => ({ ext, count }));
}

function extractKeywords(name, store) {
  const tokens = name
    .replace(/\.[^/.]+$/, "")
    .split(/[-_.]/)
    .map(t => t.toLowerCase());

  for (const t of tokens) {
    if (t.length < 3) continue;
    store[t] = (store[t] || 0) + 1;
  }
}

function summarizeKeywords(map) {
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([word, count]) => ({ word, count }));
}

function buildScript({ entries, folders, languages, keywords }) {
  const steps = [];

  steps.push({
    title: "Problem Overview",
    text: "This repository addresses a specific problem through a structured codebase with clear separation of concerns."
  });

  if (folders.length) {
    steps.push({
      title: "Project Structure",
      text: `The project is organized around key folders such as ${folders
        .slice(0, 3)
        .map(f => f.name)
        .join(", ")}.`
    });
  }

  if (languages.length) {
    steps.push({
      title: "Technology Stack",
      text: `The dominant technologies include ${languages
        .slice(0, 3)
        .map(l => l.ext || "unknown")
        .join(", ")}.`
    });
  }

  if (entries.length) {
    steps.push({
      title: "Entry Points",
      text: `Primary execution begins in files such as ${entries
        .slice(0, 3)
        .map(e => e.path)
        .join(", ")}.`
    });
  }

  if (keywords.length) {
    steps.push({
      title: "Core Concepts",
      text: `Recurring concepts include ${keywords
        .slice(0, 5)
        .map(k => k.word)
        .join(", ")}.`
    });
  }

  steps.push({
    title: "Demo Flow",
    text:
      "Walk through the entry point, follow the main execution path, and highlight how modules interact to solve the core problem."
  });

  return steps;
}

async function countLines(file) {
  try {
    const data = await fs.readFile(file, "utf8");
    return data.split("\n").slice(0, LIMITS.maxLines).length;
  } catch {
    return 0;
  }
}

function normalize(root, full) {
  return full.replace(root, "").replace(/^\/+/, "");
}

function hash(input) {
  return crypto
    .createHash("sha1")
    .update(input)
    .digest("hex")
    .slice(0, 10);
}
