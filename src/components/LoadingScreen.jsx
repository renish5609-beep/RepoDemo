import React, { useEffect, useMemo, useState } from "react";

export default function LoadingScreen({ repoUrl, onDone }) {
  const steps = useMemo(
    () => [
      "Fetching repository metadata",
      "Reading file tree",
      "Finding entry points",
      "Mapping architecture surfaces",
      "Drafting demo narrative"
    ],
    []
  );

  const [pct, setPct] = useState(2);
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    const t1 = setInterval(() => {
      setPct((p) => Math.min(100, p + Math.floor(Math.random() * 8) + 1));
    }, 240);

    const t2 = setInterval(() => {
      setLineCount((c) => Math.min(steps.length, c + 1));
    }, 420);

    return () => {
      clearInterval(t1);
      clearInterval(t2);
    };
  }, [steps.length]);

  useEffect(() => {
    if (pct >= 100) {
      const doneTimer = setTimeout(() => onDone(), 450);
      return () => clearTimeout(doneTimer);
    }
  }, [pct, onDone]);

  return (
    <div className="min-h-screen bg-ink text-paper flex items-center justify-center px-6">
      <div className="w-full max-w-3xl border-4 border-paper p-8 md:p-10 brutal-enter">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-4xl md:text-5xl font-black tracking-tight flicker">
              ANALYZING…
            </div>
            <div className="mt-2 font-mono text-xs md:text-sm text-paper/80">
              TARGET: {repoUrl || "https://github.com/owner/repo"}
            </div>
          </div>
          <div className="font-mono text-xs md:text-sm border-2 border-paper px-3 py-2">
            {pct}%
          </div>
        </div>

        <div className="mt-8 border-2 border-paper">
          <div
            className="h-4 bg-accent brutal-hover brutal-scan"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="mt-8 font-mono text-xs md:text-sm border-2 border-paper p-4">
          <div className="text-paper/70 mb-2">LOG</div>
          {steps.slice(0, lineCount).map((s, idx) => (
            <div key={s} className="flex gap-3">
              <span className="text-paper/60">{String(idx + 1).padStart(2, "0")}.</span>
              <span className="text-paper">{s}</span>
              <span className="text-paper/50">
                {idx === lineCount - 1 && pct < 100 ? "…" : "✓"}
              </span>
            </div>
          ))}

          <div className="mt-3 text-paper/60">
            {pct < 100 ? "DO NOT BLINK." : "DONE."}
          </div>
        </div>
      </div>
    </div>
  );
}

