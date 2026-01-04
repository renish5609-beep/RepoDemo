import React, { useEffect, useMemo, useState } from "react";

export default function LoadingScreen({ repoUrl, onDone }) {

  const steps = useMemo(
    () => [
      "Validating repository URL",
      "Cloning repository",
      "Reading file system",
      "Building directory tree",
      "Detecting entry points",
      "Inferring architecture",
      "Finalizing analysis payload"
    ],
    []
  );


  const [pct, setPct] = useState(0);
  const [lineCount, setLineCount] = useState(1);
  const [tick, setTick] = useState(0);
  const [entropy, setEntropy] = useState(Math.random().toFixed(6));
  const [error, setError] = useState(null);


  useEffect(() => {
    let alive = true;

    async function runAnalysis() {
      try {
        setPct(5);

        const res = await fetch("http://localhost:3333/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ repoUrl })
        });

        if (!res.ok) {
          throw new Error(`Backend responded ${res.status}`);
        }

        // artificial pacing so UI can breathe
        for (let i = 1; i < steps.length; i++) {
          await sleep(350);
          if (!alive) return;
          setLineCount(i + 1);
          setPct(Math.min(90, i * 12));
        }

        const data = await res.json();

        if (!alive) return;

        // store globally for Tabs.jsx
        window.__REPO_ANALYSIS__ = data;

        setPct(100);

        setTimeout(() => {
          if (alive) onDone();
        }, 500);
      } catch (err) {
        console.error(err);
        setError("ANALYSIS FAILED");
      }
    }

    runAnalysis();

    return () => {
      alive = false;
    };
  }, [repoUrl, onDone, steps.length]);

 
  useEffect(() => {
    const t = setInterval(() => {
      setTick((v) => v + 1);
      setEntropy(Math.random().toFixed(6));
    }, 700);
    return () => clearInterval(t);
  }, []);

  
  return (
    <div className="min-h-screen bg-ink text-paper flex items-center justify-center px-6">
      <div className="w-full max-w-4xl border-4 border-paper p-8 md:p-10 brutal-enter">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-4xl md:text-5xl font-black tracking-tight flicker">
              ANALYZING
            </div>
            <div className="mt-2 font-mono text-xs md:text-sm text-paper/80 break-all">
              TARGET: {repoUrl}
            </div>
          </div>

          <div className="font-mono text-xs md:text-sm border-2 border-paper px-3 py-2">
            {pct}%
          </div>
        </div>

        {/* STATUS STRIP */}
        <div className="mt-4 border-2 border-paper px-4 py-2 font-mono text-xs text-paper/70">
          MODE: LIVE BACKEND • NETWORK: ACTIVE • CACHE: OFF
        </div>

        {/* PROGRESS BAR */}
        <div className="mt-6 border-2 border-paper h-6 bg-paper">
          <div
            className="h-full bg-ink"
            style={{
              width: `${pct}%`,
              transition: "width 160ms linear"
            }}
          />
        </div>

        {/* LOG */}
        <div className="mt-8 font-mono text-xs md:text-sm border-2 border-paper p-4">
          <div className="text-paper/70 mb-2">LOG</div>

          {steps.slice(0, lineCount).map((s, idx) => (
            <div key={s} className="flex gap-3">
              <span className="text-paper/60">
                {String(idx + 1).padStart(2, "0")}.
              </span>
              <span className="text-paper">{s}</span>
              <span className="text-paper/50">
                {idx === lineCount - 1 && pct < 100 ? "…" : "✓"}
              </span>
            </div>
          ))}

          <div className="mt-3 text-paper/60">
            {error ? error : pct < 100 ? "PROCESSING" : "COMPLETE"}
          </div>
        </div>

        {/* METRICS */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Panel title="SYSTEM METRICS">
            <Metric label="Tick" value={tick} />
            <Metric label="Entropy" value={entropy} />
            <Metric label="Parser" value="ACTIVE" />
            <Metric label="Network" value="ONLINE" />
          </Panel>

          <Panel title="NOTES">
            <p className="text-paper/70 leading-relaxed text-xs">
              This loading screen reflects real repository analysis.
              Visual pacing is intentional. Brutalism favors clarity
              over illusion.
            </p>
          </Panel>
        </div>

        {/* DEBUG */}
        <div className="mt-8 border-2 border-paper p-4 font-mono text-[10px] text-paper/70">
          <div className="font-bold mb-2">DEBUG TRACE</div>
          <pre>
{`{
  "repo": "${repoUrl}",
  "progress": ${pct},
  "step": ${lineCount},
  "tick": ${tick},
  "entropy": "${entropy}",
  "backend": true
}`}
          </pre>
        </div>

        {/* FOOTER */}
        <div className="mt-8 text-center font-mono text-xs text-paper/50">
          LIVE ANALYSIS • STRUCTURE OVER MAGIC • BUILT LOUD
        </div>
      </div>
    </div>
  );
}



function Panel({ title, children }) {
  return (
    <div className="border-2 border-paper p-4">
      <div className="font-bold mb-2 text-xs">{title}</div>
      {children}
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="flex justify-between border-b border-paper/20 py-1 text-xs">
      <span className="text-paper/60">{label}</span>
      <span className="text-paper">{value}</span>
    </div>
  );
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}



