"use client";

import React from "react";
import Link from "next/link";

const features = [
  {
    title: "Unparalleled Service",
    description: [
      "Our team is available 24/7, ensuring every detail of your private jet hiring experience is managed with precision.",
      "From last-minute arrangements to meticulously planned itineraries, we provide personalized concierge services.",
    ],
  },
  {
    title: "Unmatched Comfort",
    description: [
      "Our team is available 24/7, ensuring every detail of your private jet hiring experience is managed with precision.",
      "From last-minute arrangements to meticulously planned itineraries, we provide personalized concierge services that guarantee a seamless journey.",
    ],
  },
  {
    title: "Limitless Possibilities",
    description: [
      "Our team is available 24/7, ensuring every detail of your private jet hiring experience is managed with precision.",
      "From last-minute arrangements to meticulously planned itineraries, we provide personalized concierge services that guarantee flexibility.",
    ],
  },
  {
    title: "Industry-Leading Safety Standards",
    description: [
      "Our team is available 24/7, ensuring every detail of your private jet hiring experience is managed with precision.",
      "From last-minute arrangements to meticulously planned itineraries, your safety is our priority.",
    ],
  },
];

export default function WhyFlyWithUs() {
  return (
    <section className="bg-[#1C1C1C] text-white py-16">
      <div className="container mx-auto px-4">
        <h3 className="text-sm text-[#EBC13C] font-semibold uppercase mb-2">
          Why Fly With Us
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Experience the Difference
        </h2>
        <p className="text-gray-400 max-w-2xl mb-12">
          We redefine luxury travel with seamless precision, so every detail is
          handled effortlessly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#EBC13C] text-black rounded-lg p-6 space-y-4"
            >
              <h4 className="font-bold text-lg">{feature.title}</h4>
              {feature.description.map((line, i) => (
                <p key={i} className="text-sm leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="text-center flex justify-end ">
          <Link
            href="/jets"
            className="inline-block px-6 py-3 border border-[#EBC13C] text-[#EBC13C] font-medium rounded hover:bg-[#EBC13C] hover:text-black transition"
          >
            Hire a Jet Now
          </Link>
        </div>
      </div>
    </section>
  );
}
