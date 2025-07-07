import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardBody, CardFooter, Button, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Item } from "../types/item";

interface ItemCardProps {
  item: Item;
  hideFeaturedChip?: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, hideFeaturedChip = false }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden h-full">
      <div className="relative">
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-auto object-cover"
          style={{
            aspectRatio: 'auto', // Let the image maintain its natural aspect ratio
            maxHeight: '400px', // Prevent extremely tall images
            minHeight: '200px' // Ensure minimum height for very wide images
          }}
        />
        {item.featured && !hideFeaturedChip && (
          <div className="absolute top-2 right-2">
            <Chip 
              color="warning" 
              variant="solid" 
              startContent={<Icon icon="lucide:star" />}
              className="shadow-md font-medium text-sm"
            >
              Featured
            </Chip>
          </div>
        )}
        <div className="absolute bottom-2 left-2">
          <Chip 
            color="primary" 
            variant="solid"
            className="shadow-md font-medium text-sm"
          >
            {item.storeLocation}
          </Chip>
        </div>
      </div>
      
      <CardBody className="pb-0">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-playfair text-lg font-semibold line-clamp-2">{item.name}</h3>
          <p className="font-semibold text-primary">{formatPrice(item.price)}</p>
        </div>
        <div className="flex flex-wrap gap-1 md:gap-2 mb-2">
          <Chip size="sm" variant="flat" className="text-xs">{item.category}</Chip>
          <Chip size="sm" variant="flat" className="text-xs">{item.period}</Chip>
          <Chip size="sm" variant="flat" className="text-xs">{item.condition}</Chip>
        </div>
        <p className="text-default-600 line-clamp-3 text-sm">{item.description}</p>
      </CardBody>
      
      <CardFooter>
        <Button 
          as={RouterLink}
          to={`/catalog/${item.id}`}
          color="primary" 
          variant="flat" 
          className="w-full"
          endContent={<Icon icon="lucide:arrow-right" />}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};