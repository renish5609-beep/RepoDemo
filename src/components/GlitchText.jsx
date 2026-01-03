import React, { useMemo } from "react";

export default function GlitchText({
  text,
  level = "heavy",      // light | medium | heavy
  as: Tag = "h1",        // semantic flexibility
  unstable = false      // allow random offsets
}) {
  const config = useMemo(() => {
    switch (level) {
      case "light":
        return {
          accentOpacity: 0.4,
          inkOpacity: 0.15,
          offset: 0.5
        };
      case "medium":
        return {
          accentOpacity: 0.6,
          inkOpacity: 0.25,
          offset: 1
        };
      case "heavy":
      default:
        return {
          accentOpacity: 0.7,
          inkOpacity: 0.35,
          offset: 1.5
        };
    }
  }, [level]);

  const chaos = unstable
    ? {
        transform: `translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)`
      }
    : undefined;

  return (
    <div
      className="relative inline-block"
      aria-label={text}
    >
      <Tag className="text-5xl md:text-6xl font-black tracking-tight leading-none">

        <span className="relative z-10">
          {text}
        </span>

        <span
          aria-hidden="true"
          className="absolute left-0 top-0 text-5xl md:text-6xl font-black tracking-tight leading-none text-accent mix-blend-multiply brutal-hover"
          style={{
            opacity: config.accentOpacity,
            transform: `translateX(-${config.offset}px)`,
            ...chaos
          }}
        >
          {text}
        </span>

        <span
          aria-hidden="true"
          className="absolute left-0 top-0 text-5xl md:text-6xl font-black tracking-tight leading-none text-ink brutal-hover"
          style={{
            opacity: config.inkOpacity,
            transform: `translateX(${config.offset}px)`
          }}
        >
          {text}
        </span>

        <span
          aria-hidden="true"
          className="absolute left-0 top-0 text-5xl md:text-6xl font-black tracking-tight leading-none text-ink opacity-10"
          style={{
            transform: "translateY(1px)"
          }}
        >
          {text}
        </span>

      </Tag>

      <span className="sr-only">
        Glitch level: {level}. Unstable: {unstable ? "true" : "false"}.
      </span>
    </div>
  );
}

