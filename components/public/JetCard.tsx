import React from "react";
import Link from "next/link";
import { FaUsers, FaPlane, FaTachometerAlt } from "react-icons/fa";
import Image from "next/image";

interface JetCardProps {
  title: string;
  jetType: string;
  seats: string;
  range: string;
  speed: string;
  imageSrc: string; // Assuming an image path will be provided
}

const JetCard: React.FC<JetCardProps> = ({
  title,
  jetType,
  seats,
  range,
  speed,
  imageSrc,
}) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden text-white flex flex-col">
      <div className="bg-gray-700 h-48 relative overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover opacity-50"
          width={100}
          height={100}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        {/* Title and Jet Type */}
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-[#ffd700] text-sm font-medium uppercase mb-6">
          {jetType}
        </p>

        {/* Features List */}
        <div className="space-y-4 text-sm text-gray-300 mb-8 flex-grow">
          <div className="flex items-center space-x-3">
            <FaUsers className="text-[#ffd700]" />
            <span>{seats} seats</span>
          </div>
          <div className="flex items-center space-x-3">
            <FaPlane className="text-[#ffd700]" />
            <span>{range} Range</span>
          </div>
          <div className="flex items-center space-x-3">
            <FaTachometerAlt className="text-[#ffd700]" />
            <span>{speed}</span>
          </div>
        </div>

        {/* See Details Button */}
        <Link
          href={`/jets/${title.toLowerCase().replace(/\s/g, "-")}`}
          passHref
        >
          <button className="w-full py-3 px-6 bg-[#ffd700] text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors duration-200">
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JetCard;
