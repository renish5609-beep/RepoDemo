import React from "react";

export default function GlitchText({ text }) {
  return (
    <div className="relative inline-block animate-slam">
      <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none">
        <span className="relative z-10">{text}</span>

        <span
          aria-hidden
          className="absolute left-0 top-0 text-5xl md:text-6xl font-black tracking-tight leading-none text-accent opacity-70 mix-blend-multiply"
        >
          {text}
        </span>

        <span
          aria-hidden
          className="absolute left-0 top-0 text-5xl md:text-6xl font-black tracking-tight leading-none text-ink opacity-20"
        >
          {text}
        </span>
      </h1>
    </div>
  );
}

