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

const NavLink: React.FC<NavLinkProps> = ({ href, label, onClick }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "hover:text-gray-700 transition-colors duration-200",
        pathname === href && "font-bold text-gray-900"
      )}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export const Navigation: React.FC = () => {
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

  return (
    <motion.nav
      className={cn(
        "p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50 transition-colors duration-300",
        isScrolled
          ? "bg-gray-300 text-gray-900"
          : "bg-transparent text-gray-900"
      )}
      initial={{ backgroundColor: "transparent" }}
      animate={{
        backgroundColor: isScrolled
          ? "rgba(209, 213, 219, 0.9)"
          : "transparent",
      }}
    >
      <Link href="/">
        <Image
          src="/logo-urssaf.png"
          alt="Accueil"
          width={50}
          height={50}
          className="cursor-pointer"
        />
      </Link>

      <div className="hidden md:flex space-x-4 items-center">
        {session
          ? links.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))
          : authLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
        {session && <ProfileDropdown />}
      </div>
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="focus:outline-none text-gray-900"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <motion.div
          className="absolute top-16 left-0 w-full bg-gray-300 text-gray-900 flex flex-col items-center space-y-4 py-4 md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {session
            ? links.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  onClick={toggleMenu}
                />
              ))
            : authLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  onClick={toggleMenu}
                />
              ))}
          {session && <ProfileDropdown />}
        </motion.div>
      )}
    </motion.nav>
  );
};
