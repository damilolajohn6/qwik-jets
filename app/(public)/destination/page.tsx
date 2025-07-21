"use client";
import { useEffect, useState } from "react";
import {
  Plane,
  Users,
  Clock,
  MapPin,
  Zap,
  Shield,
  Award,
  ArrowRight,
  Calendar,
  DollarSign,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";


const nigeriaCities = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Kano",
  "Enugu",
  "Benin",
  "Owerri",
  "Calabar",
  "Uyo",
  "Jos",
  "Ilorin",
  "Akure",
  "Sokoto",
  "Maiduguri",
  "Yola",
  "Ibadan",
  "Asaba",
  "Gombe",
  "Kaduna",
  "Makurdi",
  "Warri",
];

const cityPairs: { [key: string]: number } = {
  "Lagos-Abuja": 1.5,
  "Lagos-Port Harcourt": 1.2,
  "Abuja-Port Harcourt": 1.3,
  "Lagos-Kano": 2.0,
  "Abuja-Kano": 1.0,
  "Lagos-Enugu": 1.4,
  "Lagos-Benin": 1.1,
  "Lagos-Owerri": 1.3,
  "Abuja-Benin": 1.2,
  "Abuja-Owerri": 1.4,
  "Port Harcourt-Kano": 1.8,
  "Port Harcourt-Enugu": 0.8,
  "Port Harcourt-Benin": 1.0,
  "Port Harcourt-Owerri": 0.7,
  "Kano-Enugu": 1.7,
  "Kano-Benin": 1.9,
  "Kano-Owerri": 2.0,
  "Enugu-Benin": 1.0,
  "Enugu-Owerri": 0.6,
  "Benin-Owerri": 0.8,
  "Lagos-Calabar": 1.4,
  "Lagos-Uyo": 1.3,
  "Lagos-Jos": 1.7,
  "Lagos-Ilorin": 1.2,
  "Lagos-Akure": 1.1,
  "Lagos-Sokoto": 2.0,
  "Lagos-Maiduguri": 2.0,
  "Lagos-Yola": 1.9,
  "Lagos-Ibadan": 1.0,
  "Lagos-Asaba": 1.2,
  "Abuja-Calabar": 1.5,
  "Abuja-Uyo": 1.4,
  "Abuja-Jos": 1.0,
  "Abuja-Ilorin": 1.1,
  "Abuja-Akure": 1.2,
  "Abuja-Sokoto": 1.8,
  "Abuja-Maiduguri": 1.7,
  "Abuja-Yola": 1.6,
  "Abuja-Ibadan": 1.3,
  "Abuja-Asaba": 1.2,
  "Port Harcourt-Calabar": 0.8,
  "Port Harcourt-Uyo": 0.7,
  "Port Harcourt-Jos": 1.6,
  "Port Harcourt-Ilorin": 1.4,
  "Port Harcourt-Akure": 1.2,
  "Port Harcourt-Sokoto": 1.9,
  "Port Harcourt-Maiduguri": 1.8,
  "Port Harcourt-Yola": 1.7,
  "Port Harcourt-Ibadan": 1.3,
  "Port Harcourt-Asaba": 1.0,
  "Kano-Calabar": 1.9,
  "Kano-Uyo": 1.8,
  "Kano-Jos": 0.9,
  "Kano-Ilorin": 1.3,
  "Kano-Akure": 1.5,
  "Kano-Sokoto": 1.0,
  "Kano-Maiduguri": 1.2,
  "Kano-Yola": 1.1,
  "Kano-Ibadan": 1.7,
  "Kano-Asaba": 1.6,
  "Enugu-Calabar": 0.9,
  "Enugu-Uyo": 0.8,
  "Enugu-Jos": 1.5,
  "Enugu-Ilorin": 1.3,
  "Enugu-Akure": 1.1,
  "Enugu-Sokoto": 1.8,
  "Enugu-Maiduguri": 1.7,
  "Enugu-Yola": 1.6,
  "Enugu-Ibadan": 1.4,
  "Enugu-Asaba": 0.9,
};

interface Jet {
  id: string;
  name: string;
  pricePerHour: number;
  category: string;
  images: string;
  capacity: number;
}

