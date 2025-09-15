import React from "react";
import { Card, CardBody, CardHeader, Divider, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ContactForm } from "../components/contact-form";
import { StoreLocation } from "../types/item";

export const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState({
    header: false,
    form: false,
    locations: false,
    map: false
  });

  React.useEffect(() => {
    const observer = new IntersectionObserver(
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
      { threshold: 0.1, rootMargin: '50px' }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Initial header animation
    setTimeout(() => {
      setIsVisible(prev => ({ ...prev, header: true }));
    }, 100);

    return () => observer.disconnect();
  }, []);

  const locationData = [
    {
      name: "17 South Antiques",
      subtitle: "Our flagship store",
      icon: "lucide:landmark",
      address: ["4 Avondale Avenue", "Charleston, South Carolina 29407"],
      phone: "(843) 555-0123",
      email: "info@17southantiques.com",
      hours: [
        "Monday - Saturday: 10am - 6pm",
        "Sunday: 12pm - 5pm"
      ],
      color: "primary",
      mapLink: "https://www.google.com/maps/dir/?api=1&destination=4+Avondale+Ave,+Charleston,+SC+29407"
    },
    {
      name: "Antiques S Windermere",
      subtitle: "Our Windermere location",
      icon: "lucide:building",
      address: ["22 Windermere Boulevard", "Charleston, South Carolina 29407"],
      phone: "(843) 555-0456",
      email: "windermere@17southantiques.com",
      hours: [
        "Tuesday - Saturday: 11am - 7pm",
        "Sunday: 12pm - 5pm",
        "Monday: Closed"
      ],
      color: "secondary",
      mapLink: "https://www.google.com/maps/dir/?api=1&destination=22+Windermere+Blvd,+Charleston,+SC+29407"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible.header ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          data-section="header"
        >
          <div className="w-16 h-px bg-neutral-400 mx-auto mb-6 transform transition-all duration-700 delay-200 scale-x-0 animate-[scaleX_0.8s_ease-out_0.2s_forwards]"></div>
          <h1 className="font-playfair text-4xl md:text-5xl font-light text-neutral-800 tracking-wide mb-4">
            Contact Us
          </h1>
          <div className="w-16 h-px bg-neutral-400 mx-auto mb-8 transform transition-all duration-700 delay-400 scale-x-0 animate-[scaleX_0.8s_ease-out_0.4s_forwards]"></div>
          <p className="text-lg font-light text-neutral-700 max-w-3xl mx-auto leading-relaxed">
            Have questions about our items or want to schedule a visit? 
            Reach out to us and we'll be happy to assist you.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left Column - Contact Form */}
          <div 
            className={`transition-all duration-1000 delay-300 transform ${
              isVisible.form ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
            }`}
            data-section="form"
          >
            <div className="text-center mb-8">
              <h2 className="font-playfair text-2xl font-light text-neutral-800 tracking-wide mb-2">
                Send Us a Message
              </h2>
              <div className="w-12 h-px bg-neutral-400 mx-auto"></div>
            </div>
            <ContactForm />
          </div>
          
          {/* Right Column - Enhanced Locations */}
          <div 
            className={`transition-all duration-1000 delay-500 transform ${
              isVisible.locations ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
            data-section="locations"
          >
            <div className="text-center mb-8">
              <h2 className="font-playfair text-2xl font-light text-neutral-800 tracking-wide mb-2">
                Visit Our Showrooms
              </h2>
              <div className="w-12 h-px bg-neutral-400 mx-auto"></div>
            </div>
            
            <div className="space-y-8">
              {locationData.map((location, index) => (
                <Card 
                  key={location.name}
                  className={`overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] ${
                    isVisible.locations 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-8 opacity-0'
                  }`}
                  style={{
                    transitionDelay: isVisible.locations ? `${(index + 1) * 200}ms` : '0ms'
                  }}
                >
                  <CardHeader className="bg-gradient-to-r from-neutral-50 to-neutral-100 pb-3">
                    <div className="flex items-center gap-4 w-full">
                      <div className="flex-shrink-0 p-3 bg-white rounded-full shadow-md">
                        <Icon 
                          icon={location.icon} 
                          className="text-primary text-2xl transition-transform duration-300 hover:scale-110" 
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-playfair text-xl font-semibold text-neutral-800 tracking-wide">
                          {location.name}
                        </h3>
                        <p className="text-sm text-neutral-600 font-light">
                          {location.subtitle}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardBody className="pt-6">
                    <div className="space-y-5">
                      {/* Address */}
                      <div className="flex items-start gap-3 group">
                        <div className="flex-shrink-0 mt-1">
                          <Icon 
                            icon="lucide:map-pin" 
                            className="text-primary text-lg transition-all duration-300 group-hover:scale-110 group-hover:text-primary-600" 
                          />
                        </div>
                        <div className="space-y-1">
                          {location.address.map((line, i) => (
                            <p key={i} className="text-neutral-700 font-light">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                      
                      {/* Phone */}
                      <div className="flex items-center gap-3 group">
                        <Icon 
                          icon="lucide:phone" 
                          className="text-primary text-lg transition-all duration-300 group-hover:scale-110 group-hover:text-primary-600" 
                        />
                        <a 
                          href={`tel:${location.phone.replace(/[^0-9]/g, '')}`}
                          className="text-neutral-700 font-light hover:text-primary transition-colors duration-300"
                        >
                          {location.phone}
                        </a>
                      </div>
                      
                      {/* Email */}
                      <div className="flex items-center gap-3 group">
                        <Icon 
                          icon="lucide:mail" 
                          className="text-primary text-lg transition-all duration-300 group-hover:scale-110 group-hover:text-primary-600" 
                        />
                        <a 
                          href={`mailto:${location.email}`}
                          className="text-neutral-700 font-light hover:text-primary transition-colors duration-300"
                        >
                          {location.email}
                        </a>
                      </div>
                      
                      {/* Hours */}
                      <div className="flex items-start gap-3 group">
                        <div className="flex-shrink-0 mt-1">
                          <Icon 
                            icon="lucide:clock" 
                            className="text-primary text-lg transition-all duration-300 group-hover:scale-110 group-hover:text-primary-600" 
                          />
                        </div>
                        <div className="space-y-1">
                          {location.hours.map((hour, i) => (
                            <p key={i} className="text-neutral-700 font-light text-sm">
                              {hour}
                            </p>
                          ))}
                        </div>
                      </div>
                      
                      {/* Directions Button */}
                      <div className="pt-4 border-t border-neutral-200">
                        <Button
                          as="a"
                          href={location.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="flat"
                          color="primary"
                          className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                          startContent={<Icon icon="lucide:navigation" />}
                        >
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
            
            {/* Additional Contact Info Card */}
            <Card 
              className={`mt-8 bg-gradient-to-br from-primary-50 to-primary-100 border-none overflow-hidden transition-all duration-700 transform ${
                isVisible.locations ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <CardBody className="text-center py-8">
                <div className="mb-4">
                  <Icon icon="lucide:heart" className="text-primary text-3xl mx-auto animate-pulse" />
                </div>
                <h4 className="font-playfair text-lg font-semibold text-neutral-800 mb-2">
                  We're Here to Help
                </h4>
                <p className="text-neutral-600 font-light text-sm leading-relaxed max-w-sm mx-auto">
                  Whether you're looking for a specific piece or need expert appraisal services, 
                  our knowledgeable team is ready to assist you.
                </p>
                <div className="flex justify-center gap-4 mt-6">
                  {[
                    { icon: "lucide:facebook", href: "#", label: "Facebook" },
                    { icon: "lucide:instagram", href: "#", label: "Instagram" },
                    { icon: "lucide:twitter", href: "#", label: "Twitter" }
                  ].map((social) => (
                    <Button
                      key={social.label}
                      as="a"
                      href={social.href}
                      isIconOnly
                      variant="light"
                      color="primary"
                      aria-label={social.label}
                      className="transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-lg"
                    >
                      <Icon icon={social.icon} className="text-lg" />
                    </Button>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
        
        {/* Enhanced Map Section */}
        <div 
          className={`transition-all duration-1000 ${
            isVisible.map ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          data-section="map"
        >
          <div className="text-center mb-8">
            <div className="w-12 h-px bg-neutral-400 mx-auto mb-6"></div>
            <h2 className="font-playfair text-3xl font-light text-neutral-800 tracking-wide mb-2">
              Find Us
            </h2>
            <div className="w-12 h-px bg-neutral-400 mx-auto mb-6"></div>
            <p className="text-neutral-600 font-light">
              Both of our showrooms are conveniently located in Charleston
            </p>
          </div>
          
          <Card className="overflow-hidden shadow-2xl">
            <div className="bg-neutral-100 h-96 relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="mb-6 p-6 bg-white rounded-full shadow-lg">
                    <Icon icon="lucide:map" className="w-12 h-12 text-primary mx-auto" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-neutral-800 mb-2">
                    Interactive Map
                  </h3>
                  <p className="text-neutral-600 max-w-md mx-auto font-light">
                    Interactive map integration would be displayed here in a production environment
                    with both store locations marked.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
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