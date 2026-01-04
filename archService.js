export function inferArchitecture(tree) {
  const buckets = {
    frontend: 0,
    backend: 0,
    config: 0
  };

  function scan(nodes) {
    for (const n of nodes) {
      if (n.type === "file") {
        if (n.ext === ".jsx" || n.ext === ".tsx") buckets.frontend++;
        if (n.ext === ".java" || n.ext === ".js") buckets.backend++;
        if (n.ext === ".json" || n.ext === ".yml") buckets.config++;
      }
      if (n.children) scan(n.children);
    }
  }

  scan(tree.children);

  return buckets;
}
