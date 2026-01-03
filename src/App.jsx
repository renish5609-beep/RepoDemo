import React, { useMemo, useState } from "react";
import Landing from "./components/Landing.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import Tabs from "./components/Tabs.jsx";

export default function App() {
  const [view, setView] = useState("landing"); // landing | loading | app
  const [repoUrl, setRepoUrl] = useState("");

  const onGenerate = (url) => {
    setRepoUrl(url);
    setView("loading");
  };

  const onLoadingDone = () => setView("app");

  const headerTagline = useMemo(() => {
    return "TURN A REPO INTO A DEMO. FAST. LOUD. HONEST.";
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink">
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
        <Tabs repoUrl={repoUrl} onBack={() => setView("landing")} />
      )}
    </div>
  );
}
