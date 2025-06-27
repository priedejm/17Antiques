import React from "react";
import { Hero } from "./components/hero";
import { AboutSection } from "./components/about-section";
import { SisterStore } from "./components/sister-store";
import { LocationSection } from "./components/location-section";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import { FeaturedCollection } from "./components/featured-collection";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <FeaturedCollection />
        <SisterStore />
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
}