export default function DestinationPage() {
  const router = useRouter();
  const [jets, setJets] = useState<Jet[]>([]);
  const [departureCity, setDepartureCity] = useState<string>("");
  const [arrivalCity, setArrivalCity] = useState<string>("");
  const [jetId, setJetId] = useState<string>("");
  const [passengers, setPassengers] = useState<number>(1);
  const [duration, setDuration] = useState<number | null>(null);
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const [selectedJet, setSelectedJet] = useState<Jet | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchJets = async () => {
      try {
        const res = await fetch("/api/jets");
        if (res.ok) {
          const data = await res.json();
          setJets(data.jets || []);
        } else {
          console.error("Failed to fetch jets");
        }
      } catch (error) {
        console.error("Error fetching jets:", error);
      }
    };
    fetchJets();
  }, []);

  useEffect(() => {
    if (departureCity && arrivalCity && jetId) {
      setIsLoading(true);
      setTimeout(() => {
        const key = `${departureCity}-${arrivalCity}`;
        const reverseKey = `${arrivalCity}-${departureCity}`;
        const hours = cityPairs[key] || cityPairs[reverseKey];

        if (!hours) {
          setDuration(null);
          setEstimatedCost(null);
          setSelectedJet(null);
          setIsLoading(false);
          return;
        }

        const jet = jets.find((j) => j.id === jetId);
        if (jet) {
          setDuration(hours);
          setEstimatedCost(hours * 2 * jet.pricePerHour);
          setSelectedJet(jet);
        }
        setIsLoading(false);
      }, 800);
    }
  }, [departureCity, arrivalCity, jetId, jets]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1C1CCC] via-slate-800 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-sm">
            <Plane className="w-4 h-4" />
            Premium Flight Experience
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Swift Jets
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Experience the pinnacle of private aviation with our world-class
            fleet
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Panel - Flight Selection */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-blue-400" />
                Plan Your Journey
              </h2>

              <div className="space-y-6">
                {/* Route Selection */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-white/80 text-sm font-medium">
                      Departure City
                    </label>
                    <select
                      value={departureCity}
                      onChange={(e) => setDepartureCity(e.target.value)}
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                    >
                      <option value="" className="bg-slate-800 text-white">
                        Select Departure
                      </option>
                      {nigeriaCities.map((city) => (
                        <option
                          key={city}
                          value={city}
                          className="bg-slate-800 text-white"
                        >
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/80 text-sm font-medium">
                      Destination
                    </label>
                    <select
                      value={arrivalCity}
                      onChange={(e) => setArrivalCity(e.target.value)}
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                    >
                      <option value="" className="bg-slate-800 text-white">
                        Select Destination
                      </option>
                      {nigeriaCities.map((city) => (
                        <option
                          key={city}
                          value={city}
                          className="bg-slate-800 text-white"
                        >
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Passengers */}
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">
                    Passengers
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value))}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                  >
                    {Array.from({ length: 14 }, (_, i) => i + 1).map((num) => (
                      <option
                        key={num}
                        value={num}
                        className="bg-slate-800 text-white"
                      >
                        {num} {num === 1 ? "Passenger" : "Passengers"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Aircraft Selection */}
                <div className="space-y-4">
                  <label className="text-white/80 text-sm font-medium">
                    Select Aircraft
                  </label>
                  <div className="space-y-3">
                    {jets.map((jet) => (
                      <div
                        key={jet.id}
                        onClick={() => setJetId(jet.id)}
                        className={`relative cursor-pointer transition-all duration-300 rounded-2xl p-4 border ${
                          jetId === jet.id
                            ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/50"
                            : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Image
                              width={64}
                              height={48}
                              src={jet.images[1]}
                              alt={jet.name}
                              className="w-16 h-12 object-cover rounded-lg"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                              }}
                            />
                            <Plane className="w-8 h-8 text-gray-500" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-semibold">
                              {jet.name}
                            </h3>
                            <p className="text-white/60 text-sm">
                              {jet.category}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-white/60 text-sm mb-1">
                              <Users className="w-3 h-3" />
                              {jet.capacity}
                            </div>
                            <p className="text-white font-medium">
                              {formatCurrency(jet.pricePerHour)}/hr
                            </p>
                          </div>
                        </div>
                        {jetId === jet.id && (
                          <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-400/50 pointer-events-none"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  icon: Shield,
                  title: "Safety First",
                  desc: "Industry leading safety standards",
                },
                {
                  icon: Zap,
                  title: "Instant Booking",
                  desc: "Reserve your flight in minutes",
                },
                {
                  icon: Award,
                  title: "Premium Service",
                  desc: "White-glove treatment always",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center"
                >
                  <feature.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="space-y-6">
            {/* Estimate Card */}
            {isLoading ? (
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-white/20 rounded"></div>
                  <div className="h-4 bg-white/10 rounded w-3/4"></div>
                  <div className="h-8 bg-white/20 rounded"></div>
                </div>
              </div>
            ) : duration && estimatedCost && selectedJet ? (
              <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 backdrop-blur-md rounded-3xl p-8 border border-emerald-400/30 animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    Flight Estimate
                  </h3>
                  <div className="flex items-center gap-1 text-emerald-400">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="text-sm">Premium Route</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Route Visual */}
                  <div className="flex items-center justify-between bg-white/10 rounded-2xl p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">
                        {departureCity}
                      </p>
                      <p className="text-white/60 text-sm">Departure</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <Plane className="w-8 h-8 text-blue-400 transform rotate-45 mb-2" />
                      <p className="text-white/60 text-xs">
                        {duration * 2}h flight
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">
                        {arrivalCity}
                      </p>
                      <p className="text-white/60 text-sm">Arrival</p>
                    </div>
                  </div>
                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-white/80 text-sm">
                          Flight Time
                        </span>
                      </div>
                      <p className="text-white font-semibold">
                        {duration * 2} hours
                      </p>
                      <p className="text-white/60 text-xs">Round trip</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span className="text-white/80 text-sm">Capacity</span>
                      </div>
                      <p className="text-white font-semibold">
                        {passengers} of {selectedJet.capacity}
                      </p>
                      <p className="text-white/60 text-xs">passengers</p>
                    </div>
                  </div>
                  {/* Total Cost */}
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-400/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/80">
                        Total Estimated Cost
                      </span>
                      <DollarSign className="w-5 h-5 text-emerald-400" />
                    </div>
                    <p className="text-3xl font-bold text-white mb-2">
                      {formatCurrency(estimatedCost)}
                    </p>
                    <p className="text-white/60 text-sm">
                      Including round trip & fuel
                    </p>
                  </div>
                  {/* Book Now Button */}
                  
                  {duration && estimatedCost && selectedJet && (
                    <button
                      onClick={() => {
                        // Pass the estimate forward via query params
                        const params = new URLSearchParams({
                          departureCity,
                          arrivalCity,
                          passengers: passengers.toString(),
                          duration: (duration * 2).toString(), // round trip hours
                          estimate: estimatedCost.toString(),
                        });

                        router.push(
                          `/jets/${selectedJet.id}/book?${params.toString()}`
                        );
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600
               hover:from-blue-700 hover:to-purple-700 text-white
               font-bold py-4 px-6 rounded-2xl transition-all duration-300
               transform hover:scale-105 hover:shadow-2xl
               hover:shadow-blue-500/25 flex items-center
               justify-center gap-2"
                    >
                      Book This Flight
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                 
                </div>
              </div>
            ) : departureCity && arrivalCity && jetId ? (
              <div className="bg-red-500/20 backdrop-blur-md rounded-3xl p-8 border border-red-400/30">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    Route Not Available
                  </h3>
                  <p className="text-white/60">
                    We don't have flight duration data for this route yet.
                    Please contact support for assistance.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="text-center text-white/60">
                  <Plane className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>
                    Select your departure city, destination, and aircraft to see
                    pricing
                  </p>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
                <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-white/60 text-sm">Availability</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
                <Shield className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                <p className="text-2xl font-bold text-white">100%</p>
                <p className="text-white/60 text-sm">Safety Record</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
