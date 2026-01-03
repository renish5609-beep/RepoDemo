import React, { useState } from "react";
import GlitchText from "./GlitchText.jsx";

export default function Landing({ tagline, onGenerate }) {
  const [url, setUrl] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onGenerate(url.trim() || "https://github.com/owner/repo");
  };

  return (
    <div className="scanlines min-h-screen px-6 py-10">
      <section className="flex items-center justify-center">
        <div className="w-full max-w-3xl brutal-enter">
          <div className="border-4 border-ink bg-slab shadow-brutal p-8 md:p-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <GlitchText text="RepoDemo" />
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

            <form
              onSubmit={submit}
              className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end"
            >
              <div>
                <label className="block font-bold text-lg mb-2">
                  GitHub Repo URL
                </label>

                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://github.com/owner/repo"
                  className="w-full h-[64px] border-4 border-ink bg-paper px-4 text-base md:text-lg font-mono outline-none focus:ring-0"
                />

                <p className="mt-2 text-xs font-mono text-ash">
                  PUBLIC REPOS ONLY (FOR NOW). NO AUTH. NO PROMISES.
                </p>
              </div>

              <button
                type="submit"
                className="h-[64px] border-4 border-ink bg-accent text-white font-black text-lg px-6 brutal-hover jitter hover:bg-ink hover:text-paper"
              >
                GENERATE DEMO
              </button>
            </form>

            <div className="mt-8 flex flex-wrap gap-2">
              <Badge>THICK BORDERS</Badge>
              <Badge>NO GRADIENTS</Badge>
              <Badge>VISIBLE STATES</Badge>
              <Badge>FAKE DATA</Badge>
              <Badge>HONEST UI</Badge>
              <Badge>BRUTAL MOTION</Badge>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-20 text-center font-mono text-xs text-ash">
        RepoDemo • UI Prototype • Built loud on purpose
      </footer>
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



