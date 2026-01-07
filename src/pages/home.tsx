import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { getFeaturedItems } from "../data/items";
import { Item } from "../types/item";
import { ContactForm } from "../components/contact-form";
import { InstagramFeed } from "../components/instagram-feed";

export const Home: React.FC = () => {
  const [featuredItems, setFeaturedItems] = React.useState<Item[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [visibleSections, setVisibleSections] = React.useState<Set<string>>(new Set());

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

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section');
            if (sectionId) {
              setVisibleSections(prev => new Set([...prev, sectionId]));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const isVisible = (section: string) => visibleSections.has(section);

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section data-section="hero" className="bg-neutral-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className={`transition-all duration-1000 ${isVisible('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-16 h-px bg-neutral-400 mx-auto mb-6" />
            <h1 className="font-playfair text-4xl md:text-5xl font-light text-neutral-800 tracking-wide mb-4">
              17 SOUTH ANTIQUES
            </h1>
            <div className="text-sm font-light text-neutral-600 tracking-[0.2em] uppercase mb-6">
              CURATED HISTORY
            </div>
            <div className="w-16 h-px bg-neutral-400 mx-auto mb-8" />
            <p className="text-lg font-light text-neutral-700 max-w-2xl mx-auto leading-relaxed">
              4 Avondale Ave, Charleston, South Carolina • <a 
                href="tel:8435550123" 
                className="hover:text-primary transition-all duration-300 cursor-pointer bg-neutral-100 border border-neutral-200 rounded px-2 py-0.5 hover:bg-primary-50 hover:border-primary-200"
              >(843) 555-0123</a>
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 flex justify-center pt-12">
          <div className={`max-w-lg w-full transition-all duration-1200 delay-300 ${isVisible('hero') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="overflow-hidden rounded-lg shadow-2xl">
              <img
                src="assets/images/17hero.webp"
                alt="Curated Antique Interior"
                className="w-full h-[600px] md:h-[700px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" data-section="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className={`text-center mb-12 transition-all duration-1000 ${isVisible('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="w-12 h-px bg-neutral-400 mx-auto mb-6" />
              <h2 className="font-playfair text-3xl font-light text-neutral-800 tracking-wide mb-6">
                Our Story
              </h2>
              <div className="w-12 h-px bg-neutral-400 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className={`transition-all duration-1000 delay-300 ${isVisible('about') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <img
                    src="https://img.heroui.chat/image/places?w=500&h=400&u=antique-interior"
                    alt="17 South Antiques Interior"
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className={`space-y-6 transition-all duration-1000 delay-500 ${isVisible('about') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                <p className="text-neutral-700 font-light leading-relaxed px-2">
                  As residents of a timeless city, we stand for active preservation - connecting the present with the quality and beauty of the cultural past.
                </p>
                <p className="text-neutral-700 font-light leading-relaxed px-2">
                  Here you'll find old, new, and somewhere in between. Family owned and operated since 1998.
                </p>
                <div className="pt-6">
                  <Button
                    as={RouterLink}
                    to="/catalog"
                    variant="flat"
                    className="bg-transparent border border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white font-light tracking-wide px-6 py-2 transition-all duration-300 hover:scale-105"
                  >
                    VIEW COLLECTION
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section data-section="instagram" className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible('instagram') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-12 h-px bg-neutral-400 mx-auto mb-6" />
            <h2 className="font-playfair text-3xl font-light text-neutral-800 tracking-wide mb-6">
              Follow Our Journey
            </h2>
            <div className="w-12 h-px bg-neutral-400 mx-auto mb-6" />
          </div>

          <div className={`transition-all duration-1000 delay-300 ${isVisible('instagram') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <InstagramFeed />
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section data-section="featured" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible('featured') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-12 h-px bg-neutral-400 mx-auto mb-6" />
            <h2 className="font-playfair text-3xl font-light text-neutral-800 tracking-wide mb-6">
              Featured Pieces
            </h2>
            <div className="w-12 h-px bg-neutral-400 mx-auto mb-6" />
            <p className="text-neutral-700 font-light leading-relaxed max-w-2xl mx-auto">
              A selection of our most exceptional antiques currently available
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="w-full shadow-none border border-neutral-200 animate-pulse">
                  <CardBody className="p-4">
                    <div className="space-y-4">
                      <div className="bg-neutral-200 h-48 w-full rounded"></div>
                      <div className="h-3 bg-neutral-200 rounded w-3/4"></div>
                      <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredItems.slice(0, 3).map((item, index) => (
                <div
                  key={item.id}
                  className={`group cursor-pointer transition-all duration-700 ${
                    isVisible('featured') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                >
                  <div className="overflow-hidden mb-4 rounded-lg shadow-lg">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="text-center transform group-hover:translate-y-1 transition-transform duration-300">
                    <h3 className="font-playfair text-lg font-light text-neutral-800 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-neutral-600 font-light text-xs tracking-wide uppercase mb-1">
                      {item.period} • {item.storeLocation}
                    </p>
                    <p className="text-neutral-800 font-light">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={`text-center mt-12 transition-all duration-1000 delay-1000 ${isVisible('featured') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button
              as={RouterLink}
              to="/catalog"
              variant="flat"
              className="bg-transparent border border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white font-light tracking-wide px-6 py-2 transition-all duration-300 hover:scale-105"
            >
              VIEW ALL PIECES
            </Button>
            
            {/* Category Navigation */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {[
                { name: "Case goods", path: "/catalog?category=Case+goods" },
                { name: "Tabletop", path: "/catalog?category=Tabletop" },
                { name: "Mirrors", path: "/catalog?category=Mirrors" },
                { name: "Art", path: "/catalog?category=Art" },
                { name: "Lighting", path: "/catalog?category=Lighting" },
              ].map((category, index) => (
                <Button
                  key={category.name}
                  as={RouterLink}
                  to={category.path}
                  variant="bordered"
                  size="md"
                  className={`border-neutral-300 text-neutral-700 hover:border-primary hover:text-primary hover:bg-primary-50 font-medium transition-all duration-300 hover:scale-105 hover:shadow-md ${
                    isVisible('featured') ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transitionDelay: `${1200 + (index * 100)}ms` }}
                  endContent={<Icon icon="lucide:arrow-right" className="w-4 h-4" />}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Store Locations */}
      <section data-section="locations" className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible('locations') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-12 h-px bg-neutral-400 mx-auto mb-6" />
            <h2 className="font-playfair text-3xl font-light text-neutral-800 tracking-wide mb-6">
              Visit Our Showrooms
            </h2>
            <div className="w-12 h-px bg-neutral-400 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className={`text-center transition-all duration-1000 delay-300 ${isVisible('locations') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="overflow-hidden rounded-lg shadow-lg mb-6">
                <img
                  src="https://img.heroui.chat/image/places?w=400&h=250&u=showroom-1"
                  alt="17 South Antiques Showroom"
                  className="w-full h-40 object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <h3 className="font-playfair text-xl font-light text-neutral-800 mb-3 tracking-wide">
                17 SOUTH ANTIQUES
              </h3>
              <div className="text-neutral-700 font-light space-y-1 mb-4">
                <p>4 Avondale Avenue</p>
                <p>Charleston, South Carolina 29407</p>
                <p>(843) 555-0123</p>
              </div>
              <div className="text-neutral-600 font-light text-sm space-y-1 mb-6">
                <p>Monday – Saturday: 10am – 6pm</p>
                <p>Sunday: 12pm – 5pm</p>
              </div>
              <Button
                as="a"
                href="https://www.google.com/maps/dir/?api=1&destination=4+Avondale+Ave,+Charleston,+SC+29407"
                target="_blank"
                rel="noopener noreferrer"
                variant="flat"
                size="sm"
                className="bg-transparent border border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white font-light tracking-wide transition-all duration-300 hover:scale-105"
              >
                GET DIRECTIONS
              </Button>
            </div>

            <div className={`text-center transition-all duration-1000 delay-500 ${isVisible('locations') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="overflow-hidden rounded-lg shadow-lg mb-6">
                <img
                  src="https://img.heroui.chat/image/places?w=400&h=250&u=showroom-2"
                  alt="Antiques S Windermere Showroom"
                  className="w-full h-40 object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <h3 className="font-playfair text-xl font-light text-neutral-800 mb-3 tracking-wide">
                ANTIQUES S WINDERMERE
              </h3>
              <div className="text-neutral-700 font-light space-y-1 mb-4">
                <p>22 Windermere Boulevard</p>
                <p>Charleston, South Carolina 29407</p>
                <p>(843) 555-0456</p>
              </div>
              <div className="text-neutral-600 font-light text-sm space-y-1 mb-6">
                <p>Tuesday – Saturday: 11am – 7pm</p>
                <p>Sunday: 12pm – 5pm</p>
                <p>Monday: Closed</p>
              </div>
              <Button
                as="a"
                href="https://www.google.com/maps/dir/?api=1&destination=22+Windermere+Blvd,+Charleston,+SC+29407"
                target="_blank"
                rel="noopener noreferrer"
                variant="flat"
                size="sm"
                className="bg-transparent border border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white font-light tracking-wide transition-all duration-300 hover:scale-105"
              >
                GET DIRECTIONS
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" data-section="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-12 h-px bg-neutral-400 mx-auto mb-6" />
            <h2 className="font-playfair text-3xl font-light text-neutral-800 tracking-wide mb-6">
              Inquiries
            </h2>
            <div className="w-12 h-px bg-neutral-400 mx-auto mb-6" />
            <p className="text-neutral-700 font-light leading-relaxed max-w-2xl mx-auto">
              For appointments, appraisals, or inquiries about specific pieces, please contact us directly
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className={`transition-all duration-1000 delay-300 ${isVisible('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="bg-neutral-100 h-64 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <iframe
              src="https://www.google.com/maps/embed/v1/search?key=AIzaSyCbSGMNp5nACfY5Ubn9yKO1UmeMDb3krAQ&q=17+South+Antiques+at+4+Avondale+Ave+Charleston+SC+29407,Antiques+S+Windermere+at+22+Windermere+Blvd+Charleston+SC+29407&zoom=15&maptype=roadmap"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Locations"
            />
          </div>
        </div>
      </section>
      
      {/* Divider line above footer */}
      <div className="bg-white">
        <div className="container mx-auto px-6">
          <div className="border-t border-neutral-200" />
        </div>
      </div>
    </div>
  );
};