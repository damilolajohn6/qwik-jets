"use client";

import React from "react";
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero.jpg"
        alt="Private Jet with Pilot"
        fill
        className="absolute inset-0 object-cover object-center z-0"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              <span className="text-[#ffd700] block">Fly Private.</span>
              Arrive in Style
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Your time, your schedule—luxury travel without limits. Skip the
              hassle and fly on your terms with our seamless private jet
              service.
            </p>
          </div>

          {/* Right Content (Quote Form) */}
          <div className="w-full lg:w-1/2 max-w-md mx-auto">
            <form className="bg-gray-800 bg-opacity-90 p-6 sm:p-8 rounded-xl shadow-lg space-y-5">
              <h3 className="text-xl sm:text-2xl font-semibold text-center text-white">
                Get A Quote
              </h3>

              {[
                { id: "fullName", placeholder: "Full Name", type: "text" },
                {
                  id: "emailAddress",
                  placeholder: "Email Address",
                  type: "email",
                },
                { id: "phoneNumber", placeholder: "Phone Number", type: "tel" },
                { id: "origin", placeholder: "Origin", type: "text" },
                { id: "destination", placeholder: "Destination", type: "text" },
              ].map(({ id, placeholder, type }) => (
                <div key={id}>
                  <label htmlFor={id} className="sr-only">
                    {placeholder}
                  </label>
                  <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffd700]"
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full py-3 px-6 bg-[#ffd700] text-black font-bold rounded-md hover:bg-yellow-400 transition-colors duration-200"
              >
                Get A Quote
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
