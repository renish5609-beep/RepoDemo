import React, { useMemo, useState } from "react";
import SkeletonBlocks from "./SkeletonBlocks.jsx";

export default function Tabs({ repoUrl, onBack }) {
  const tabs = useMemo(
    () => [
      { key: "map", label: "REPO MAP" },
      { key: "arch", label: "ARCHITECTURE" },
      { key: "demo", label: "DEMO SCRIPT" }
    ],
    []
  );

  const [active, setActive] = useState("map");

  return (
    <div className="min-h-screen bg-paper text-ink px-6 py-8">
      <div className="max-w-5xl mx-auto brutal-enter">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-3xl md:text-4xl font-black">Repo2Demo</div>
            <div className="mt-1 font-mono text-xs text-ash">
              {repoUrl || "https://github.com/owner/repo"}
            </div>
          </div>

          <button
            onClick={onBack}
            className="self-start md:self-auto border-4 border-ink bg-slab px-4 py-3 font-black brutal-hover hover:bg-ink hover:text-paper"
            type="button"
          >
            ← BACK
          </button>
        </div>

        <div className="mt-6 border-4 border-ink bg-slab shadow-brutal">
          <div className="flex flex-col md:flex-row border-b-4 border-ink">
            {tabs.map((t) => {
              const isActive = t.key === active;
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className={[
                    "flex-1 text-left md:text-center px-5 py-4 font-black text-lg md:text-xl brutal-hover",
                    "border-r-4 border-ink last:border-r-0",
                    isActive
                      ? "bg-accent text-white"
                      : "bg-paper text-ink hover:bg-ink hover:text-paper"
                  ].join(" ")}
                  type="button"
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          <div className="p-6 md:p-8">
            {active === "map" && (
              <Panel title="Repository Structure">
                <SkeletonBlocks variant="tree" />
              </Panel>
            )}
            {active === "arch" && (
              <Panel title="Architecture Snapshot">
                <SkeletonBlocks variant="arch" />
              </Panel>
            )}
            {active === "demo" && (
              <Panel title="Demo Script">
                <SkeletonBlocks variant="demo" />
              </Panel>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="brutal-enter">
      <div className="text-2xl md:text-3xl font-black">{title}</div>
      <div className="mt-6 border-4 border-ink bg-paper p-5">
        {children}
      </div>
    </div>
  );
}

