"use client";

import { useState, useRef, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import Image from "next/image";
import { FaCog, FaUser, FaSignOutAlt, FaMoon, FaSun } from "react-icons/fa";

export function ProfileDropdown() {
  const { session, logout, toggleTheme, isDarkMode } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session) return null;

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 focus:outline-none"
        aria-label="Open user menu"
      >
        <Image
          src={"/default-avatar.png"}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full cursor-pointer transition-transform hover:scale-110"
        />
        <span className="hidden md:inline text-sm font-medium">
          {session.user?.user_metadata.full_name}
        </span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 transition-all duration-200 ease-in-out">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-gray-800 dark:text-gray-200 font-semibold">
              {session.user?.user_metadata.full_name}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {session.user?.email}
            </p>
          </div>
          <nav className="py-2">
            <Link
              href="/profile"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 transition-colors"
            >
              <FaUser className="text-gray-400" />
              <span>Profile</span>
            </Link>
            <Link
              href="/settings"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 transition-colors"
            >
              <FaCog className="text-gray-400" />
              <span>Settings</span>
            </Link>
            <button
              onClick={toggleTheme}
              className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 transition-colors"
            >
              {isDarkMode ? (
                <FaSun className="text-gray-400" />
              ) : (
                <FaMoon className="text-gray-400" />
              )}
              <span>Toggle Theme</span>
            </button>
            <button
              onClick={logout}
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900 flex items-center space-x-2 transition-colors"
            >
              <FaSignOutAlt className="text-red-500" />
              <span>Sign Out</span>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
