import path from "path";

export function detectEntryPoints(tree) {
  const results = [];
  const seen = new Set();

  const fileSignals = {
    strong: new Set([
      "index.js",
      "index.ts",
      "index.jsx",
      "index.tsx",
      "main.js",
      "main.ts",
      "main.jsx",
      "main.tsx",
      "App.jsx",
      "App.tsx",
      "server.js",
      "server.ts",
      "app.js",
      "app.ts"
    ]),
    medium: new Set([
      "bootstrap.js",
      "bootstrap.ts",
      "start.js",
      "start.ts",
      "cli.js"
    ])
  };

  const dirBias = {
    src: 1.2,
    app: 1.1,
    server: 1.1,
    backend: 1.1,
    frontend: 1.1,
    pages: 0.9,
    lib: 0.7
  };

  function scan(nodes, depth, prefix) {
    for (const node of nodes) {
      const currentPath = prefix
        ? path.posix.join(prefix, node.name)
        : node.name;

      if (node.type === "file") {
        evaluateFile(node, currentPath, depth);
      }

      if (node.children && Array.isArray(node.children)) {
        scan(node.children, depth + 1, currentPath);
      }
    }
  }

  function evaluateFile(node, fullPath, depth) {
    if (seen.has(fullPath)) return;

    const name = node.name;
    const ext = node.ext || path.extname(name);
    const base = path.basename(name);
    const dir = path.dirname(fullPath).split("/").pop();

    let score = 0;
    let role = "unknown";

    if (fileSignals.strong.has(base)) score += 5;
    if (fileSignals.medium.has(base)) score += 3;

    if (ext === ".jsx" || ext === ".tsx") {
      score += 2;
      role = "frontend";
    }

    if (ext === ".js" || ext === ".ts") {
      score += 1;
    }

    if (dirBias[dir]) score *= dirBias[dir];

    score += Math.max(0, 4 - depth);

    if (base === "index.js" && dir === "pages") role = "next-page";
    if (base === "server.js") role = "backend";
    if (base === "app.js" && dir === "src") role = "frontend";

    if (score >= 4) {
      seen.add(fullPath);
      results.push({
        path: normalize(fullPath),
        file: base,
        ext,
        depth,
        score: Number(score.toFixed(2)),
        role
      });
    }
  }

  scan(tree.children || [], 0, "");

  return results
    .sort((a, b) => b.score - a.score)
    .map((r, index) => ({
      id: `${index}-${hash(r.path)}`,
      ...r
    }));
}

function normalize(p) {
  return p.startsWith("/") ? p.slice(1) : p;
}

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36);
}
