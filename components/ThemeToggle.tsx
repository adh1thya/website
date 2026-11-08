"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { LuMoon, LuSun } from "react-icons/lu";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function applyTheme(next: boolean) {
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    flushSync(() => setDark(next));
  }

  function toggle(e: MouseEvent<HTMLButtonElement>) {
    const next = !dark;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || reduceMotion) {
      applyTheme(next);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const root = document.documentElement;
    root.style.setProperty("--reveal-x", `${x}px`);
    root.style.setProperty("--reveal-y", `${y}px`);
    root.style.setProperty("--reveal-r", `${radius}px`);

    document.startViewTransition(() => applyTheme(next));
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="fixed right-6 top-6 z-10 flex size-9 items-center justify-center rounded-full border border-neutral-200 bg-background text-neutral-600 transition-colors hover:text-foreground dark:border-neutral-800 dark:text-neutral-400"
    >
      {dark !== null && (dark ? <LuSun className="size-4" /> : <LuMoon className="size-4" />)}
    </button>
  );
}