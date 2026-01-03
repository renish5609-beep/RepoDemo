import React, { useEffect, useMemo, useState } from "react";
import SkeletonBlocks from "./SkeletonBlocks.jsx";
import GlitchText from "./GlitchText.jsx";

export default function Tabs({ repoUrl, onBack }) {
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
    setHistory((h) => [...h, active].slice(-8));
  }, [active]);

  const title = useMemo(() => {
    if (active === "map") return "REPOSITORY STRUCTURE";
    if (active === "arch") return "SYSTEM ARCHITECTURE";
    if (active === "demo") return "DEMO SCRIPT";
    return "UNKNOWN";
  }, [active]);

  return (
    <div className="min-h-screen bg-paper text-ink px-6 py-10 brutal-enter">

      <div className="max-w-7xl mx-auto border-4 border-ink bg-slab shadow-brutal p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <GlitchText text="RepoDemo" level="light" unstable />
            <div className="mt-2 font-mono text-xs text-ash break-all">
              {repoUrl}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="border-2 border-ink px-3 py-2 font-mono text-xs bg-paper">
              MODE: APPLICATION
            </div>
            <button
              onClick={onBack}
              className="border-4 border-ink bg-paper px-5 py-3 font-black brutal-hover hover:bg-ink hover:text-paper"
            >
              ← BACK
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 border-4 border-ink bg-slab shadow-brutal">
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

        <div className="p-8 grid lg:grid-cols-4 gap-8">

          <div className="lg:col-span-3 space-y-6">
            <div className="text-2xl md:text-3xl font-black">
              {title}
            </div>

            {active === "map" && (
              <SkeletonBlocks variant="tree" />
            )}

            {active === "arch" && (
              <SkeletonBlocks variant="arch" />
            )}

            {active === "demo" && (
              <SkeletonBlocks variant="demo" />
            )}
          </div>

          <div className="space-y-6">
            <Panel title="STATE">
              <Row label="ACTIVE TAB" value={active.toUpperCase()} />
              <Row label="FOCUS" value={focus || "NONE"} />
              <Row label="TICK" value={tick} />
              <Row label="ENTROPY" value={entropy} />
            </Panel>

            <Panel title="SESSION">
              <Row label="HISTORY" value={history.join(" → ") || "—"} />
              <Row label="RUN MODE" value="SIMULATED" />
              <Row label="BACKEND" value="DISABLED" />
            </Panel>

            <Panel title="ACTIONS">
              <Action
                label="FOCUS LEFT"
                onClick={() => setFocus("LEFT")}
              />
              <Action
                label="FOCUS RIGHT"
                onClick={() => setFocus("RIGHT")}
              />
              <Action
                label="CLEAR FOCUS"
                onClick={() => setFocus(null)}
              />
            </Panel>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 grid md:grid-cols-4 gap-6 brutal-enter">
        <Stat label="FILES SCANNED" value="—" />
        <Stat label="DIRECTORIES" value="—" />
        <Stat label="ENTRY POINTS" value="—" />
        <Stat label="BACKEND" value="NONE" />
      </div>

      <div className="max-w-7xl mx-auto mt-10 border-4 border-ink bg-paper p-6 font-mono text-xs">
        <div className="font-black mb-2">TRACE</div>
        <pre className="leading-relaxed">
{`{
  "repo": "${repoUrl}",
  "activeTab": "${active}",
  "tick": ${tick},
  "entropy": "${entropy}",
  "focus": "${focus}",
  "history": [${history.map((h) => `"${h}"`).join(", ")}],
  "mode": "ui-only",
  "analysis": false
}`}
        </pre>
      </div>

      <div className="mt-16 text-center font-mono text-xs text-ash">
        APPLICATION MODE • STRUCTURE OVER MAGIC • BUILT LOUD
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
      <div className="font-black mb-3">{title}</div>
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

function Stat({ label, value }) {
  return (
    <div className="border-4 border-ink bg-paper p-6 text-center shadow-brutal">
      <div className="font-mono text-xs text-ash">{label}</div>
      <div className="mt-2 text-2xl font-black">{value}</div>
    </div>
  );
}
