import React from "react";
import { Navbar as HeroNavbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export const Navbar = () => {
  return (
    <HeroNavbar maxWidth="xl" className="bg-background/70 backdrop-blur-md border-b border-divider">
      <NavbarBrand>
        <Link href="#" color="foreground" className="font-serif text-xl tracking-wide">
          17 South Antiques
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#about">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#sister-store">
            Sister Store
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#location">
            Location
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="tel:+15551234567" variant="flat" startContent={<Icon icon="lucide:phone" />}>
            Contact
          </Button>
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  );
};