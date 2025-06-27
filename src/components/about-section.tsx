import React from "react";
import { Card, CardBody, Image, Divider } from "@heroui/react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-content1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-medium mb-4">About 17 South Antiques</h2>
          <Divider className="max-w-xs mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg mb-6 leading-relaxed">
              Founded in 2005, 17 South Antiques has been a destination for collectors, 
              designers, and homeowners seeking distinctive furniture pieces with history and character.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              Our carefully curated collection spans multiple eras and styles, from Victorian 
              elegance to Mid-Century Modern classics. Each piece is thoughtfully selected 
              for its craftsmanship, condition, and unique story.
            </p>
            <p className="text-lg leading-relaxed">
              We pride ourselves on expert knowledge, authentic pieces, and personalized 
              service to help you find the perfect addition to your home or collection.
            </p>
          </div>
          
          <Card shadow="none" className="border border-divider overflow-hidden">
            <CardBody className="p-0">
              <Image
                removeWrapper
                alt="Antique furniture display"
                className="object-cover w-full h-[400px]"
                src="https://img.heroui.chat/image/furniture?w=800&h=800&u=antique-display"
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
};