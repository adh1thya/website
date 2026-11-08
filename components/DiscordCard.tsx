"use client";

import { useEffect, useState } from "react";

type Status = "online" | "idle" | "dnd" | "offline";

export type CardProps = {
  username: string;
  globalName: string;
  status: Status;
  avatarUrl: string;
  avatarDecorationUrl?: string;
  guildTagBadgeUrl?: string;
  guildTagName?: string;
  activity?: {
    name: string;
    largeImageUrl?: string;
    smallImageUrl?: string;
    details?: string;
    state?: string;
    startTime: number;
    endTime?: number;
    isActive: boolean;
  };
  song?: {
    title: string;
    artist?: string;
    albumArt?: string;
    startTime: number;
    endTime?: number;
    isActive: boolean;
  };
};

const statusColors: Record<Status, string> = {
  online: "bg-green-400",
  idle: "bg-orange-400",
  dnd: "bg-red-400",
  offline: "bg-gray-400",
};

function useNow() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return now;
}

function getTimeElapsed(timestamp: number, now: number) {
  const elapsedTime = Math.max(0, Math.floor((now - timestamp) / 1000));
  const x = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  const minutes = x % 60;
  const hours = Math.floor(x / 60);

  return { hours, minutes, seconds };
}

function getTimeStr(startTime: number, endTime: number | undefined, isActive: boolean, now: number) {
  if (isActive) {
    const { hours, minutes, seconds } = getTimeElapsed(startTime, now);
    const pad = (n: number) => n.toString().padStart(2, "0");
    if (hours === 0) return `${pad(minutes)}:${pad(seconds)} elapsed`;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)} elapsed`;
  }

  if (endTime) {
    const { hours, minutes } = getTimeElapsed(endTime, now);
    return hours === 0 ? `${minutes}m ago` : `${hours}h ${minutes}m ago`;
  }

  return "a while ago";
}

function Elapsed({ startTime, endTime, isActive }: {
  startTime: number;
  endTime?: number;
  isActive: boolean;
}) {
  const now = useNow();
  if (now === null) return null;
  return <span>{getTimeStr(startTime, endTime, isActive, now)}</span>;
}

export default function Card({
  username,
  globalName,
  status,
  avatarUrl,
  avatarDecorationUrl,
  guildTagBadgeUrl,
  guildTagName,
  activity,
  song,
}: CardProps) {
  return (
  <div className="flex w-full max-w-96 flex-col gap-4 rounded-xl border-2 border-card-border bg-card p-4">
    <div className="flex flex-row items-center gap-4">
      <div className="relative h-16 w-16 shrink-0">
        <img src={avatarUrl} alt={globalName} className="h-16 w-auto rounded-full" />
        {avatarDecorationUrl && (
          <img src={avatarDecorationUrl} alt="" className="absolute -left-2 -top-2 h-20 w-20 max-w-none" />
        )}
        <div className={`absolute bottom-0.5 right-0.5 h-4 w-4 rounded-full ${statusColors[status]} ring-4 ring-card`} />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2">
          <span className="text-lg font-bold text-foreground">{globalName}</span>
          {guildTagName && (
            <div className="flex flex-row items-center gap-1 rounded border border-card-border bg-card-inset px-1.5 text-sm font-semibold text-foreground">
              {guildTagBadgeUrl && <img src={guildTagBadgeUrl} alt="" className="h-4 w-4" />}
              <span>{guildTagName}</span>
            </div>
          )}
        </div>
        <span className="text-xs text-foreground">@{username}</span>
      </div>
    </div>

    {activity && (
      <div className="flex flex-row items-center gap-4 rounded-xl border border-card-inset-border bg-card-inset p-3">
        {activity.largeImageUrl && (
          <div className="relative shrink-0">
            <img src={activity.largeImageUrl} alt={activity.name} className="h-20 w-auto rounded-xl" />
            {activity.smallImageUrl && (
              <img src={activity.smallImageUrl} alt="" className="absolute -bottom-2 -right-2 h-8 w-auto rounded-full ring-4 ring-card-inset" />
            )}
          </div>
        )}
        <div className="flex flex-col">
          <div className="font-semibold text-foreground">{activity.name}</div>
          <div className="flex flex-col text-sm text-neutral-500 dark:text-zinc-400">
            <span>{activity.details}</span>
            <span>{activity.state}</span>
            <Elapsed startTime={activity.startTime} endTime={activity.endTime} isActive={activity.isActive} />
          </div>
        </div>
      </div>
    )}

    {song && (
      <div className="flex flex-row items-center gap-4 rounded-xl border border-card-inset-border bg-card-inset p-3">
        {song.albumArt && (
          <img src={song.albumArt} alt={song.title} className="h-20 w-auto shrink-0 rounded-xl" />
        )}
        <div className="flex flex-col">
          <div className="font-semibold text-foreground">Spotify</div>
          <div className="flex flex-col text-sm text-neutral-500 dark:text-zinc-400">
            <span>{song.title}</span>
            <span>{song.artist}</span>
            <Elapsed startTime={song.startTime} endTime={song.endTime} isActive={song.isActive} />
          </div>
        </div>
      </div>
    )}
  </div>
);
}