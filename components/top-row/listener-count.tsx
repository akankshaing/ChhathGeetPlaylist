"use client";

import { useEffect, useState } from "react";

export function ListenerCount() {
  const [count, setCount] = useState(212);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCount((prev) => {
        const drift = Math.round((Math.random() - 0.5) * 6);
        return Math.max(48, prev + drift);
      });
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-1.5 font-utility text-xs tabular text-cream/80">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
      </span>
      <span>{count} listening</span>
    </div>
  );
}
