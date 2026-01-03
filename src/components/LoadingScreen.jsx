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

  const [tick, setTick] = useState(0);
  const [noise, setNoise] = useState(Math.random().toFixed(5));



  useEffect(() => {
    const t1 = setInterval(() => {
      setPct((p) => Math.min(100, p + Math.floor(Math.random() * 8) + 1));
      setTick((t) => t + 1);
      setNoise(Math.random().toFixed(5));
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
      <div className="w-full max-w-4xl border-4 border-paper p-8 md:p-10 brutal-enter">

      
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
            {pct < 100 ? "DO NOT BLINK." : "DONE."}
          </div>
        </div>

       
        <div className="mt-8 grid md:grid-cols-2 gap-6">

          {/* LEFT: SYSTEM METRICS */}
          <div className="border-2 border-paper p-4 font-mono text-xs">
            <div className="font-bold mb-2">SYSTEM METRICS</div>
            <Metric label="Tick Count" value={tick} />
            <Metric label="Entropy Seed" value={noise} />
            <Metric label="Render Mode" value="SIMULATED" />
            <Metric label="Parser" value="DISABLED" />
            <Metric label="Network" value="OFFLINE" />
          </div>

          {/* RIGHT: DISCLAIMER */}
          <div className="border-2 border-paper p-4 font-mono text-xs">
            <div className="font-bold mb-2">STATUS NOTES</div>
            <p className="text-paper/70 leading-relaxed">
              This loading screen does not reflect real repository analysis.
              It exists to provide pacing, narrative weight, and visual clarity
              during demos and walkthroughs.
            </p>
            <p className="mt-3 text-paper/70 leading-relaxed">
              Brutalist UI principle: silence is worse than fake progress.
            </p>
          </div>
        </div>

     
        <div className="mt-8 border-2 border-paper p-4 font-mono text-[10px] leading-relaxed text-paper/70">
          <div className="font-bold mb-2">DEBUG TRACE (NON-FUNCTIONAL)</div>
          <pre>
{`{
  "repoUrl": "${repoUrl || "https://github.com/owner/repo"}",
  "progress": ${pct},
  "stepIndex": ${lineCount},
  "tick": ${tick},
  "entropy": ${noise},
  "mode": "ui-only",
  "analysis": false,
  "backend": null,
  "notes": "this output is intentionally verbose"
}`}
          </pre>
        </div>

      
        <div className="mt-8 text-center font-mono text-xs text-paper/50">
          UI PROTOTYPE • LOADING AS PERFORMANCE • BUILT LOUD ON PURPOSE
        </div>
      </div>
    </div>
  );
}



function Metric({ label, value }) {
  return (
    <div className="flex justify-between border-b border-paper/20 py-1">
      <span className="text-paper/60">{label}</span>
      <span className="text-paper">{value}</span>
    </div>
  );
}



