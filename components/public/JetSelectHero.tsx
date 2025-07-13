import React from "react";
import Image from "next/image";

const JetSelectHero: React.FC = () => {
  return (
    <section className="relative h-[560px] flex items-center justify-center text-white overflow-hidden">

      <Image
        src="/jeth.jpg" 
        alt="Private Jet on Tarmac"
        layout="fill"
        objectFit="cover"
        quality={90}
        className="z-0"
      />
      <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
      <div className="relative z-20 container mx-auto px-8 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Swift Jet Select</h1>
      </div>
    </section>
  );
};

export default JetSelectHero;
