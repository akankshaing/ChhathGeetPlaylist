"use client";

type VinylProps = {
  size: number;
  isPlaying: boolean;
  vinylMountRef: (node: HTMLDivElement | null) => void;
};

export function Vinyl({ size, isPlaying, vinylMountRef }: VinylProps) {
  return (
    <div
      className="relative shrink-0 animate-spin-slow rounded-full ring-1 ring-white/15 shadow-[0_6px_20px_-6px_rgba(0,0,0,0.7)]"
      style={{
        width: size,
        height: size,
        animationPlayState: isPlaying ? "running" : "paused",
      }}
    >
      <div
        ref={vinylMountRef}
        className="relative h-full w-full overflow-hidden rounded-full bg-indigo-deep [&_iframe]:pointer-events-none [&_iframe]:absolute [&_iframe]:left-1/2 [&_iframe]:top-1/2 [&_iframe]:h-[180%] [&_iframe]:w-[180%] [&_iframe]:-translate-x-1/2 [&_iframe]:-translate-y-1/2"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 ring-2 ring-white/40"
        style={{ width: 12, height: 12 }}
      />
    </div>
  );
}
