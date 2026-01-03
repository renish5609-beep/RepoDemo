import React from "react";

/**
 * Minimal, CSS-only glitch feel:
 * - duplicate layers
 * - slight offset on hover
 * - no smooth easing
 */
export default function GlitchText({ text }) {
  return (
    <div className="relative inline-block">
      <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none">
        <span className="relative z-10">{text}</span>
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 text-5xl md:text-6xl font-black tracking-tight leading-none text-accent opacity-70 mix-blend-multiply brutal-hover hover:-translate-x-1 hover:translate-y-0"
        >
          {text}
        </span>
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 text-5xl md:text-6xl font-black tracking-tight leading-none text-ink opacity-20 brutal-hover hover:translate-x-1 hover:-translate-y-0"
        >
          {text}
        </span>
      </h1>
    </div>
  );
}
