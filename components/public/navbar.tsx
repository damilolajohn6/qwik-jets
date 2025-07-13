"use client";

import React from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/jets", label: "Jet Selection" },
  { href: "/destination", label: "Destination" },
  { href: "/contact-us", label: "Contact Us" },
];

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#1c1c1c] text-white py-4 px-6 sm:px-8 flex items-center justify-between">
      {/* Logo */}
      <div className="text-3xl font-bold">
        <span className="text-[#ffd700]">Sw</span>ift
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-10 text-lg">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="hover:text-[#ffd700] transition-colors duration-200"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile Menu (Sheet) */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger aria-label="Open menu">
            <Menu className="w-6 h-6 text-white" />
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#1a1a1a] text-white">
            <div className="flex flex-col gap-6 mt-10 text-lg">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-[#ffd700] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
