import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ItemCard } from "../components/item-card";
import { getFeaturedItems } from "../data/items";
import { Item, StoreLocation } from "../types/item";
import { ContactForm } from "../components/contact-form";

export const Home: React.FC = () => {
  const [featuredItems, setFeaturedItems] = React.useState<Item[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadItems = async () => {
      try {
        const items = await getFeaturedItems();
        setFeaturedItems(items);
      } catch (error) {
        console.error("Failed to load featured items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, []);

  return (
    <div>
      {/* Hero Section - Updated to match the image */}
      <section className="relative bg-neutral-800 text-white min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://img.heroui.chat/image/furniture?w=1920&h=800&u=antique-chair"
            alt="Antique Chair"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-2xl">
            <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-4">
              Timeless Elegance,
              <br />
              <span className="text-neutral-300">Curated History</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-xl">
              Discover unique antique furniture pieces with stories to tell.
              Each item carefully selected for quality, craftsmanship, and
              character.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                as={RouterLink}
                to="/catalog"
                color="primary"
                size="lg"
                className="font-medium"
              >
                Visit Our Store
              </Button>
              <Button
                as={RouterLink}
                to="/contact"
                variant="bordered"
                color="default"
                size="lg"
                className="bg-transparent border-white text-white font-medium"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section - Moved up before Featured Items */}
      <section id="about" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold mb-4">About 17 South Antiques</h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto mb-8"></div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img
              src="https://img.heroui.chat/image/places?w=800&h=600&u=antique-interior"
              alt="About 17 South Antiques"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div className="md:w-1/2">
            <p className="text-default-600 mb-4">
              Since 1995, 17 South Antiques has been a trusted source for fine antiques and collectibles. 
              What began as a small passion project has grown into two thriving locations serving collectors 
              and interior designers throughout the region.
            </p>
            <p className="text-default-600 mb-6">
              Our expert team carefully curates each piece in our collection, ensuring authenticity, 
              quality, and historical significance. Whether you're a seasoned collector or just beginning 
              to appreciate the beauty of antiques, we're here to help you find the perfect addition to your home.
            </p>
            <Divider className="my-6" />
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                as="button"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                color="primary"
                endContent={<Icon icon="lucide:mail" />}
              >
                Contact Us
              </Button>
              <Button
                as={RouterLink}
                to="/catalog"
                variant="flat"
                color="primary"
                endContent={<Icon icon="lucide:arrow-right" />}
              >
                Browse Catalog
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items - Now after Our Story */}
      <section className="container mx-auto px-4 py-16 bg-neutral-50">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold mb-4">Featured Items</h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto mb-8"></div>
          <p className="text-default-600 max-w-2xl mx-auto">
            Discover our most exceptional pieces currently available in our stores.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="w-full h-96">
                <CardBody className="flex items-center justify-center">
                  <div className="animate-pulse flex flex-col items-center space-y-4 w-full">
                    <div className="bg-default-200 h-48 w-full rounded"></div>
                    <div className="h-4 bg-default-200 rounded w-3/4"></div>
                    <div className="h-4 bg-default-200 rounded w-1/2"></div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <ItemCard key={item.id} item={item} hideFeaturedChip={true} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            as={RouterLink}
            to="/catalog"
            color="primary"
            variant="flat"
            size="lg"
            endContent={<Icon icon="lucide:arrow-right" />}
          >
            View All Items
          </Button>
        </div>
      </section>

      {/* Store Locations */}
      <section className="bg-content2 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold mb-4">Our Locations</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-8"></div>
            <p className="text-default-600 max-w-2xl mx-auto">
              Visit us at our two convenient locations to explore our full collection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <img
                src="https://img.heroui.chat/image/places?w=800&h=400&u=store1"
                alt="17 South Antiques"
                className="w-full h-64 object-cover"
              />
              <CardBody>
                <h3 className="font-playfair text-2xl font-semibold mb-2">
                  {StoreLocation.SOUTH_ANTIQUES}
                </h3>
                <p className="text-default-600 mb-4">
                  Our flagship store featuring a wide range of antique furniture, art, and collectibles.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:map-pin" className="text-primary" />
                    <span>4 Avondale Ave, Charleston, SC 29407</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:phone" className="text-primary" />
                    <span>(843) 555-0123</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:clock" className="text-primary" />
                    <span>Mon-Sat: 10am-6pm, Sun: 12pm-5pm</span>
                  </div>
                </div>
                <Button
                  as="a"
                  href="https://www.google.com/maps/dir/?api=1&destination=4+Avondale+Ave,+Charleston,+SC+29407"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  variant="flat"
                  className="w-full"
                  endContent={<Icon icon="lucide:external-link" />}
                >
                  Get Directions
                </Button>
              </CardBody>
            </Card>

            <Card className="overflow-hidden">
              <img
                src="https://img.heroui.chat/image/places?w=800&h=400&u=store2"
                alt="Antiques S Windermere"
                className="w-full h-64 object-cover"
              />
              <CardBody>
                <h3 className="font-playfair text-2xl font-semibold mb-2">
                  {StoreLocation.WINDERMERE}
                </h3>
                <p className="text-default-600 mb-4">
                  Our Windermere location specializing in fine jewelry, porcelain, and decorative arts.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:map-pin" className="text-primary" />
                    <span>22 Windermere Blvd, Charleston, SC 29407</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:phone" className="text-primary" />
                    <span>(843) 555-0456</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:clock" className="text-primary" />
                    <span>Tue-Sat: 11am-7pm, Sun: 12pm-5pm, Mon: Closed</span>
                  </div>
                </div>
                <Button
                  as="a"
                  href="https://www.google.com/maps/dir/?api=1&destination=22+Windermere+Blvd,+Charleston,+SC+29407"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  variant="flat"
                  className="w-full"
                  endContent={<Icon icon="lucide:external-link" />}
                >
                  Get Directions
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold mb-4">Contact Us</h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto mb-8"></div>
          <p className="text-default-600 max-w-2xl mx-auto">
            Have questions about our items or want to schedule a visit? 
            Reach out to us and we'll be happy to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="font-playfair text-2xl font-semibold mb-6">Get In Touch</h3>
            <ContactForm />
          </div>
          
          <div>
            <h3 className="font-playfair text-2xl font-semibold mb-6">Our Locations</h3>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex gap-3">
                  <Icon icon="lucide:landmark" className="text-primary text-xl" />
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">{StoreLocation.SOUTH_ANTIQUES}</p>
                    <p className="text-small text-default-500">Our flagship store</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Icon icon="lucide:map-pin" className="text-primary mt-1" />
                      <div>
                        <p>4 Avondale Ave</p>
                        <p>Charleston, SC 29407</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Icon icon="lucide:phone" className="text-primary" />
                      <p>(843) 555-0123</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Icon icon="lucide:mail" className="text-primary" />
                      <p>info@17southantiques.com</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Icon icon="lucide:clock" className="text-primary mt-1" />
                      <div>
                        <p>Monday - Saturday: 10am - 6pm</p>
                        <p>Sunday: 12pm - 5pm</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader className="flex gap-3">
                  <Icon icon="lucide:building" className="text-primary text-xl" />
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">{StoreLocation.WINDERMERE}</p>
                    <p className="text-small text-default-500">Our Windermere location</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Icon icon="lucide:map-pin" className="text-primary mt-1" />
                      <div>
                        <p>22 Windermere Blvd</p>
                        <p>Charleston, SC 29407</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Icon icon="lucide:phone" className="text-primary" />
                      <p>(843) 555-0456</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Icon icon="lucide:mail" className="text-primary" />
                      <p>windermere@17southantiques.com</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Icon icon="lucide:clock" className="text-primary mt-1" />
                      <div>
                        <p>Tuesday - Saturday: 11am - 7pm</p>
                        <p>Sunday: 12pm - 5pm</p>
                        <p>Monday: Closed</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mb-8">
          <h3 className="font-playfair text-2xl font-semibold mb-6 text-center">Find Us</h3>
          <div className="bg-default-100 rounded-lg h-96 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed/v1/search?key=AIzaSyCbSGMNp5nACfY5Ubn9yKO1UmeMDb3krAQ&q=17+South+Antiques+at+4+Avondale+Ave+Charleston+SC+29407,Antiques+S+Windermere+at+22+Windermere+Blvd+Charleston+SC+29407&zoom=15&maptype=roadmap"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="17 South Antiques and Antiques S Windermere Locations"
            ></iframe>
          </div>
          <div className="mt-4 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as="a"
                href="https://www.google.com/maps/dir/?api=1&destination=4+Avondale+Ave,+Charleston,+SC+29407"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                variant="flat"
                startContent={<Icon icon="lucide:map-pin" />}
              >
                Get Directions to 17 South
              </Button>
              <Button
                as="a"
                href="https://www.google.com/maps/dir/?api=1&destination=22+Windermere+Blvd,+Charleston,+SC+29407"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                variant="flat"
                startContent={<Icon icon="lucide:map-pin" />}
              >
                Get Directions to Windermere
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};