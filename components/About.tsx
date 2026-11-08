import { profile } from "@/lib/data";

export default function About() {
  return (
    <section className="max-w-prose space-y-4 leading-normal text-neutral-700 dark:text-neutral-300">
      {profile.about.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>
  );
}
