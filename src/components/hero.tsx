import React from "react";
import { Button, Link } from "@heroui/react";
import { Icon } from "@iconify/react";

export const Hero = () => {
  return (
    <section className="relative w-full h-[70vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://img.heroui.chat/image/furniture?w=1920&h=1080&u=antique-store')",
          filter: "brightness(0.7)"
        }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mb-4">
          Timeless Elegance, <br className="hidden md:block" />
          <span className="text-primary-200">Curated History</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-xl mb-8">
          Discover unique antique furniture pieces with stories to tell. 
          Each item carefully selected for quality, craftsmanship, and character.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            as={Link}
            href="#location" 
            color="primary" 
            size="lg"
            endContent={<Icon icon="lucide:arrow-right" />}
          >
            Visit Our Store
          </Button>
          <Button 
            as={Link}
            href="#about" 
            variant="flat" 
            color="default"
            size="lg"
            className="bg-white/20 text-white"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};