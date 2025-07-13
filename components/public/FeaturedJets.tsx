// components/FeaturedJets.tsx
import React from "react";
import JetCard from "@/components/public/JetCard";

const FeaturedJets: React.FC = () => {

    const jetData = [
    {
      title: "Citation M2",
      jetType: "Light jet",
      seats: "4",
      range: "2,878 KM",
      speed: "580 KM/H",
      imageSrc: "/jet.jpg",
    },
    {
      title: "Challenger 350",
      jetType: "Mid-size jet",
      seats: "8",
      range: "5,926 KM",
      speed: "870 KM/H",
      imageSrc: "/jet.jpg",
    },
    {
      title: "Gulfstream G650ER",
      jetType: "Large jet",
      seats: "12",
      range: "13,890 KM",
      speed: "950 KM/H",
      imageSrc: "/jet.jpg",
    },
  ];

  return (
    <section className="bg-[#1a1a1a] text-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center md:text-left mb-16">
          <h2 className="text-4xl font-bold">Featured Jets</h2>
        </div>

        {/* Jet Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {jetData.map((jet, index) => (
            <JetCard
              key={index}
              title={jet.title}
              jetType={jet.jetType}
              seats={jet.seats}
              range={jet.range}
              speed={jet.speed}
              imageSrc={jet.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJets;
