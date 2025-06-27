import React from "react";
import { Card, CardBody, CardFooter, Button, Image, Divider, Badge, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, addToast, ScrollShadow } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link } from "@heroui/react";

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

// Add more detailed images for each item
const getItemGalleryImages = (itemId) => {
  // Return array of additional images for each item
  const baseImages = [
    `https://img.heroui.chat/image/furniture?w=1200&h=900&u=antique-detail-${itemId}-1`,
    `https://img.heroui.chat/image/furniture?w=1200&h=900&u=antique-detail-${itemId}-2`,
    `https://img.heroui.chat/image/furniture?w=1200&h=900&u=antique-detail-${itemId}-3`,
  ];
  
  return baseImages;
};

export const FeaturedCollection = () => {
  const {isOpen: isDetailOpen, onOpen: onDetailOpen, onOpenChange: onDetailOpenChange} = useDisclosure();
  const {isOpen: isGalleryOpen, onOpen: onGalleryOpen, onOpenChange: onGalleryOpenChange} = useDisclosure();
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [galleryImages, setGalleryImages] = React.useState([]);
  
  const handleViewDetails = (item) => {
    setSelectedItem(item);
    onDetailOpen();
  };
  
  const handleOpenGallery = (item) => {
    setSelectedItem(item);
    // Get gallery images for this item
    setGalleryImages([item.image, ...getItemGalleryImages(item.id)]);
    onGalleryOpen();
  };
  
  const handleViewCollection = () => {
    // Remove the toast notification and scrolling behavior
    window.location.href = "/collection"; // This will be replaced by proper routing in a real app
  };
  
  return (
    <section id="featured-collection" className="py-20 bg-content2">
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
                  onPress={() => handleViewDetails(item)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            as={Link}
            href="/collection"
            color="primary"
            size="lg"
            endContent={<Icon icon="lucide:chevron-right" />}
          >
            View Full Collection
          </Button>
        </div>
        
        {/* Item Detail Modal */}
        <Modal isOpen={isDetailOpen} onOpenChange={onDetailOpenChange} size="2xl">
          <ModalContent>
            {(onClose) => selectedItem && (
              <>
                <ModalHeader className="flex flex-col gap-1 font-serif">
                  {selectedItem.name}
                </ModalHeader>
                <ModalBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Image
                        alt={selectedItem.name}
                        className="w-full h-auto object-cover rounded-lg cursor-pointer"
                        src={selectedItem.image}
                        onClick={() => handleOpenGallery(selectedItem)}
                      />
                      <p className="text-center text-small text-default-500 mt-2">
                        <Icon icon="lucide:zoom-in" className="inline mr-1" />
                        Click image to view full gallery
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">Details</h3>
                        <Divider className="my-2" />
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-default-500">Era:</span>
                            <span className="font-medium">{selectedItem.era}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-default-500">Price:</span>
                            <span className="font-medium text-primary">{selectedItem.price}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-default-500">Condition:</span>
                            <span className="font-medium">Excellent</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-default-500">Dimensions:</span>
                            <span className="font-medium">Varies</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-default-500">Material:</span>
                            <span className="font-medium">Solid Wood</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">Description</h3>
                        <Divider className="my-2" />
                        <p className="text-default-600">
                          This beautiful {selectedItem.name.toLowerCase()} exemplifies the craftsmanship of the {selectedItem.era}. 
                          Featuring exquisite detailing and superior construction, this piece has been 
                          carefully restored to preserve its original character while ensuring its 
                          functionality for modern use.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">Provenance</h3>
                        <Divider className="my-2" />
                        <p className="text-default-600">
                          Acquired from a private estate in Charleston, this piece has been 
                          authenticated by our expert team and comes with full documentation 
                          of its history and restoration process.
                        </p>
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="default" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button 
                    color="primary" 
                    endContent={<Icon icon="lucide:image" />}
                    onPress={() => handleOpenGallery(selectedItem)}
                  >
                    View Gallery
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        
        {/* Full Gallery Modal */}
        <Modal 
          isOpen={isGalleryOpen} 
          onOpenChange={onGalleryOpenChange}
          size="5xl"
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => selectedItem && (
              <>
                <ModalHeader className="flex flex-col gap-1 font-serif">
                  {selectedItem.name} Gallery
                </ModalHeader>
                <ModalBody>
                  <ScrollShadow className="h-full">
                    <div className="space-y-8">
                      {galleryImages.map((image, index) => (
                        <div key={index} className="space-y-2">
                          <Image
                            alt={`${selectedItem.name} - View ${index + 1}`}
                            className="w-full h-auto object-contain rounded-lg"
                            src={image}
                          />
                          <div className="flex justify-between items-center px-2">
                            <p className="text-default-500">
                              {index === 0 ? "Main View" : `Detail View ${index}`}
                            </p>
                            <Badge color="primary" variant="flat">
                              {selectedItem.era}
                            </Badge>
                          </div>
                          {index === 0 && (
                            <div className="bg-content1 p-4 rounded-lg mt-2">
                              <h3 className="font-medium mb-2">About This Piece</h3>
                              <p className="text-default-600">
                                This exceptional {selectedItem.name.toLowerCase()} showcases the finest 
                                craftsmanship of the {selectedItem.era}. Each detail has been meticulously 
                                preserved to maintain its historical integrity while ensuring its 
                                functionality for modern use.
                              </p>
                            </div>
                          )}
                          {index === 1 && (
                            <div className="bg-content1 p-4 rounded-lg mt-2">
                              <h3 className="font-medium mb-2">Craftsmanship Details</h3>
                              <p className="text-default-600">
                                Note the exquisite joinery and hand-carved details that exemplify 
                                the superior workmanship of this period. The patina has developed 
                                naturally over decades, giving this piece its unique character.
                              </p>
                            </div>
                          )}
                          {index === 2 && (
                            <div className="bg-content1 p-4 rounded-lg mt-2">
                              <h3 className="font-medium mb-2">Materials & Condition</h3>
                              <p className="text-default-600">
                                Constructed from solid hardwood with original hardware. 
                                This piece has been professionally restored to preserve its 
                                authentic character while ensuring structural integrity.
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollShadow>
                </ModalBody>
                <ModalFooter>
                  <Button color="default" variant="light" onPress={onClose}>
                    Close Gallery
                  </Button>
                  <Button 
                    color="primary"
                    onPress={onClose}
                  >
                    Inquire About This Item
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </section>
  );
};