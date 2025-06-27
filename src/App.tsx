import React from "react";
import { Hero } from "./components/hero";
import { AboutSection } from "./components/about-section";
import { SisterStore } from "./components/sister-store";
import { LocationSection } from "./components/location-section";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import { FeaturedCollection } from "./components/featured-collection";
import { CollectionPage } from "./components/collection-page";

export default function App() {
  const [currentPage, setCurrentPage] = React.useState("home");
  
  // Simple routing function
  React.useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      if (path === "/collection") {
        setCurrentPage("collection");
      } else {
        setCurrentPage("home");
      }
    };
    
    // Initial route check
    handleRouteChange();
    
    // Listen for popstate events (back/forward navigation)
    window.addEventListener("popstate", handleRouteChange);
    
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {currentPage === "home" ? (
          <>
            <Hero />
            <AboutSection />
            <FeaturedCollection />
            <SisterStore />
            <LocationSection />
          </>
        ) : (
          <CollectionPage />
        )}
      </main>
      <Footer />
    </div>
  );
}