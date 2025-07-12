"use client";

import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const featuredJets = [
  {
    id: "1",
    name: "Light Jets",
    image: "/images/light-jet.jpg",
    pricePerHour: 1000000,
  },
  {
    id: "2",
    name: "Light Jets",
    image: "/images/light-jet.jpg",
    pricePerHour: 1000000,
  },
  {
    id: "3",
    name: "Light Jets",
    image: "/images/light-jet.jpg",
    pricePerHour: 1000000,
  },
];

export default function FeaturedCategory() {
  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <h3 className="text-xs text-yellow-400 uppercase font-semibold mb-2 tracking-wider">
          Featured Product Category
        </h3>
        <p className="text-xl md:text-2xl max-w-2xl mb-12">
          Fly farther, faster, and in ultimate luxury with the world’s most
          coveted business jet.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredJets.map((jet, index) => (
            <div
              key={jet.id}
              className="relative bg-white/5 rounded-2xl overflow-hidden text-center group"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={jet.image}
                  alt={jet.name}
                  fill
                  className="object-cover rounded-b-none"
                  priority
                />
                <span className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded">
                  ₦{formatCurrency(jet.pricePerHour)}
                </span>
              </div>

              <div className="py-6">
                <div className="flex justify-center mb-2">
                  <span className="h-12 w-12 rounded-full border-4 border-yellow-400 text-lg font-bold flex items-center justify-center">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-neutral-200">
                  {jet.name}
                </h4>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center flex justify-end">
          <Link
            href="/jets"
            className="inline-block border border-yellow-400 text-yellow-400 px-6 py-3 rounded font-medium hover:bg-yellow-400 hover:text-black transition"
          >
            Explore Fleet →
          </Link>
        </div>
      </div>
    </section>
  );
}
