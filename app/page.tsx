import { Hero } from "@/components/home/Hero";
import { Expertise } from "@/components/home/Expertise";
import { Work } from "@/components/home/Work";
import { HowIWork } from "@/components/home/HowIWork";
import { Testimonials } from "@/components/home/Testimonials";
import { ArtworkStrip } from "@/components/home/ArtworkStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Expertise />
      <Work />
      <HowIWork />
      <Testimonials />
      <ArtworkStrip />
    </>
  );
}
