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
  const [isVisible, setIsVisible] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-700 ease-out ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-8 opacity-0 scale-95'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card 
        className={`overflow-hidden cursor-pointer transition-all duration-500 ease-out transform ${
          isHovered 
            ? 'shadow-2xl -translate-y-2 scale-[1.02]' 
            : 'shadow-lg translate-y-0 scale-100'
        } hover:shadow-2xl`}
      >
        <div className="relative overflow-hidden group">
          <div className="overflow-hidden">
            <img
              src={item.images[0]}
              alt={item.name}
              className={`w-full h-auto object-cover transition-all duration-700 ease-out transform ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              style={{
                aspectRatio: 'auto',
                maxWidth: '100%',
                height: 'auto'
              }}
            />
          </div>
          
          {/* Overlay that appears on hover */}
          <div className={`absolute inset-0 bg-black transition-all duration-500 ${
            isHovered ? 'bg-opacity-20' : 'bg-opacity-0'
          }`} />
          
          {/* Featured chip */}
          {item.featured && !hideFeaturedChip && (
            <div className={`absolute top-2 right-2 transition-all duration-500 transform ${
              isVisible 
                ? 'translate-y-0 opacity-100 scale-100' 
                : '-translate-y-2 opacity-0 scale-90'
            }`}>
              <Chip 
                color="warning" 
                variant="solid" 
                startContent={<Icon icon="lucide:star" className="animate-pulse" />}
                className="shadow-lg font-medium text-sm backdrop-blur-sm bg-opacity-95 transition-all duration-300 hover:scale-105"
              >
                Featured
              </Chip>
            </div>
          )}
          
          {/* Store location chip */}
          <div className={`absolute bottom-2 left-2 transition-all duration-700 transform ${
            isVisible 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-4 opacity-0 scale-90'
          }`} style={{ transitionDelay: '200ms' }}>
            <Chip 
              color="primary" 
              variant="solid"
              className="shadow-lg font-medium text-sm backdrop-blur-sm bg-opacity-95 transition-all duration-300 hover:scale-105"
            >
              {item.storeLocation}
            </Chip>
          </div>
          
          {/* Quick view overlay button (appears on hover) */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <Button
              as={RouterLink}
              to={`/catalog/${item.id}`}
              color="primary"
              variant="solid"
              size="lg"
              className="transform transition-all duration-300 hover:scale-110 shadow-2xl backdrop-blur-sm"
              startContent={<Icon icon="lucide:eye" />}
            >
              Quick View
            </Button>
          </div>
        </div>
        
        <CardBody className={`pb-0 transition-all duration-500 ${
          isHovered ? 'transform translate-y-1' : ''
        }`}>
          <div className={`flex justify-between items-start mb-2 transition-all duration-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`} style={{ transitionDelay: '300ms' }}>
            <h3 className="font-playfair text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {item.name}
            </h3>
            <p className={`font-semibold text-primary transition-all duration-500 transform ${
              isHovered ? 'scale-110 text-primary-600' : 'scale-100'
            }`}>
              {formatPrice(item.price)}
            </p>
          </div>
          
          <div className={`flex flex-wrap gap-1 md:gap-2 mb-2 transition-all duration-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`} style={{ transitionDelay: '400ms' }}>
            {[item.category, item.period, item.condition].map((tag, index) => (
              <Chip 
                key={index}
                size="sm" 
                variant="flat" 
                className={`text-xs transition-all duration-300 hover:scale-105 ${
                  isHovered ? 'bg-primary-50 text-primary-700' : ''
                }`}
                style={{
                  transitionDelay: `${(index + 1) * 100}ms`
                }}
              >
                {tag}
              </Chip>
            ))}
          </div>
          
          <p className={`text-default-600 line-clamp-3 text-sm transition-all duration-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`} style={{ transitionDelay: '500ms' }}>
            {item.description}
          </p>
        </CardBody>
        
        <CardFooter className={`transition-all duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`} style={{ transitionDelay: '600ms' }}>
          <Button 
            as={RouterLink}
            to={`/catalog/${item.id}`}
            color="primary" 
            variant="flat" 
            className={`w-full transition-all duration-300 transform ${
              isHovered 
                ? 'bg-primary text-white shadow-lg scale-105' 
                : 'hover:scale-105'
            }`}
            endContent={
              <Icon 
                icon="lucide:arrow-right" 
                className={`transition-transform duration-300 ${
                  isHovered ? 'translate-x-1' : ''
                }`}
              />
            }
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};