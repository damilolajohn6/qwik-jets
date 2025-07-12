import React from "react";

const OurProcess: React.FC = () => {
  return (
    <section className="bg-[#1a1a1a] text-white py-16 px-8">
      <div className="container  mx-auto">
        {/* Section Header */}
        <p className="text-sm font-semibold text-gray-400 uppercase mb-2">
          Our Process
        </p>
        <h2 className="text-4xl font-bold mb-12">Lorem ipsum vel eget</h2>

        {/* Description */}
        <p className="text-lg text-gray-300 max-w-4xl mb-16 leading-relaxed">
          Experience luxury, convenience, and efficiency with our hassle-free
          private jet booking process. Whether you&apos;re flying for business
          or leisure, we ensure a smooth journey from the moment you inquire to
          the second you land. Here&apos;s how it works:
        </p>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1: Request a Quote */}
          <div className="bg-[#ffd700] text-gray-900 p-8 rounded-lg shadow-lg relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-4">Request a Quote</h3>
            <p className="text-base leading-relaxed">
              Based on your needs, we&apos;ll provide a selection of private
              jets that match your route, budget, and preferences. From light
              jets to ultra-long-range aircraft, we offer options tailored to
              your comfort and convenience.
            </p>
            {/* Large number in background - visually represented by font size and opacity */}
            <span className="absolute bottom-[-20px] right-[-20px] text-[150px] font-extrabold text-black opacity-10 leading-none">
              1
            </span>
          </div>

          {/* Step 2: Choose Your Aircraft */}
          <div className="bg-[#ffd700] text-gray-900 p-8 rounded-lg shadow-lg relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-4">Choose Your Aircraft</h3>
            <p className="text-base leading-relaxed">
              Start by submitting your flight details, including your departure
              and arrival locations, date, number of passengers, and any special
              requests. You can do this through our online form, via em.
            </p>
            {/* Large number in background */}
            <span className="absolute bottom-[-20px] right-[-20px] text-[150px] font-extrabold text-black opacity-10 leading-none">
              2
            </span>
          </div>

          {/* Step 3: Contact Us */}
          <div className="bg-[#ffd700] text-gray-900 p-8 rounded-lg shadow-lg relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
            <p className="text-base leading-relaxed">
              Once you select your jet, finalize your booking with a secure
              payment. Customize your flight with catering, ground
              transportation, or any special onboard requirements.
            </p>
            {/* Large number in background */}
            <span className="absolute bottom-[-20px] right-[-20px] text-[150px] font-extrabold text-black opacity-10 leading-none">
              3
            </span>
          </div>
        </div>

        {/* Pagination Dots (Placeholder) */}
        <div className="flex justify-center mt-16 space-x-4">
          <div className="w-3 h-3 bg-[#ffd700] rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
