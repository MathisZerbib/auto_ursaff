"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
}

const links: NavLinkProps[] = [
  { href: "/add-payment", label: "Ajouter un paiement" },
  { href: "/dashboard", label: "Tableau de bord" },
];

const authLinks: NavLinkProps[] = [
  { href: "/login", label: "Connexion" },
  { href: "/signup", label: "Inscription" },
];

// Reusable NavLink Component
const NavLink: React.FC<NavLinkProps> = ({ href, label, onClick }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200", // Ensure text is visible
        pathname === href && "font-bold text-gray-900"
      )}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

// Reusable NavLinks Component for Desktop and Mobile
const NavLinks: React.FC<{
  links: NavLinkProps[];
  onLinkClick?: () => void;
}> = ({ links, onLinkClick }) => {
  return (
    <>
      {links.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          label={link.label}
          onClick={onLinkClick}
        />
      ))}
    </>
  );
};

const Navigation: React.FC = () => {
  const { session } = useAppContext();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      className={cn(
        "p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50 transition-colors duration-300 backdrop-blur-md",
        isScrolled ? "bg-white/90 shadow-sm" : "bg-transparent"
      )}
      initial={{ backgroundColor: "rgba(255, 255, 255, 0)" }} // Use RGBA instead of "transparent"
      animate={{
        backgroundColor: isScrolled
          ? "rgba(255, 255, 255, 0.9)"
          : "rgba(255, 255, 255, 0)",
      }}
    >
      {/* Logo */}
      <Link href="/" onClick={closeMenu}>
        <Image
          src="/logo-urssaf.png"
          alt="Accueil"
          width={50}
          height={50}
          className="cursor-pointer"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6 items-center">
        <NavigationMenu>
          <NavigationMenuList>
            {session
              ? links.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "text-gray-900 hover:bg-gray-100" // Ensure text is visible
                        )}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))
              : authLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "text-gray-900 hover:bg-gray-100" // Ensure text is visible
                        )}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
          </NavigationMenuList>
        </NavigationMenu>
        {session && <ProfileDropdown />}
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="focus:outline-none text-gray-900" // Ensure button text is visible
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="fixed top-16 left-0 w-full h-screen bg-white/95 backdrop-blur-md flex flex-col items-center space-y-6 py-8 md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <NavLinks
            links={session ? links : authLinks}
            onLinkClick={closeMenu}
          />
          {session && <ProfileDropdown />}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navigation;
