"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plane, Shield, Clock, Users } from "lucide-react";
import OurProcess from "@/components/public/OurProcess";
import WhyFlyWithUs from "@/components/public/WhyFlyWithUs";
import FeaturedCategory from "@/components/public/FeaturedCategory";
import HeroSection from "@/components/public/HeroSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1c1c1c]">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-[#1c1c1c]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10 md:mb-12">
            Why Choose Swift Jet
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-white">
            {features.map((feature) => (
              <div key={feature.title} className="text-center p-4">
                <feature.icon className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 text-white" />
                <h3 className="text-lg md:text-xl font-semibold mb-2 ">
                  {feature.title}
                </h3>
                <p className="text-white text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Jets Section */}
      <section className="py-16 md:py-20 bg-[#1c1c1c] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
            Popular Aircraft
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularJets.map((jet) => (
              <div
                key={jet.name}
                className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <div className="relative h-56 md:h-64 lg:h-72">
                  <Image
                    src={jet.image}
                    alt={jet.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">
                    {jet.name}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base mb-4">
                    {jet.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg md:text-2xl font-bold text-primary">
                      ₦{jet.price}/hr
                    </span>
                    <Button asChild size="sm" className="text-sm">
                      <Link href={`/jets/${jet.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center text-black mt-10 md:mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/jets">View All Aircraft</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <section className="py-10 md:py-12">
        <FeaturedCategory />
      </section>

      <section className="py-10 md:py-12">
        <WhyFlyWithUs />
      </section>

      <section className="py-10 md:py-12">
        <OurProcess />
      </section>
    </div>
  );
}

const popularJets = [
  {
    id: "cessna-citation-cj3",
    name: "Cessna Citation CJ3+",
    description:
      "Perfect for short to medium-range flights with comfort for up to 9 passengers",
    price: "2,500",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800",
  },
  {
    id: "gulfstream-g280",
    name: "Gulfstream G280",
    description:
      "Superior performance with transcontinental range and luxury amenities",
    price: "4,500",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800",
  },
  {
    id: "bombardier-global-6000",
    name: "Global 6000",
    description:
      "Ultimate luxury with intercontinental range and three living spaces",
    price: "8,500",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800",
  },
];

const features = [
  {
    title: "Premium Fleet",
    description:
      "Access to the finest private jets, from light jets to ultra-long-range aircraft",
    icon: Plane,
  },
  {
    title: "Safety First",
    description:
      "Highest safety standards with experienced pilots and well-maintained aircraft",
    icon: Shield,
  },
  {
    title: "24/7 Availability",
    description:
      "Book your flight anytime, anywhere with our round-the-clock service",
    icon: Clock,
  },
  {
    title: "Personalized Service",
    description:
      "Tailored experiences to meet your specific travel needs and preferences",
    icon: Users,
  },
];
