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
      <div className="w-full max-w-3xl brutal-enter">
        <div className="border-4 border-ink bg-slab shadow-brutal p-8 md:p-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <GlitchText text="Repo2Demo" />
              <p className="mt-3 text-sm md:text-base font-mono text-ash">
                {tagline}
              </p>
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
        </div>
      </div>
    </div>
  );
}

