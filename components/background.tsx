"use client";

import { useEffect, useRef, useState } from "react";
import type { SceneKey } from "@/lib/playlists";

type BackgroundProps = {
  scene: SceneKey;
};

const SCENE_IMAGE: Record<SceneKey, string> = {
  morning: "/bg/morning-wide.webp",
  evening: "/bg/evening-wide.webp",
  night: "/bg/night-wide.webp",
};

export function Background({ scene }: BackgroundProps) {
  // Two stacked layers so switching scenes crossfades instead of cutting.
  const [layers, setLayers] = useState<[SceneKey, SceneKey]>([scene, scene]);
  const [topLayer, setTopLayer] = useState<0 | 1>(0);
  const previousScene = useRef(scene);

  useEffect(() => {
    if (scene === previousScene.current) return;
    previousScene.current = scene;
    const nextTop = topLayer === 0 ? 1 : 0;

    let cancelled = false;
    let rafId: number | null = null;

    const swap = () => {
      if (cancelled) return;
      setLayers((prev) => {
        const updated: [SceneKey, SceneKey] = [...prev];
        updated[nextTop] = scene;
        return updated;
      });
      // Flip after the paint so the browser has the new image ready to fade in.
      rafId = requestAnimationFrame(() => {
        if (!cancelled) setTopLayer(nextTop);
      });
    };

    // Preload + decode the incoming image first so the crossfade never has
    // to pop in a half-loaded image partway through the opacity animation.
    const img = new Image();
    img.src = SCENE_IMAGE[scene];
    if (img.decode) {
      img.decode().then(swap).catch(swap);
    } else {
      img.onload = swap;
      img.onerror = swap;
    }
    // Safety net in case decode/onload never fires (e.g. cached edge cases).
    const fallback = window.setTimeout(swap, 400);

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {layers.map((layerScene, index) => (
        <div
          key={index}
          data-scene={layerScene}
          className="hero-bg absolute inset-0 bg-cover bg-center"
          style={{ opacity: index === topLayer ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/80" />
    </div>
  );
}
