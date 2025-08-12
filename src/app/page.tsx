import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import HeroAboutTransition from "@/components/HeroTransition";
import Info from "@/components/Info";
import Videos from "@/components/Videos";

export default function Home() {
  return (
    <div>
      <HeroAboutTransition />

      <Info />
      <Videos />
      <Contact />
    </div>
  );
}
