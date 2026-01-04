// File: /services/aiService.js
import fs from "fs-extra";
import path from "path";

/**
 * Reads key config files to understand what the code actually does.
 */
async function gatherContext(repoPath) {
  const context = {
    dependencies: [],
    readmeSnippet: "",
    language: "Unknown",
  };

  // 1. Try to read package.json (Node)
  try {
    const pkgPath = path.join(repoPath, "package.json");
    if (await fs.pathExists(pkgPath)) {
      const pkg = await fs.readJson(pkgPath);
      context.dependencies = [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.devDependencies || {}),
      ];
      context.language = "JavaScript/TypeScript";
    }
  } catch (e) { /* ignore */ }

  // 2. Try to read requirements.txt (Python)
  try {
    const reqPath = path.join(repoPath, "requirements.txt");
    if (await fs.pathExists(reqPath)) {
      const content = await fs.readFile(reqPath, "utf-8");
      context.dependencies = content.split("\n").filter(Boolean).slice(0, 20);
      context.language = "Python";
    }
  } catch (e) { /* ignore */ }

  // 3. Grab README snippet
  try {
    const readmePath = path.join(repoPath, "README.md");
    if (await fs.pathExists(readmePath)) {
      const content = await fs.readFile(readmePath, "utf-8");
      context.readmeSnippet = content.substring(0, 500).replace(/\n/g, " ");
    }
  } catch (e) { /* ignore */ }

  return context;
}

/**
 * Generates the "AI" analysis. 
 * If you add an OPENAI_API_KEY to your env, this could call GPT-4.
 * For now, it uses a robust rule-based generation engine.
 */
export async function generateDemoScript(repoPath) {
  const context = await gatherContext(repoPath);
  const deps = context.dependencies;
  
  // Heuristic Analysis
  const isReact = deps.some(d => d.includes("react"));
  const isNext = deps.some(d => d.includes("next"));
  const isExpress = deps.some(d => d.includes("express"));
  const isTailwind = deps.some(d => d.includes("tailwindcss"));
  const isPython = context.language === "Python";

  let title = "Generic Project";
  if (isNext) title = "Next.js Application";
  else if (isReact) title = "React Single Page App";
  else if (isExpress) title = "Node.js API Server";
  else if (isPython) title = "Python Script / Service";

  // Dynamic Script Generation
  const script = [
    `1. INTRO: "This project is a ${title} built primarily with ${context.language}."`,
    `2. ARCHITECTURE: "It relies on ${deps.length} dependencies, notably ${deps.slice(0, 3).join(", ") || "standard libraries"}."`,
    `3. HOOK: "The README suggests it focuses on: '${context.readmeSnippet.slice(0, 50) || "general utility"}...'."`,
    `4. DEMO FLOW: "We will start by looking at the configuration files, then move to the entry points."`,
    `5. CLOSING: "This stack suggests a focus on ${isTailwind ? "modern UI development" : "backend logic"}."`
  ];

  return {
    title,
    detectedStack: deps.slice(0, 10),
    demoScript: script,
    aiModel: "Heuristic-Engine-v1" // Rename this if you plug in GPT-4
  };
}
