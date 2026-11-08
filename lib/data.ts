import type { IconType } from "react-icons";
import {
  SiPython,
  SiTypescript,
  SiCplusplus,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiNextdotjs,
  SiMongodb,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";

export const profile = {
  name: "Adhithya S",
  tagline: "19, student, and a developer.",
  about: [
    "I'm a computer engineering student specializing in AI & ML, currently in my second year.",
    "I like working in backend systems, CLI tools and automation. I'm currently learning Rust.",
  ],
};

export const stack: { name: string; icon: IconType }[] = [
  { name: "Python", icon: SiPython },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Java", icon: FaJava },
  { name: "C++", icon: SiCplusplus },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "React", icon: SiReact },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "MongoDB", icon: SiMongodb },
];

export const socials = [
  { label: "Discord", href: "https://discord.com/users/706051058442436659" },
  { label: "GitHub", href: "https://github.com/adh1thya" },
  { label: "X", href: "https://x.com/adh1thya" },
  { label: "Mail", href: "mailto:adh1thya@adh1thya.lol" },
];
