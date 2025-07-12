import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#1a1a1a] text-white py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
        {/* Placeholder for the "Swift" logo with the gold color */}
        <span className="text-4xl font-bold">
          <span className="text-[#ffd700]">Sw</span>ift
        </span>
      </div>

      <div className="flex space-x-10 text-lg">
        <Link
          href="/"
          className="hover:text-[#ffd700] transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          href="/jet-selection"
          className="hover:text-[#ffd700] transition-colors duration-200"
        >
          Jet Selection
        </Link>
        <Link
          href="/destination"
          className="hover:text-[#ffd700] transition-colors duration-200"
        >
          Destination
        </Link>
        <Link
          href="/contact-us"
          className="hover:text-[#ffd700] transition-colors duration-200"
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
