export function detectEntryPoints(tree) {
  const hits = [];

  function scan(nodes, prefix = "") {
    for (const n of nodes) {
      const full = `${prefix}/${n.name}`;

      if (n.type === "file") {
        if (
          n.name === "index.js" ||
          n.name === "main.jsx" ||
          n.name === "App.jsx"
        ) {
          hits.push(full);
        }
      }

      if (n.children) {
        scan(n.children, full);
      }
    }
  }

  scan(tree.children);
  return hits;
}
