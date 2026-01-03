import React, { useState } from "react";
import SkeletonBlocks from "./SkeletonBlocks.jsx";
import GlitchText from "./GlitchText.jsx";

export default function Tabs({ repoUrl, onBack }) {
  const [active, setActive] = useState("map");

  return (
    <div className="min-h-screen bg-paper text-ink px-6 py-10 brutal-enter">

      <div className="max-w-6xl mx-auto border-4 border-ink bg-slab shadow-brutal p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <GlitchText text="Repo2Demo" level="light" />
            <div className="mt-2 font-mono text-xs text-ash break-all">
              {repoUrl}
            </div>
          </div>

          <button
            onClick={onBack}
            className="border-4 border-ink bg-paper px-5 py-3 font-black brutal-hover hover:bg-ink hover:text-paper"
          >
            ← BACK
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 border-4 border-ink bg-slab shadow-brutal">
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

        <div className="p-8">
          {active === "map" && (
            <div className="space-y-6">
              <div className="text-2xl font-black">REPOSITORY STRUCTURE</div>
              <SkeletonBlocks variant="tree" />
            </div>
          )}

          {active === "arch" && (
            <div className="space-y-6">
              <div className="text-2xl font-black">SYSTEM ARCHITECTURE</div>
              <SkeletonBlocks variant="arch" />
            </div>
          )}

          {active === "demo" && (
            <div className="space-y-6">
              <div className="text-2xl font-black">2-MINUTE DEMO SCRIPT</div>
              <SkeletonBlocks variant="demo" />
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 grid md:grid-cols-3 gap-6 brutal-enter">
        <Stat label="FILES SCANNED" value="—" />
        <Stat label="ENTRY POINTS" value="—" />
        <Stat label="BACKEND" value="NONE" />
      </div>

      <div className="mt-16 text-center font-mono text-xs text-ash">
        APPLICATION MODE • STRUCTURE OVER MAGIC • UI FIRST
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

function Stat({ label, value }) {
  return (
    <div className="border-4 border-ink bg-paper p-6 text-center shadow-brutal">
      <div className="font-mono text-xs text-ash">{label}</div>
      <div className="mt-2 text-2xl font-black">{value}</div>
    </div>
  );
}
