import { stack } from "@/lib/data";

export default function Stack() {
  return (
    <section>
      <h2 className="sr-only">Stack</h2>
      <ul className="grid grid-flow-col auto-cols-[minmax(0,3.5rem)] gap-1 sm:gap-2">
        {stack.map(({ name, icon: Icon }) => (
          <li
            key={name}
            title={name}
            className="flex items-center justify-center py-2 text-neutral-700 dark:text-neutral-300"
          >
            <Icon className="size-5 shrink-0" role="img" aria-label={name} />
          </li>
        ))}
      </ul>
    </section>
  );
}
