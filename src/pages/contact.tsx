import React from "react";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ContactForm } from "../components/contact-form";
import { StoreLocation } from "../types/item";

export const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-playfair text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-default-600 max-w-2xl mx-auto">
          Have questions about our items or want to schedule a visit? 
          Reach out to us and we'll be happy to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="font-playfair text-2xl font-semibold mb-6">Get In Touch</h2>
          <ContactForm />
        </div>
        
        <div>
          <h2 className="font-playfair text-2xl font-semibold mb-6">Our Locations</h2>
          
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
                      <p>123 Main Street</p>
                      <p>Anytown, USA 12345</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Icon icon="lucide:phone" className="text-primary" />
                    <p>(555) 123-4567</p>
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
                      <p>456 Oak Avenue</p>
                      <p>Windermere, USA 67890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Icon icon="lucide:phone" className="text-primary" />
                    <p>(555) 987-6543</p>
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
      <div className="mb-16">
        <h2 className="font-playfair text-2xl font-semibold mb-6 text-center">Find Us</h2>
        <div className="bg-default-100 rounded-lg h-96 flex items-center justify-center">
          <div className="text-center">
            <Icon icon="lucide:map" className="w-12 h-12 text-default-400 mx-auto mb-4" />
            <p className="text-default-600">
              Interactive map would be displayed here in a production environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};