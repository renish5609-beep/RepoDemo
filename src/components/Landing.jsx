import React, { useState } from "react";
import GlitchText from "./GlitchText.jsx";

export default function Landing({ tagline, onGenerate }) {
  const [url, setUrl] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onGenerate(url.trim() || "https://github.com/owner/repo");
  };

  return (
    <div className="scanlines min-h-screen flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-3xl">
        <div className="border-4 border-ink bg-slab shadow-brutal p-8 md:p-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <GlitchText text="Repo2Demo" />
              <p className="mt-3 text-sm md:text-base font-mono text-ash">
                {tagline}
              </p>
            </div>
            <div className="hidden md:block text-right">
              <div className="inline-block border-2 border-ink px-3 py-2 font-mono text-xs bg-paper">
                MVP MODE
              </div>
              <div className="mt-2 text-xs font-mono text-ash">
                NO BACKEND • UI SCAFFOLD
              </div>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-12 gap-5">
            <div className="md:col-span-8">
              <label className="block font-bold text-lg mb-2">
                GitHub Repo URL
              </label>

              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://github.com/owner/repo"
                className="w-full border-4 border-ink bg-paper px-4 py-4 text-base md:text-lg font-mono outline-none focus:ring-0"
              />

              <p className="mt-2 text-xs font-mono text-ash">
                PUBLIC REPOS ONLY (FOR NOW). NO AUTH. NO PROMISES.
              </p>
            </div>

            <div className="md:col-span-4 flex items-end">
              <button
                onClick={submit}
                className="w-full border-4 border-ink bg-accent text-white font-black text-lg px-5 py-4 brutal-hover jitter hover:bg-ink hover:text-paper"
                type="button"
              >
                GENERATE DEMO
              </button>
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-4">
            <Feature label="Repo Map" desc="Structure + entry points (placeholder)" />
            <Feature label="Architecture" desc="System summary + components (placeholder)" />
            <Feature label="Demo Script" desc="2-minute pitch + shot list (placeholder)" />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Badge>THICK BORDERS</Badge>
            <Badge>ONE ACCENT</Badge>
            <Badge>NO GRADIENTS</Badge>
            <Badge>HARSH HOVERS</Badge>
            <Badge>GLITCH TEXT</Badge>
          </div>
        </div>

        <div className="mt-6 text-xs font-mono text-ash">
          Tip: In the demo, paste any repo → show loading → flip through tabs.
        </div>
      </div>
    </div>
  );
}

function Feature({ label, desc }) {
  return (
    <div className="border-2 border-ink bg-paper p-4">
      <div className="font-black text-base">{label}</div>
      <div className="mt-1 text-xs font-mono text-ash">{desc}</div>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-block border-2 border-ink bg-paper px-2 py-1 text-xs font-mono">
      {children}
    </span>
  );
}
