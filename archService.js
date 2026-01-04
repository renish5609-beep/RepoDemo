export function inferArchitecture(tree) {
  const stats = {
    frontend: 0,
    backend: 0,
    config: 0,
    infra: 0,
    test: 0,
    mobile: 0,
    unknown: 0
  };

  const languages = {};
  const frameworks = {};
  const services = new Set();
  const roots = new Set();

  function scan(nodes, depth, parent) {
    for (const node of nodes) {
      if (node.type === "dir") {
        roots.add(node.name);
        scan(node.children || [], depth + 1, node.name);
        continue;
      }

      if (node.type !== "file") continue;

      const ext = node.ext || "";
      const name = node.name.toLowerCase();
      const dir = parent || "";

      classifyLanguage(ext);
      classifyCategory(ext, name, dir);
      classifyFramework(name, dir);
      detectService(name, dir);
    }
  }

  function classifyLanguage(ext) {
    languages[ext] = (languages[ext] || 0) + 1;
  }

  function classifyCategory(ext, name, dir) {
    if ([".jsx", ".tsx"].includes(ext)) {
      stats.frontend++;
      return;
    }

    if ([".js", ".ts", ".java", ".py", ".go"].includes(ext)) {
      if (dir.includes("test") || name.includes("test")) {
        stats.test++;
      } else {
        stats.backend++;
      }
      return;
    }

    if ([".json", ".yml", ".yaml", ".toml"].includes(ext)) {
      stats.config++;
      return;
    }

    if (
      name.includes("dockerfile") ||
      name.includes("terraform") ||
      name.includes("helm")
    ) {
      stats.infra++;
      return;
    }

    if ([".kt", ".swift"].includes(ext)) {
      stats.mobile++;
      return;
    }

    stats.unknown++;
  }

  function classifyFramework(name, dir) {
    if (name === "package.json") frameworks.node = true;
    if (name === "pom.xml") frameworks.maven = true;
    if (name === "build.gradle") frameworks.gradle = true;
    if (name === "next.config.js") frameworks.nextjs = true;
    if (name === "angular.json") frameworks.angular = true;
    if (name === "vite.config.js") frameworks.vite = true;
    if (name === "springbootapplication.java") frameworks.spring = true;
    if (dir === "pages") frameworks.nextjs = true;
    if (dir === "app" && frameworks.nextjs) frameworks.nextjs = true;
  }

  function detectService(name, dir) {
    if (dir === "services" || name.includes("service")) {
      services.add(dir || name);
    }
  }

  scan(tree.children || [], 0, "");

  const totalFiles =
    stats.frontend +
    stats.backend +
    stats.config +
    stats.infra +
    stats.test +
    stats.mobile +
    stats.unknown;

  const weights = {
    frontend: ratio(stats.frontend, totalFiles),
    backend: ratio(stats.backend, totalFiles),
    config: ratio(stats.config, totalFiles),
    infra: ratio(stats.infra, totalFiles),
    test: ratio(stats.test, totalFiles),
    mobile: ratio(stats.mobile, totalFiles)
  };

  const classification = dominant(weights);

  return {
    classification,
    weights,
    stats,
    languages: normalize(languages),
    frameworks: Object.keys(frameworks),
    services: Array.from(services),
    monorepo: roots.size > 6
  };
}

function ratio(v, t) {
  return t === 0 ? 0 : Number((v / t).toFixed(3));
}

function dominant(map) {
  let max = 0;
  let key = "unknown";

  for (const k in map) {
    if (map[k] > max) {
      max = map[k];
      key = k;
    }
  }

  return key;
}

function normalize(obj) {
  return Object.entries(obj)
    .sort((a, b) => b[1] - a[1])
    .map(([ext, count]) => ({
      ext,
      count
    }));
}
