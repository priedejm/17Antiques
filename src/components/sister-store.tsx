import React from "react";
import { Card, CardBody, CardFooter, Button, Link, Image, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

export const SisterStore = () => {
  return (
    <section id="sister-store" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-medium mb-4">Visit Our Sister Store</h2>
          <Divider className="max-w-xs mx-auto" />
          <p className="mt-6 text-lg max-w-2xl mx-auto">
            Explore our family of stores dedicated to bringing you the finest in antique and vintage treasures.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <Card className="border border-divider">
            <CardBody className="overflow-hidden p-0">
              <Image
                removeWrapper
                alt="Vintage Finds & Co. store front"
                className="w-full h-64 object-cover"
                src="https://img.heroui.chat/image/furniture?w=800&h=500&u=vintage-store"
              />
            </CardBody>
            <CardBody className="text-center py-6">
              <h3 className="text-xl font-serif mb-2">Vintage Finds & Co.</h3>
              <p className="text-default-500">
                Specializing in mid-century modern furniture, vintage decor, and retro accessories.
                Located just 10 minutes from our main store at 42 North Market Street.
              </p>
            </CardBody>
            <CardFooter className="flex justify-center pb-6">
              <Button 
                color="primary"
                variant="flat"
                endContent={<Icon icon="lucide:map-pin" />}
              >
                Visit In Person
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};