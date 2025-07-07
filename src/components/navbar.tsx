import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Navbar as HeroNavbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAuth } from "../context/auth-context";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isAuthenticated, logout } = useAuth();

  const menuItems = [
    { name: "About", path: "/#about" },
    { name: "Catalog", path: "/catalog" },
  ];

  const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // Close the menu when a hash link is clicked
    setIsMenuOpen(false);
  };

  // Add a handler for regular navigation links
  const handleNavLinkClick = () => {
    // Close the menu when any navigation link is clicked
    setIsMenuOpen(false);
  };

  return (
    <HeroNavbar 
      onMenuOpenChange={setIsMenuOpen} 
      isBordered 
      maxWidth="xl"
      className="overflow-x-hidden"
      isMenuOpen={isMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <RouterLink to="/" className="flex items-center gap-2">
            <p className="font-playfair text-xl font-semibold">17 South Antiques</p>
          </RouterLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            <Link 
              as={RouterLink} 
              to={item.path} 
              color="foreground"
              className="font-medium whitespace-nowrap"
              onClick={(e) => item.path.startsWith('/#') && handleHashLinkClick(e, item.path)}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {isAuthenticated ? (
          <NavbarItem>
            <div className="flex gap-3">
              <Button 
                as={RouterLink} 
                to="/admin/dashboard" 
                variant="flat" 
                color="primary"
                startContent={<Icon icon="lucide:layout-dashboard" />}
              >
                Dashboard
              </Button>
              <Button 
                variant="light" 
                color="danger" 
                onPress={logout}
                startContent={<Icon icon="lucide:log-out" />}
              >
                Logout
              </Button>
            </div>
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden sm:flex">
            <Button 
              as="a" 
              href="/#contact" 
              variant="light" 
              color="primary"
              startContent={<Icon icon="lucide:phone" />}
              className="bg-neutral-100 text-neutral-800"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Contact
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.name}>
            <Link
              as={RouterLink}
              to={item.path}
              color="foreground"
              className="w-full"
              size="lg"
              onClick={(e) => {
                if (item.path.startsWith('/#')) {
                  handleHashLinkClick(e, item.path);
                } else {
                  handleNavLinkClick();
                }
              }}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroNavbar>
  );
};