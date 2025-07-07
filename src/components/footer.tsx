import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

export const Footer: React.FC = () => {
  // Function to handle smooth scrolling for hash links
  const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    // Only handle if we're on the home page
    if (window.location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-content1 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon icon="lucide:book-antiquarian" width={24} height={24} className="text-primary" />
              <h3 className="font-playfair text-xl font-semibold">17 South Antiques</h3>
            </div>
            <p className="text-default-600 mb-4">
              Curating fine antiques and collectibles for discerning collectors since 1995.
            </p>
            <div className="flex gap-4">
              <Link href="#" aria-label="Facebook">
                <Icon icon="lucide:facebook" width={20} height={20} />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Icon icon="lucide:instagram" width={20} height={20} />
              </Link>
              <Link href="#" aria-label="Pinterest">
                <Icon icon="lucide:pinterest" width={20} height={20} />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Our Locations</h4>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">17 South Antiques</p>
                <p className="text-default-600">123 Main Street</p>
                <p className="text-default-600">Anytown, USA 12345</p>
                <p className="text-default-600">(555) 123-4567</p>
              </div>
              <div>
                <p className="font-semibold">Antiques S Windermere</p>
                <p className="text-default-600">456 Oak Avenue</p>
                <p className="text-default-600">Windermere, USA 67890</p>
                <p className="text-default-600">(555) 987-6543</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  as={RouterLink} 
                  to="/#about" 
                  color="foreground"
                  onClick={(e) => handleHashLinkClick(e, "about")}
                >
                  About
                </Link>
              </li>
              <li>
                <Link as={RouterLink} to="/catalog" color="foreground">Catalog</Link>
              </li>
              <li>
                <Link 
                  as={RouterLink} 
                  to="/#contact" 
                  color="foreground"
                  onClick={(e) => handleHashLinkClick(e, "contact")}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link as={RouterLink} to="/admin/login" color="foreground">Admin</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <Divider className="my-6" />
        
        <div className="text-center text-default-500 text-sm">
          <p>&copy; {new Date().getFullYear()} 17 South Antiques. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};