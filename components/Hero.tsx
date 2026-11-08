import { profile } from "@/lib/data";

export default function Hero() {
    return (
        <section>
            <h1 className="font-serif whitespace-nowrap text-[clamp(2.5rem,12vw,4.5rem)] leading-none font-semibold tracking-tight">{profile.name}</h1>
            <p className="font-mono mt-2 text-xl text-neutral-500">{profile.tagline}</p>
        </section>
    );
}