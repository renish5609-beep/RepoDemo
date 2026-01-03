import React, { useMemo, useState, useEffect } from "react";
import Landing from "./components/Landing.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import Tabs from "./components/Tabs.jsx";

export default function App() {
  const [view, setView] = useState("landing");
  const [repoUrl, setRepoUrl] = useState("");
  const [runCount, setRunCount] = useState(0);
  const [lastAction, setLastAction] = useState("init");

  const onGenerate = (url) => {
    setRepoUrl(url);
    setRunCount((c) => c + 1);
    setLastAction("generate");
    setView("loading");
  };

  const onLoadingDone = () => {
    setLastAction("loading_done");
    setView("app");
  };

  const onBackToLanding = () => {
    setLastAction("reset");
    setView("landing");
  };

  const headerTagline = useMemo(() => {
    return "TURN A REPO INTO A DEMO. FAST. LOUD. HONEST.";
  }, []);

  const viewLabel = useMemo(() => {
    if (view === "landing") return "ENTRY";
    if (view === "loading") return "TRANSITION";
    if (view === "app") return "INTERFACE";
    return "UNKNOWN";
  }, [view]);

  useEffect(() => {
    console.log(
      `[App] view=${view} action=${lastAction} runs=${runCount}`
    );
  }, [view, lastAction, runCount]);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="sr-only">
        STATE:{viewLabel}|RUNS:{runCount}|ACTION:{lastAction}
      </div>

      {view === "landing" && (
        <Landing
          tagline={headerTagline}
          onGenerate={onGenerate}
        />
      )}

      {view === "loading" && (
        <LoadingScreen
          repoUrl={repoUrl}
          onDone={onLoadingDone}
        />
      )}

      {view === "app" && (
        <Tabs
          repoUrl={repoUrl}
          onBack={onBackToLanding}
        />
      )}
    </div>
  );
}
