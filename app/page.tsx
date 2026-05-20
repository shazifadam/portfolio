export const revalidate = 60;

import { Hero } from "@/components/home/Hero";
import { Work } from "@/components/home/Work";
import { HowIWork } from "@/components/home/HowIWork";
import { Testimonials } from "@/components/home/Testimonials";
import { ArtworkStrip } from "@/components/home/ArtworkStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <HowIWork />
      <Testimonials />
      <ArtworkStrip />
    </>
  );
}
