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
    
      <div className="flex items-center justify-center">
        <div className="w-full max-w-3xl brutal-enter">
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

            {/* FEATURE BADGES */}
            <div className="mt-8 flex flex-wrap gap-2">
              <Badge>THICK BORDERS</Badge>
              <Badge>NO GRADIENTS</Badge>
              <Badge>VISIBLE STATES</Badge>
              <Badge>FAKE DATA (HONEST)</Badge>
              <Badge>BRUTAL MOTION</Badge>
            </div>
          </div>
        </div>
      </div>

      
      <div className="mt-16 max-w-4xl mx-auto brutal-enter">
        <div className="border-4 border-ink bg-paper p-8 md:p-10">
          <div className="text-2xl md:text-3xl font-black">
            WHAT THIS IS
          </div>

          <p className="mt-4 font-mono text-sm md:text-base leading-relaxed">
            Repo2Demo is a UI tool for turning a raw GitHub repository into a
            clear, presentable demo narrative. It does not compile your code.
            It does not run your app. It does not pretend to understand business
            logic perfectly.
          </p>

          <p className="mt-4 font-mono text-sm md:text-base leading-relaxed">
            Instead, it reads structure, surfaces entry points, and helps you
            explain a system <span className="font-bold">fast</span> — the way
            engineers actually do in interviews, reviews, and demos.
          </p>
        </div>
      </div>

    
      <div className="mt-16 max-w-5xl mx-auto brutal-enter">
        <div className="border-4 border-ink bg-slab p-8 md:p-10">
          <div className="text-2xl md:text-3xl font-black mb-6">
            HOW IT WORKS (RIGHT NOW)
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Step
              n="01"
              title="PASTE A REPO"
              desc="You give it a public GitHub URL. Nothing private. Nothing magical."
            />
            <Step
              n="02"
              title="ANALYZE (FAKE)"
              desc="We show a loading screen because demos need pacing, not silence."
            />
            <Step
              n="03"
              title="TELL A STORY"
              desc="Tabs walk through structure, architecture, and a demo script."
            />
          </div>

          <div className="mt-6 font-mono text-xs text-ash">
            NOTE: Most data on this page is placeholder. This is intentional.
          </div>
        </div>
      </div>

      {/* =========================
          DISCLAIMERS / HONESTY BLOCK
         ========================= */}
      <div className="mt-16 max-w-4xl mx-auto brutal-enter">
        <div className="border-4 border-ink bg-paper p-8 md:p-10">
          <div className="text-xl md:text-2xl font-black">
            WHAT THIS IS NOT
          </div>

          <ul className="mt-4 list-disc list-inside font-mono text-sm md:text-base space-y-2">
            <li>Not an AI code reviewer</li>
            <li>Not a build system</li>
            <li>Not a replacement for knowing your own code</li>
            <li>Not subtle</li>
          </ul>

          <p className="mt-6 font-mono text-xs text-ash">
            Brutalist UI principle: do not hide limitations — frame them.
          </p>
        </div>
      </div>

    
      <div className="mt-16 text-center font-mono text-xs text-ash">
        Repo2Demo • UI Prototype • Built loud on purpose
      </div>
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

function Step({ n, title, desc }) {
  return (
    <div className="border-2 border-ink bg-paper p-5">
      <div className="font-mono text-xs text-ash">{n}</div>
      <div className="mt-1 font-black text-lg">{title}</div>
      <p className="mt-2 font-mono text-sm text-ash leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

