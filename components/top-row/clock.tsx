"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export function Clock() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setNow(formatter.format(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) {
    return <span className="font-utility text-sm tabular text-cream/90">--:--</span>;
  }

  const [time, meridiem] = now.split(" ");
  const [hour, minute] = time.split(":");

  return (
    <span className="font-utility text-sm tabular text-cream/90" aria-label={`Current time in India ${now}`}>
      {hour}
      <span className="animate-blink">:</span>
      {minute}
      <span className="ml-1 text-[10px] text-cream/60">{meridiem}</span>
    </span>
  );
}
