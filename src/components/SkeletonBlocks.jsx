import React from "react";

export default function SkeletonBlocks({ variant = "tree" }) {
  if (variant === "tree") return <TreeSkeleton />;
  if (variant === "arch") return <ArchSkeleton />;
  return <DemoSkeleton />;
}

function Block({ w = "w-full", h = "h-4" }) {
  return (
    <div className={`${w} ${h} border-2 border-ink bg-slab`} />
  );
}

function TreeSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center">
        <Block w="w-10" h="h-10" />
        <div className="flex-1 space-y-2">
          <Block w="w-1/2" />
          <Block w="w-2/3" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Block w="w-3/4" />
          <Block w="w-2/3" />
          <Block w="w-5/6" />
          <Block w="w-1/2" />
        </div>
        <div className="space-y-2">
          <Block w="w-2/3" />
          <Block w="w-3/4" />
          <Block w="w-1/2" />
          <Block w="w-5/6" />
        </div>
      </div>

      <div className="border-2 border-ink bg-paper p-4 font-mono text-xs">
        <div className="font-bold">ENTRY POINTS (FAKE)</div>
        <ul className="list-disc list-inside mt-2">
          <li>src/main.jsx</li>
          <li>src/App.jsx</li>
          <li>src/components/*</li>
        </ul>
      </div>
    </div>
  );
}

function ArchSkeleton() {
  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Frontend" lines={3} />
        <Card title="API" lines={3} />
        <Card title="AI" lines={3} />
      </div>

      <div className="border-2 border-ink bg-paper p-4">
        <div className="font-black text-lg">SYSTEM MAP (FAKE)</div>
        <div className="mt-4 grid md:grid-cols-2 gap-3">
          <Block h="h-16" />
          <Block h="h-16" />
          <Block h="h-16" />
          <Block h="h-16" />
        </div>
      </div>

      <div className="font-mono text-xs text-ash">
        Later: replace blocks with real architecture summary markdown.
      </div>
    </div>
  );
}

function DemoSkeleton() {
  return (
    <div className="space-y-5">
      <div className="border-2 border-ink bg-paper p-4">
        <div className="font-black text-lg">2-MINUTE SCRIPT (FAKE)</div>
        <ol className="mt-3 list-decimal list-inside font-mono text-sm space-y-1">
          <li>Problem: repos are hard to explain in 2 minutes.</li>
          <li>Solution: Repo2Demo maps structure + drafts a demo story.</li>
          <li>Show: Repo Map → Architecture → Demo Script.</li>
          <li>Impact: less time explaining, more time shipping.</li>
        </ol>
      </div>

      <div className="border-2 border-ink bg-paper p-4">
        <div className="font-black text-lg">SHOT LIST (FAKE)</div>
        <ul className="mt-3 list-disc list-inside font-mono text-sm space-y-1">
          <li>Paste repo URL</li>
          <li>Loading screen “LOG” lines</li>
          <li>Tab 1: Repo Map</li>
          <li>Tab 2: Architecture</li>
          <li>Tab 3: Demo Script</li>
        </ul>
      </div>

      <div className="border-2 border-ink bg-paper p-4 font-mono text-xs">
        <span className="font-bold">NOTE:</span> no backend calls exist yet.
      </div>
    </div>
  );
}

function Card({ title, lines = 3 }) {
  return (
    <div className="border-2 border-ink bg-paper p-4">
      <div className="font-black">{title}</div>
      <div className="mt-3 space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="border-2 border-ink bg-slab h-4 w-full" />
        ))}
      </div>
    </div>
  );
}
