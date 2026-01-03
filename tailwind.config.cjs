/** @type {import('tailwindcss').Config} */
module.exports = {
 
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],


  theme: {
    extend: {
     
      colors: {
        ink: "#0a0a0a",
        paper: "#f5f4ef",
        slab: "#ffffff",
        ash: "#1a1a1a",
        accent: "#3b82f6",

        danger: "#b91c1c",
        warning: "#d97706",
        success: "#15803d",
        muted: "#6b7280",

        terminal: {
          bg: "#020617",
          fg: "#e5e7eb",
          dim: "#9ca3af"
        }
      },

     
      boxShadow: {
        brutal: "6px 6px 0 #0a0a0a",
        brutalSm: "3px 3px 0 #0a0a0a",
        brutalLg: "10px 10px 0 #0a0a0a",
        none: "none"
      },

     
      borderWidth: {
        3: "3px",
        6: "6px",
        10: "10px"
      },

      
      fontFamily: {
        system: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "Noto Sans",
          "Apple Color Emoji",
          "Segoe UI Emoji"
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace"
        ],
        grotesk: [
          "Inter",
          "Helvetica",
          "Arial",
          "sans-serif"
        ]
      },

    
      letterSpacing: {
        brutal: "0.08em",
        tighter: "-0.03em",
        loud: "0.15em"
      },

    
      lineHeight: {
        brutal: "1.05",
        compact: "1.15",
        relaxed: "1.75"
      },

      
      scale: {
        102: "1.02",
        103: "1.03",
        105: "1.05"
      },


      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        34: "8.5rem"
      },

      
    
      zIndex: {
        1: "1",
        5: "5",
        15: "15",
        25: "25",
        50: "50",
        75: "75",
        100: "100"
      },

     
      gridTemplateColumns: {
        brutal2: "1fr 2fr",
        brutal3: "2fr 1fr 1fr",
        sidebar: "280px 1fr"
      },

     
      transitionDuration: {
        instant: "0ms",
        slow: "700ms",
        theatrical: "1200ms"
      },

      transitionTimingFunction: {
        brutal: "cubic-bezier(0.16, 1, 0.3, 1)",
        snap: "steps(2, end)"
      },

    
      opacity: {
        15: "0.15",
        35: "0.35",
        85: "0.85"
      },

     
      backgroundImage: {
        scanlines:
          "repeating-linear-gradient(to bottom, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, rgba(255,255,255,0) 2px, rgba(255,255,255,0) 6px)",
        grid:
          "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)"
      },

      backgroundSize: {
        grid: "24px 24px"
      },

     
      cursor: {
        loud: "crosshair",
        blocked: "not-allowed"
      },

      
      maxWidth: {
        brutal: "72rem",
        reading: "64ch"
      }
    }
  },

 
  plugins: [
    // intentionally empty
    // brutalism favors explicit CSS over magic
  ]
};
