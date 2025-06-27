import React from "react";
import { Card, CardBody, CardFooter, Button, Image, Divider, Badge } from "@heroui/react";
import { Icon } from "@iconify/react";

const furnitureItems = [
  {
    id: 1,
    name: "Victorian Mahogany Sideboard",
    era: "1880s",
    price: "$2,450",
    image: "https://img.heroui.chat/image/furniture?w=600&h=800&u=antique-sideboard",
    isNew: true
  },
  {
    id: 2,
    name: "Art Deco Walnut Armchair",
    era: "1930s",
    price: "$1,875",
    image: "https://img.heroui.chat/image/furniture?w=600&h=800&u=antique-chair",
    isNew: false
  },
  {
    id: 3,
    name: "French Provincial Dresser",
    era: "Early 1900s",
    price: "$3,200",
    image: "https://img.heroui.chat/image/furniture?w=600&h=800&u=antique-dresser",
    isNew: true
  },
  {
    id: 4,
    name: "Edwardian Writing Desk",
    era: "1910s",
    price: "$1,950",
    image: "https://img.heroui.chat/image/furniture?w=600&h=800&u=antique-desk",
    isNew: false
  }
];

export const FeaturedCollection = () => {
  return (
    <section className="py-20 bg-content2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-medium mb-4">Featured Collection</h2>
          <Divider className="max-w-xs mx-auto" />
          <p className="mt-6 text-lg max-w-2xl mx-auto">
            Discover our latest acquisitions and timeless favorites from our carefully curated collection.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {furnitureItems.map((item) => (
            <Card key={item.id} className="border border-divider h-full">
              <CardBody className="p-0 overflow-hidden relative">
                <Image
                  removeWrapper
                  alt={item.name}
                  className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
                  src={item.image}
                />
                {item.isNew && (
                  <Badge 
                    content="New Arrival" 
                    color="primary" 
                    placement="top-right"
                    className="m-2"
                  />
                )}
              </CardBody>
              <CardBody className="pt-4 pb-2">
                <h3 className="font-serif text-lg font-medium">{item.name}</h3>
                <div className="flex items-center mt-1 text-default-500">
                  <Icon icon="lucide:clock" size={16} className="mr-1" />
                  <span className="text-sm">{item.era}</span>
                </div>
                <p className="text-primary font-medium mt-2">{item.price}</p>
              </CardBody>
              <CardFooter className="pt-0">
                <Button 
                  color="primary" 
                  variant="flat" 
                  fullWidth
                  startContent={<Icon icon="lucide:info" size={16} />}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            color="primary"
            size="lg"
            endContent={<Icon icon="lucide:chevron-right" />}
          >
            View Full Collection
          </Button>
        </div>
      </div>
    </section>
  );
};