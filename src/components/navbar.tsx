import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Navbar as HeroNavbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAuth } from "../context/auth-context";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const { isAuthenticated, logout } = useAuth();

  const menuItems = [
    { name: "About", path: "/#about" },
    { name: "Catalog", path: "/catalog" },
  ];

  React.useEffect(() => {
    // Initial animation
    setTimeout(() => setIsVisible(true), 100);

    // Scroll effect
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeroNavbar 
      onMenuOpenChange={setIsMenuOpen} 
      isBordered 
      maxWidth="xl"
      className={`overflow-x-hidden transition-all duration-500 ease-out ${
        scrolled 
          ? 'backdrop-blur-lg bg-white/80 shadow-lg' 
          : 'bg-white/95'
      } ${
        isVisible 
          ? 'transform translate-y-0 opacity-100' 
          : 'transform -translate-y-full opacity-0'
      }`}
      isMenuOpen={isMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className={`sm:hidden transition-all duration-300 ${
            isMenuOpen ? 'rotate-90' : 'rotate-0'
          }`}
        />
        <NavbarBrand className={`transition-all duration-700 delay-200 ${
          isVisible 
            ? 'transform translate-x-0 opacity-100' 
            : 'transform -translate-x-8 opacity-0'
        }`}>
          <RouterLink to="/" className="flex items-center gap-2 group">
            <div className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
              <Icon icon="lucide:book-antiquarian" className="text-primary text-2xl" />
            </div>
            <p className="font-playfair text-xl font-semibold transition-all duration-300 group-hover:text-primary">
              17 South Antiques
            </p>
          </RouterLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem 
            key={item.name}
            className={`transition-all duration-700 ${
              isVisible 
                ? 'transform translate-y-0 opacity-100' 
                : 'transform translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: `${(index + 3) * 100}ms` }}
          >
            <Link 
              as={RouterLink} 
              to={item.path} 
              color="foreground"
              className="font-medium whitespace-nowrap relative group transition-all duration-300 hover:text-primary"
              onClick={(e) => item.path.startsWith('/#') && handleHashLinkClick(e, item.path)}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {isAuthenticated ? (
          <NavbarItem className={`transition-all duration-700 delay-500 ${
            isVisible 
              ? 'transform translate-x-0 opacity-100' 
              : 'transform translate-x-8 opacity-0'
          }`}>
            <div className="flex gap-3">
              <Button 
                as={RouterLink} 
                to="/admin/dashboard" 
                variant="flat" 
                color="primary"
                startContent={
                  <Icon 
                    icon="lucide:layout-dashboard" 
                    className="transition-transform duration-300 group-hover:rotate-12"
                  />
                }
                className="group transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Dashboard
              </Button>
              <Button 
                variant="light" 
                color="danger" 
                onPress={logout}
                startContent={
                  <Icon 
                    icon="lucide:log-out" 
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                }
                className="group transition-all duration-300 hover:scale-105"
              >
                Logout
              </Button>
            </div>
          </NavbarItem>
        ) : (
          <NavbarItem className={`hidden sm:flex transition-all duration-700 delay-600 ${
            isVisible 
              ? 'transform translate-x-0 opacity-100' 
              : 'transform translate-x-8 opacity-0'
          }`}>
            <Button 
              as="a" 
              href="/#contact" 
              variant="light" 
              color="primary"
              startContent={
                <Icon 
                  icon="lucide:phone" 
                  className="transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
                />
              }
              className="group bg-neutral-100 text-neutral-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-primary hover:text-white"
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

      <NavbarMenu 
        className={`backdrop-blur-lg bg-white/95 transition-all duration-500 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {menuItems.map((item, index) => (
          <NavbarMenuItem 
            key={item.name}
            className={`transition-all duration-500 transform ${
              isMenuOpen 
                ? 'translate-x-0 opacity-100' 
                : '-translate-x-8 opacity-0'
            }`}
            style={{ 
              transitionDelay: isMenuOpen ? `${index * 100 + 200}ms` : '0ms' 
            }}
          >
            <Link
              as={RouterLink}
              to={item.path}
              color="foreground"
              className="w-full group relative py-4 px-2 transition-all duration-300 hover:text-primary hover:bg-primary-50 rounded-lg"
              size="lg"
              onClick={(e) => {
                if (item.path.startsWith('/#')) {
                  handleHashLinkClick(e, item.path);
                } else {
                  handleNavLinkClick();
                }
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100 transform scale-0 group-hover:scale-100" />
                {item.name}
              </div>
            </Link>
          </NavbarMenuItem>
        ))}
        
        {/* Mobile contact button */}
        <NavbarMenuItem 
          className={`transition-all duration-500 transform ${
            isMenuOpen 
              ? 'translate-x-0 opacity-100' 
              : '-translate-x-8 opacity-0'
          }`}
          style={{ 
            transitionDelay: isMenuOpen ? `${menuItems.length * 100 + 200}ms` : '0ms' 
          }}
        >
          <div className="py-4 px-2">
            <Button 
              as="a" 
              href="/#contact"
              color="primary"
              variant="flat"
              size="lg"
              startContent={<Icon icon="lucide:phone" />}
              className="w-full transition-all duration-300 hover:scale-105"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
                setIsMenuOpen(false);
              }}
            >
              Contact Us
            </Button>
          </div>
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroNavbar>
  );
};