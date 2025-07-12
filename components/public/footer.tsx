import React from "react";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C1C1C] text-white py-12 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left Section: Logo and Description */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <span className="text-4xl font-bold">
              <span className="text-[#ffd700]">Sw</span>ift
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Your time, your schedule—luxury travel without limits. Skip the
            hassle and fly on your terms with our seamless private jet service.
          </p>
        </div>

        {/* Middle Section: Contact Links */}
        <div className="flex flex-col space-y-4 md:pl-16">
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <Link
            href="/hire-a-jet"
            className="text-gray-400 hover:text-[#ffd700] transition-colors duration-200 text-base"
          >
            Hire a jet
          </Link>
          <Link
            href="/destination"
            className="text-gray-400 hover:text-[#ffd700] transition-colors duration-200 text-base"
          >
            Destination
          </Link>
        </div>

        {/* Right Section: Social Media Icons */}
        <div className="flex justify-start md:justify-end space-x-4 mt-4 md:mt-0">
          {/* Ensure you have react-icons installed: npm install react-icons */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border border-[#ffd700] rounded-full flex items-center justify-center text-[#ffd700] hover:bg-[#ffd700] hover:text-[#1a1a1a] transition-all duration-200"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border border-[#ffd700] rounded-full flex items-center justify-center text-[#ffd700] hover:bg-[#ffd700] hover:text-[#1a1a1a] transition-all duration-200"
            aria-label="Facebook"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border border-[#ffd700] rounded-full flex items-center justify-center text-[#ffd700] hover:bg-[#ffd700] hover:text-[#1a1a1a] transition-all duration-200"
            aria-label="Twitter" // Assuming the third icon is Twitter based on common patterns
          >
            <FaTwitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
