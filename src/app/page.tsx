import Contact from "@/components/Contact";
import FooterReveal from "@/components/FooterReveal";
import HeroAboutTransition from "@/components/HeroTransition";
import Info from "@/components/Info";
import Videos from "@/components/Videos";

export default function Home() {
  return (
    <div>
      <HeroAboutTransition />
      <Info />
      <Videos />
      <FooterReveal />
    </div>
  );
}
