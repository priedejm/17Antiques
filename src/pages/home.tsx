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
  const [isVisible, setIsVisible] = React.useState({
    hero: false,
    about: false,
    featured: false,
    locations: false,
    contact: false
  });

  const observerRef = React.useRef<IntersectionObserver | null>(null);

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
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section');
            if (sectionId) {
              setIsVisible(prev => ({ ...prev, [sectionId]: true }));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    // Initial hero animation
    setTimeout(() => {
      setIsVisible(prev => ({ ...prev, hero: true }));
    }, 100);

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="bg-white">
      {/* Header Section */}
      <section 
        className="bg-neutral-50 py-20 overflow-hidden"
        data-section="hero"
      >
        <div className="container mx-auto px-6 text-center">
          <div 
            className={`transition-all duration-1000 ease-out transform ${
              isVisible.hero 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="w-16 h-px bg-neutral-400 mx-auto mb-6 transform transition-all duration-700 delay-200 scale-x-0 animate-[scaleX_0.8s_ease-out_0.2s_forwards]"></div>
            <h1 className={`font-playfair text-4xl md:text-5xl font-light text-neutral-800 tracking-wide mb-4 transition-all duration-1000 delay-300 ${
              isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}>
              17 SOUTH ANTIQUES
            </h1>
            <div className={`text-sm font-light text-neutral-600 tracking-[0.2em] uppercase mb-6 transition-all duration-1000 delay-500 ${
              isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              C U R A T E D &nbsp; H I S T O R Y
            </div>
            <div className="w-16 h-px bg-neutral-400 mx-auto mb-8 transform transition-all duration-700 delay-700 scale-x-0 animate-[scaleX_0.8s_ease-out_0.7s_forwards]"></div>
            <p className={`text-lg font-light text-neutral-700 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-900 ${
              isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              4 Avondale Ave, Charleston, South Carolina &nbsp; (843) 555-0123
            </p>
          </div>
        </div>

        {/* Hero Image Section - Made Larger */}
        <div className="container mx-auto px-6 flex justify-center pt-12">
          <div className={`max-w-lg w-full transition-all duration-1200 delay-1100 transform ${
            isVisible.hero 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-12 opacity-0 scale-95'
          }`}>
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
      <section 
        className="py-20 bg-white"
        data-section="about"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className={`text-center mb-12 transition-all duration-1000 transform ${
              isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="w-12 h-px bg-neutral-400 mx-auto mb-6 transform transition-all duration-700 scale-x-0 animate-[scaleX_0.8s_ease-out_forwards]" style={{animationDelay: isVisible.about ? '0.2s' : '999s'}}></div>
              <h2 className="font-playfair text-3xl font-light text-neutral-800 tracking-wide mb-6">
                Our Story
              </h2>
              <div className="w-12 h-px bg-neutral-400 mx-auto transform transition-all duration-700 scale-x-0 animate-[scaleX_0.8s_ease-out_forwards]" style={{animationDelay: isVisible.about ? '0.4s' : '999s'}}></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className={`transition-all duration-1000 delay-300 transform ${
                isVisible.about ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}>
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <img
                    src="https://img.heroui.chat/image/places?w=500&h=400&u=antique-interior"
                    alt="17 South Antiques Interior"
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className={`space-y-6 transition-all duration-1000 delay-500 transform ${
                isVisible.about ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}>
                <p className="text-neutral-700 font-light leading-relaxed">
                  Since 1995, 17 South Antiques has been Charleston's premier destination for 
                  exceptional antiques and fine collectibles. Our carefully curated collection 
                  spans centuries of craftsmanship.
                </p>
                <p className="text-neutral-700 font-light leading-relaxed">
                  Each piece in our collection is selected for its historical significance, 
                  quality, and timeless beauty. We serve discerning collectors, interior 
                  designers, and those who appreciate the artistry of bygone eras.
                </p>
                <div className="pt-6">
                  <Button
                    as={RouterLink}
                    to="/catalog"
                    variant="flat"
                    className="bg-transparent border border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white font-light tracking-wide px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    VIEW COLLECTION
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section 
        className="py-20 bg-neutral-50"
        data-section="featured"
      >
        <div className="container mx-auto px-6">
          <div className={`text-center mb-12 transition-all duration-1000 transform ${
            isVisible.featured ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="w-12 h-px bg-neutral-400 mx-auto mb-6 transform transition-all duration-700 scale-x-0 animate-[scaleX_0.8s_ease-out_forwards]" style={{animationDelay: isVisible.featured ? '0.2s' : '999s'}}></div>
            <h2 className="font-playfair text-3xl font-light text-neutral-800 tracking-wide mb-6">
              Featured Pieces
            </h2>
            <div className="w-12 h-px bg-neutral-400 mx-auto mb-6 transform transition-all duration-700 scale-x-0 animate-[scaleX_0.8s_ease-out_forwards]" style={{animationDelay: isVisible.featured ? '0.4s' : '999s'}}></div>
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
                  className={`group cursor-pointer transition-all duration-700 transform ${
                    isVisible.featured 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-12 opacity-0'
                  }`}
                  style={{
                    transitionDelay: isVisible.featured ? `${(index + 1) * 200}ms` : '0ms'
                  }}
                >
                  <div className="overflow-hidden mb-4 rounded-lg shadow-lg">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="text-center transform group-hover:translate-y-1 transition-transform duration-300">
                    <h3 className="font-playfair text-lg font-light text-neutral-800 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 font-light text-xs tracking-wide uppercase mb-1">
                      {item.period} • {item.location}
                    </p>
                    <p className="text-neutral-800 font-light">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={`text-center mt-12 transition-all duration-1000 delay-1000 transform ${
            isVisible.featured ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <Button
              as={RouterLink}
              to="/catalog"
              variant="flat"
              className="bg-transparent border border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white font-light tracking-wide px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              VIEW ALL PIECES
            </Button>
          </div>
        </div>
      </section>

      {/* Store Locations */}
      <section 
        className="py-20 bg-white"
        data-section="locations"
      >
        <div className="container mx-auto px-6">
          <div className={`text-center mb-12 transition-all duration-1000 transform ${
            isVisible.locations ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="w-12 h-px bg-neutral-400 mx-auto mb-6 transform transition-all duration-700 scale-x-0 animate-[scaleX_0.8s_ease-out_forwards]" style={{animationDelay: isVisible.locations ? '0.2s' : '999s'}}></div>
            <h2 className="font-playfair text-3xl font-light text-neutral-800 tracking-wide mb-6">
              Visit Our Showrooms
            </h2>
            <div className="w-12 h-px bg-neutral-400 mx-auto transform transition-all duration-700 scale-x-0 animate-[scaleX_0.8s_ease-out_forwards]" style={{animationDelay: isVisible.locations ? '0.4s' : '999s'}}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className={`text-center transition-all duration-1000 delay-300 transform ${
              isVisible.locations ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
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
                className="bg-transparent border border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white font-light tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                GET DIRECTIONS
              </Button>
            </div>

            <div className={`text-center transition-all duration-1000 delay-500 transform ${
              isVisible.locations ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
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
                className="bg-transparent border border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white font-light tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                GET DIRECTIONS
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className="py-20 bg-neutral-50"
        data-section="contact"
      >
        <div className="container mx-auto px-6">
          <div className={`text-center mb-12 transition-all duration-1000 transform ${
            isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="w-12 h-px bg-neutral-400 mx-auto mb-6 transform transition-all duration-700 scale-x-0 animate-[scaleX_0.8s_ease-out_forwards]" style={{animationDelay: isVisible.contact ? '0.2s' : '999s'}}></div>
            <h2 className="font-playfair text-3xl font-light text-neutral-800 tracking-wide mb-6">
              Inquiries
            </h2>
            <div className="w-12 h-px bg-neutral-400 mx-auto mb-6 transform transition-all duration-700 scale-x-0 animate-[scaleX_0.8s_ease-out_forwards]" style={{animationDelay: isVisible.contact ? '0.4s' : '999s'}}></div>
            <p className="text-neutral-700 font-light leading-relaxed max-w-2xl mx-auto">
              For appointments, appraisals, or inquiries about specific pieces, 
              please contact us directly
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className={`transition-all duration-1000 delay-300 transform ${
                isVisible.contact ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}>
                <h3 className="font-playfair text-xl font-light text-neutral-800 mb-6 text-center">
                  Send Us a Message
                </h3>
                <ContactForm />
              </div>
              
              <div className={`transition-all duration-1000 delay-500 transform ${
                isVisible.contact ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}>
                <h3 className="font-playfair text-xl font-light text-neutral-800 mb-6 text-center">
                  Connect With Us
                </h3>
                
                <div className="space-y-8">
                  {/* Location Cards */}
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <CardHeader className="bg-gradient-to-r from-neutral-50 to-neutral-100 pb-3">
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex-shrink-0 p-2 bg-white rounded-full shadow-sm">
                          <Icon icon="lucide:landmark" className="text-primary text-lg" />
                        </div>
                        <div>
                          <h4 className="font-playfair font-semibold text-neutral-800 tracking-wide text-sm uppercase">
                            17 South Antiques
                          </h4>
                          <p className="text-xs text-neutral-600 font-light">Our flagship store</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody className="pt-4 space-y-3">
                      <div className="flex items-start gap-2 text-sm">
                        <Icon icon="lucide:map-pin" className="text-primary mt-0.5 flex-shrink-0" />
                        <div className="text-neutral-700 font-light">
                          <p>4 Avondale Avenue</p>
                          <p>Charleston, SC 29407</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon icon="lucide:phone" className="text-primary flex-shrink-0" />
                        <a href="tel:8435550123" className="text-neutral-700 font-light hover:text-primary transition-colors">
                          (843) 555-0123
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon icon="lucide:mail" className="text-primary flex-shrink-0" />
                        <a href="mailto:info@17southantiques.com" className="text-neutral-700 font-light hover:text-primary transition-colors">
                          info@17southantiques.com
                        </a>
                      </div>
                    </CardBody>
                  </Card>

                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <CardHeader className="bg-gradient-to-r from-neutral-50 to-neutral-100 pb-3">
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex-shrink-0 p-2 bg-white rounded-full shadow-sm">
                          <Icon icon="lucide:building" className="text-primary text-lg" />
                        </div>
                        <div>
                          <h4 className="font-playfair font-semibold text-neutral-800 tracking-wide text-sm uppercase">
                            Antiques S Windermere
                          </h4>
                          <p className="text-xs text-neutral-600 font-light">Our second location</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody className="pt-4 space-y-3">
                      <div className="flex items-start gap-2 text-sm">
                        <Icon icon="lucide:map-pin" className="text-primary mt-0.5 flex-shrink-0" />
                        <div className="text-neutral-700 font-light">
                          <p>22 Windermere Boulevard</p>
                          <p>Charleston, SC 29407</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon icon="lucide:phone" className="text-primary flex-shrink-0" />
                        <a href="tel:8435550456" className="text-neutral-700 font-light hover:text-primary transition-colors">
                          (843) 555-0456
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon icon="lucide:mail" className="text-primary flex-shrink-0" />
                        <a href="mailto:windermere@17southantiques.com" className="text-neutral-700 font-light hover:text-primary transition-colors">
                          windermere@17southantiques.com
                        </a>
                      </div>
                    </CardBody>
                  </Card>

                  {/* Store Hours */}
                  <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-none">
                    <CardBody className="py-6">
                      <div className="text-center mb-6">
                        <div className="mb-3">
                          <Icon icon="lucide:clock" className="text-primary text-2xl mx-auto" />
                        </div>
                        <h4 className="font-playfair text-sm font-semibold text-neutral-800 uppercase tracking-wide">
                          Store Hours
                        </h4>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 17 South Antiques Hours */}
                        <div>
                          <h5 className="font-semibold text-xs text-neutral-800 mb-3 text-center uppercase tracking-wide">
                            17 South Antiques
                          </h5>
                          <div className="space-y-1">
                            {(() => {
                              const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
                              const hours17South = [
                                { day: 'Monday', hours: '10am - 6pm' },
                                { day: 'Tuesday', hours: '10am - 6pm' },
                                { day: 'Wednesday', hours: '10am - 6pm' },
                                { day: 'Thursday', hours: '10am - 6pm' },
                                { day: 'Friday', hours: '10am - 6pm' },
                                { day: 'Saturday', hours: '10am - 6pm' },
                                { day: 'Sunday', hours: '12pm - 5pm' }
                              ];
                              
                              return hours17South.map((schedule) => (
                                <div 
                                  key={schedule.day}
                                  className={`flex justify-between items-center py-1 px-2 rounded text-xs transition-all duration-300 ${
                                    currentDay === schedule.day 
                                      ? 'bg-primary text-white shadow-md font-semibold' 
                                      : 'text-neutral-700 hover:bg-white/50'
                                  }`}
                                >
                                  <span className="font-medium">{schedule.day}</span>
                                  <span className={currentDay === schedule.day ? 'font-semibold' : 'font-light'}>
                                    {schedule.hours}
                                  </span>
                                </div>
                              ));
                            })()}
                          </div>
                        </div>

                        {/* Antiques S Windermere Hours */}
                        <div>
                          <h5 className="font-semibold text-xs text-neutral-800 mb-3 text-center uppercase tracking-wide">
                            Antiques S Windermere
                          </h5>
                          <div className="space-y-1">
                            {(() => {
                              const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
                              const hoursWindermere = [
                                { day: 'Monday', hours: 'Closed' },
                                { day: 'Tuesday', hours: '11am - 7pm' },
                                { day: 'Wednesday', hours: '11am - 7pm' },
                                { day: 'Thursday', hours: '11am - 7pm' },
                                { day: 'Friday', hours: '11am - 7pm' },
                                { day: 'Saturday', hours: '11am - 7pm' },
                                { day: 'Sunday', hours: '12pm - 5pm' }
                              ];
                              
                              return hoursWindermere.map((schedule) => (
                                <div 
                                  key={schedule.day}
                                  className={`flex justify-between items-center py-1 px-2 rounded text-xs transition-all duration-300 ${
                                    currentDay === schedule.day 
                                      ? 'bg-primary text-white shadow-md font-semibold' 
                                      : 'text-neutral-700 hover:bg-white/50'
                                  }`}
                                >
                                  <span className="font-medium">{schedule.day}</span>
                                  <span className={`${
                                    schedule.hours === 'Closed' 
                                      ? 'text-red-600 font-medium' 
                                      : currentDay === schedule.day 
                                        ? 'font-semibold' 
                                        : 'font-light'
                                  } ${currentDay === schedule.day && schedule.hours === 'Closed' ? 'text-red-200' : ''}`}>
                                    {schedule.hours}
                                  </span>
                                </div>
                              ));
                            })()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center gap-3 mt-6 pt-4 border-t border-white/30">
                        {[
                          { icon: "lucide:facebook", href: "#" },
                          { icon: "lucide:instagram", href: "#" },
                          { icon: "lucide:twitter", href: "#" }
                        ].map((social, index) => (
                          <Button
                            key={index}
                            as="a"
                            href={social.href}
                            isIconOnly
                            variant="light"
                            color="primary"
                            size="sm"
                            className="transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-md"
                          >
                            <Icon icon={social.icon} />
                          </Button>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Map Section */}
      <section className={`py-12 bg-white transition-all duration-1000 ${
        isVisible.contact ? 'opacity-100' : 'opacity-0'
      }`}>
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
            ></iframe>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes scaleX {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
};