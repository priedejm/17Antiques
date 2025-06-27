import React from "react";
import { Card, CardBody, CardHeader, Divider, Link } from "@heroui/react";
import { Icon } from "@iconify/react";

export const LocationSection = () => {
  return (
    <section id="location" className="py-20 bg-content2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-medium mb-4">Find Us</h2>
          <Divider className="max-w-xs mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card className="border border-divider h-full">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-xl font-serif">Store Location</p>
                <p className="text-small text-default-500">Visit our showroom</p>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon icon="lucide:map-pin" className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-default-500">17 South Main Street</p>
                    <p className="text-default-500">Charleston, SC 29401</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Icon icon="lucide:clock" className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Hours</p>
                    <p className="text-default-500">Monday - Saturday: 10am - 6pm</p>
                    <p className="text-default-500">Sunday: 12pm - 5pm</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Icon icon="lucide:phone" className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Contact</p>
                    <Link href="tel:+18431234567" className="text-default-500">
                      (843) 123-4567
                    </Link>
                    <br />
                    <Link href="mailto:info@17southantiques.com" className="text-default-500">
                      info@17southantiques.com
                    </Link>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Icon icon="lucide:info" className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Parking</p>
                    <p className="text-default-500">Free parking available behind the building</p>
                    <p className="text-default-500">Street parking also available</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          
          <div className="h-full min-h-[400px] rounded-lg overflow-hidden border border-divider">
            <div className="w-full h-full bg-cover bg-center" style={{ 
              backgroundImage: "url('https://img.heroui.chat/image/places?w=800&h=800&u=charleston')",
              filter: "grayscale(0.2) contrast(1.1)"
            }} />
          </div>
        </div>
      </div>
    </section>
  );
};