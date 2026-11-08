import { socials } from "@/lib/data";

export default function Socials() {
  return (
    <section>
      <ul className="mt-8 flex flex-row gap-6 text-sm">
        {socials.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="link-underline text-neutral-500 transition-colors duration-300 hover:text-foreground"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
