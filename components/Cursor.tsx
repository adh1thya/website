"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setEnabled(true);
    const root = document.documentElement;
    root.classList.add("custom-cursor");

    function onMove(e: PointerEvent) {
      const el = dot.current;
      if (!el) return;
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      el.style.opacity = "1";
    }

    function onLeave() {
      if (dot.current) dot.current.style.opacity = "0";
    }

    window.addEventListener("pointermove", onMove);
    root.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("mouseleave", onLeave);
      root.classList.remove("custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dot}
      className="pointer-events-none fixed left-0 top-0 z-50 -ml-1 -mt-1 size-2 rounded-full bg-foreground opacity-0 transition-opacity duration-200"
    />
  );
}