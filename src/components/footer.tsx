import React from "react";
import { Link, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

export const Footer = () => {
  return (
    <footer className="bg-content1 border-t border-divider py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="#" color="foreground" className="font-serif text-xl tracking-wide">
              17 South Antiques
            </Link>
            <p className="mt-4 text-default-500">
              Curating fine antiques and vintage furniture since 2005.
            </p>
            <div className="flex gap-4 mt-6">
              <Link href="#" aria-label="Facebook">
                <Icon icon="lucide:facebook" className="text-default-500 hover:text-primary text-xl" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Icon icon="lucide:instagram" className="text-default-500 hover:text-primary text-xl" />
              </Link>
              <Link href="#" aria-label="Pinterest">
                <Icon icon="lucide:image" className="text-default-500 hover:text-primary text-xl" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" color="foreground" className="text-default-500 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#sister-store" color="foreground" className="text-default-500 hover:text-primary">
                  Sister Store
                </Link>
              </li>
              <li>
                <Link href="#location" color="foreground" className="text-default-500 hover:text-primary">
                  Location & Hours
                </Link>
              </li>
              <li>
                <Link href="#" color="foreground" className="text-default-500 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Newsletter</h3>
            <p className="text-default-500 mb-4">
              Subscribe to receive updates on new arrivals and special events.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 border border-divider rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary w-full"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-600 transition-colors">
                <Icon icon="lucide:send" />
              </button>
            </div>
          </div>
        </div>
        
        <Divider className="my-8" />
        
        <div className="text-center text-default-500 text-sm">
          © {new Date().getFullYear()} 17 South Antiques. All rights reserved.
        </div>
      </div>
    </footer>
  );
};