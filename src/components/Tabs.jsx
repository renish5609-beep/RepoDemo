import React, { useEffect, useMemo, useState } from "react";
import SkeletonBlocks from "./SkeletonBlocks.jsx";
import GlitchText from "./GlitchText.jsx";

export default function Tabs({ repoUrl, onBack }) {
  const analysis = window.__REPO_ANALYSIS__;

  const [active, setActive] = useState("map");
  const [focus, setFocus] = useState(null);
  const [tick, setTick] = useState(0);
  const [entropy, setEntropy] = useState(Math.random().toFixed(6));
  const [history, setHistory] = useState([]);

 
  useEffect(() => {
    const t = setInterval(() => {
      setTick((v) => v + 1);
      setEntropy(Math.random().toFixed(6));
    }, 800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setHistory((h) => [...h, active].slice(-10));
  }, [active]);

  const title = useMemo(() => {
    if (active === "map") return "REPOSITORY STRUCTURE";
    if (active === "arch") return "SYSTEM ARCHITECTURE";
    if (active === "demo") return "DEMO SCRIPT";
    return "UNKNOWN";
  }, [active]);


  return (
    <div className="min-h-screen w-screen bg-paper text-ink brutal-enter">

      {/* TOP BAR */}
      <div className="border-b-4 border-ink bg-slab px-6 py-4 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
        <div>
          <GlitchText text="RepoDemo" level="light" unstable />
          <div className="mt-2 font-mono text-xs text-ash break-all">
            {repoUrl}
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="border-2 border-ink px-3 py-2 font-mono text-xs bg-paper">
            MODE: APPLICATION
          </div>

          <button
            onClick={onBack}
            className="border-4 border-ink bg-paper px-6 py-3 font-black brutal-hover hover:bg-ink hover:text-paper"
          >
            ← BACK
          </button>
        </div>
      </div>

      {/* TAB STRIP */}
      <div className="grid grid-cols-3 border-b-4 border-ink">
        <TabButton
          label="REPO MAP"
          active={active === "map"}
          onClick={() => setActive("map")}
        />
        <TabButton
          label="ARCHITECTURE"
          active={active === "arch"}
          onClick={() => setActive("arch")}
        />
        <TabButton
          label="DEMO SCRIPT"
          active={active === "demo"}
          onClick={() => setActive("demo")}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="grid lg:grid-cols-[1fr_340px] min-h-[calc(100vh-180px)]">

        {/* LEFT: PRIMARY CONTENT */}
        <div className="p-8 space-y-6 overflow-y-auto">

          <div className="text-3xl md:text-4xl font-black tracking-tight">
            {title}
          </div>

          {!analysis && (
            <div className="border-4 border-ink bg-paper p-6 font-mono">
              No analysis payload found.
            </div>
          )}

          {analysis && active === "map" && (
            <SkeletonBlocks variant="tree" />
          )}

          {analysis && active === "arch" && (
            <SkeletonBlocks variant="arch" />
          )}

          {analysis && active === "demo" && (
            <SkeletonBlocks variant="demo" />
          )}
        </div>

        {/* RIGHT: CONTROL / STATE */}
        <div className="border-l-4 border-ink bg-slab p-6 space-y-6">

          <Panel title="STATE">
            <Row label="ACTIVE TAB" value={active.toUpperCase()} />
            <Row label="FOCUS" value={focus || "NONE"} />
            <Row label="TICK" value={tick} />
            <Row label="ENTROPY" value={entropy} />
          </Panel>

          <Panel title="SESSION">
            <Row label="HISTORY" value={history.join(" → ") || "—"} />
            <Row label="BACKEND" value="CONNECTED" />
            <Row label="MODE" value="LIVE DATA" />
          </Panel>

          <Panel title="ACTIONS">
            <Action label="FOCUS LEFT" onClick={() => setFocus("LEFT")} />
            <Action label="FOCUS RIGHT" onClick={() => setFocus("RIGHT")} />
            <Action label="CLEAR FOCUS" onClick={() => setFocus(null)} />
          </Panel>
        </div>
      </div>

      {/* FOOTER TRACE */}
      <div className="border-t-4 border-ink bg-paper p-6 font-mono text-xs">
        <div className="font-black mb-2">TRACE</div>
        <pre className="leading-relaxed">
{`{
  "repo": "${repoUrl}",
  "activeTab": "${active}",
  "tick": ${tick},
  "entropy": "${entropy}",
  "focus": "${focus}",
  "history": [${history.map((h) => `"${h}"`).join(", ")}],
  "analysis": true
}`}
        </pre>
      </div>
    </div>
  );
}



function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`border-r-4 border-ink px-4 py-4 font-black text-sm md:text-base brutal-hover ${
        active
          ? "bg-ink text-paper"
          : "bg-paper text-ink hover:bg-ink hover:text-paper"
      }`}
    >
      {label}
    </button>
  );
}

function Panel({ title, children }) {
  return (
    <div className="border-4 border-ink bg-paper p-4 shadow-brutal">
      <div className="font-black mb-3 text-sm">{title}</div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-ink/20 pb-1 text-xs font-mono">
      <span className="text-ash">{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  );
}

function Action({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full border-2 border-ink bg-paper px-3 py-2 font-mono text-xs brutal-hover hover:bg-ink hover:text-paper"
    >
      {label}
    </button>
  );
}
