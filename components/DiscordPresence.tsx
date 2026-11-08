"use client";

import { useEffect, useState } from "react";
import DiscordCard, { type CardProps } from "@/components/DiscordCard";

const API_URL = process.env.NEXT_PUBLIC_PRESENCE_URL;
const POLL_MS = 30_000;

export default function DiscordPresence() {
  const [data, setData] = useState<CardProps | null>(null);

  useEffect(() => {
    if (!API_URL) return;
    const url: string = API_URL;

    let cancelled = false;

    async function load() {
      if (document.hidden) return;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: CardProps = await res.json();
        if (!cancelled) setData(json);
      } catch {
        // keep the last good data; show nothing if there never was any
      }
    }

    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return data ? (
    <div className="motion-safe:animate-fade-up">
      <DiscordCard {...data} />
    </div>
  ) : null;
}
