import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Link, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

export const Footer: React.FC = () => {
  const history = useHistory();

  // Function to handle smooth scrolling for hash links
  const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    
    // Check if we're on the home page
    if (window.location.pathname === '/') {
      // Already on home page, just scroll
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page with hash
      history.push(`/#${hash}`);
      
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <footer className="bg-content1">
      {/* Divider line above footer content */}
      <div className="container mx-auto px-4">
        <Divider className="mb-0" />
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon icon="lucide:book-antiquarian" width={24} height={24} className="text-primary" />
              <h3 className="font-playfair text-xl font-semibold">17 South Antiques</h3>
            </div>
            <p className="text-default-600 mb-4">
              Curating fine antiques and collectibles for discerning collectors since 1998.
            </p>
            <div className="flex gap-4">
              <Link href="#" aria-label="Facebook">
                <Icon icon="lucide:facebook" width={20} height={20} />
              </Link>
              <Link href="https://www.instagram.com/17southantiques/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
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
                <p className="text-default-600">4 Avondale Avenue</p>
                <p className="text-default-600">Charleston, SC 29407</p>
                <p className="text-default-600">(843) 555-0123</p>
              </div>
              <div>
                <p className="font-semibold">Antiques S Windermere</p>
                <p className="text-default-600">22 Windermere Boulevard</p>
                <p className="text-default-600">Charleston, SC 29407</p>
                <p className="text-default-600">(843) 555-0456</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  as="a"
                  href="/#about" 
                  color="foreground"
                  onClick={(e) => handleHashLinkClick(e, "about")}
                  className="cursor-pointer"
                >
                  About
                </Link>
              </li>
              <li>
                <Link as={RouterLink} to="/catalog" color="foreground">Catalog</Link>
              </li>
              <li>
                <Link 
                  as="a"
                  href="/#contact" 
                  color="foreground"
                  onClick={(e) => handleHashLinkClick(e, "contact")}
                  className="cursor-pointer"
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
        
        <div className="text-center text-default-500 text-sm mt-8">
          <p>&copy; {new Date().getFullYear()} 17 South Antiques. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};