import Hero from "@/components/Hero";
import Stack from "@/components/Stack";
import About from "@/components/About";
import Socials from "@/components/Socials";
import DiscordPresence from "@/components/DiscordPresence";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-8 py-16 lg:py-48">
      <ThemeToggle />
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-72">
        <div className="space-y-12 lg:sticky lg:top-24 lg:self-start">
          <div className="motion-safe:animate-fade-up">
            <Hero />
          </div>
          <div className="motion-safe:animate-fade-up [animation-delay:100ms]">
            <Stack />
          </div>
          <div className="motion-safe:animate-fade-up [animation-delay:200ms]">
            <About />
          </div>
          <div className="motion-safe:animate-fade-up [animation-delay:300ms]">
            <Socials />
          </div>
        </div>

        <div className="space-y-6">
          <DiscordPresence />
        </div>
      </div>
      <div className="motion-safe:animate-fade-up [animation-delay:300ms]">
        <Footer />
      </div>
    </main>
  );
}
