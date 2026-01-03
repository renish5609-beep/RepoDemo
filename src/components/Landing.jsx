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

      <section className="mt-16 max-w-4xl mx-auto brutal-enter">
        <div className="border-4 border-ink bg-paper p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-black">
            WHAT THIS IS
          </h2>

          <p className="mt-4 font-mono text-sm md:text-base leading-relaxed">
            Repo2Demo is a UI-first tool designed to help developers explain
            repositories quickly, clearly, and honestly. It does not compile
            code. It does not run builds. It does not pretend to understand
            intent better than you do.
          </p>

          <p className="mt-4 font-mono text-sm md:text-base leading-relaxed">
            Instead, it surfaces structure, highlights entry points, and helps
            you construct a demo narrative — the way engineers already do in
            interviews, reviews, and walkthroughs.
          </p>
        </div>
      </section>

      <section className="mt-16 max-w-5xl mx-auto brutal-enter">
        <div className="border-4 border-ink bg-slab p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-black mb-6">
            HOW IT WORKS (RIGHT NOW)
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Step
              n="01"
              title="PASTE A REPO"
              desc="Provide a public GitHub URL. Private repositories are not supported."
            />
            <Step
              n="02"
              title="ANALYZE (SIMULATED)"
              desc="We show progress, logs, and pacing. Silence is worse than fake loading."
            />
            <Step
              n="03"
              title="TELL A STORY"
              desc="Tabs walk through structure, architecture, and a demo script."
            />
          </div>

          <p className="mt-6 font-mono text-xs text-ash">
            NOTE: Much of the data shown is placeholder. This is intentional.
          </p>
        </div>
      </section>

      <section className="mt-16 max-w-4xl mx-auto brutal-enter">
        <div className="border-4 border-ink bg-paper p-8 md:p-10">
          <h2 className="text-xl md:text-2xl font-black">
            WHAT THIS IS NOT
          </h2>

          <ul className="mt-4 list-disc list-inside font-mono text-sm md:text-base space-y-2">
            <li>Not an AI code reviewer</li>
            <li>Not a build system</li>
            <li>Not a replacement for understanding your own code</li>
            <li>Not subtle</li>
          </ul>

          <p className="mt-6 font-mono text-xs text-ash">
            Brutalist UI rule: do not hide limitations — frame them.
          </p>
        </div>
      </section>

      <footer className="mt-16 text-center font-mono text-xs text-ash">
        Repo2Demo • UI Prototype • Built loud on purpose
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


