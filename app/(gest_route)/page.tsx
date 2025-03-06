"use client";
import { About } from "@/components/landing-page/about";
import { Benefits } from "@/components/landing-page/benifits";
import { CTASection } from "@/components/landing-page/cta-section";
import { FeaturedCategories } from "@/components/landing-page/featured-categories";
import { FeaturedItems } from "@/components/landing-page/featured-items";
import { Hero } from "@/components/landing-page/hero";
import { Reviews } from "@/components/landing-page/reviews";


export default function Home() {

  return (
    <main className="min-h-screen">
      <Hero />
      <Benefits />
      <hr className="w-10/12 justify-self-center " />
      <FeaturedCategories />
      <FeaturedItems />
      <Reviews />
      <hr className="w-10/12 justify-self-center " />
      <About />
      <CTASection />
    </main>
  );

}
