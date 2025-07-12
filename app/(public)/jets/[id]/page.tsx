/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import  prisma  from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency, getCategoryLabel } from "@/lib/utils";
import { AvailabilityCalendar } from "@/components/jets/availability-calender";
import {
  MapPin,
  Users,
  Gauge,
  Globe,
  Wifi,
  Coffee,
  Tv,
  Wine,
  Bed,
  Utensils,
  Shield,
  Briefcase,
} from "lucide-react";

interface JetDetailPageProps {
  params: {
    id: string;
  };
}

const amenityIcons: Record<string, any> = {
  "Wi-Fi": Wifi,
  "Entertainment System": Tv,
  "Refreshment Center": Coffee,
  "Full Galley": Utensils,
  "Full Kitchen": Utensils,
  Minibar: Wine,
  "Sleeping Configuration": Bed,
  "Private Stateroom": Bed,
  "Conference Suite": Briefcase,
  Lavatory: Shield,
};

export default async function JetDetailPage({ params }: JetDetailPageProps) {
  const { id } = await params;
  const jet = await prisma.jet.findUnique({
    where: {
      id: id,
      isActive: true,
    },
    include: {
      availability: {
        where: {
          date: {
            gte: new Date(),
            lte: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // Next 90 days
          },
        },
      },
    },
  });

  if (!jet) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        <Image
          src={jet.images[0] || "/placeholder-jet.jpg"}
          alt={jet.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <Badge className="mb-4" variant="secondary">
              {getCategoryLabel(jet.category)}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{jet.name}</h1>
            <p className="text-xl opacity-90">Tail Number: {jet.tailNumber}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>About This Aircraft</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {jet.description}
                </p>
              </CardContent>
            </Card>

            <Tabs defaultValue="specs">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>

              <TabsContent value="specs">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-semibold">Passenger Capacity</p>
                          <p className="text-gray-600">
                            {jet.capacity} passengers
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Globe className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-semibold">Maximum Range</p>
                          <p className="text-gray-600">
                            {jet.maxRange} nautical miles
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Gauge className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-semibold">Cruise Speed</p>
                          <p className="text-gray-600">
                            {jet.cruiseSpeed} knots
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-semibold">Base Location</p>
                          <p className="text-gray-600">{jet.baseLocation}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="amenities">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {jet.amenities.map((amenity) => {
                        const Icon = amenityIcons[amenity] || Shield;
                        return (
                          <div
                            key={amenity}
                            className="flex items-center gap-3"
                          >
                            <Icon className="h-5 w-5 text-primary" />
                            <span>{amenity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gallery">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {jet.images.map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-video rounded-lg overflow-hidden"
                        >
                          <Image
                            src={image}
                            alt={`${jet.name} - Image ${index + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-4xl font-bold text-primary">
                    {formatCurrency(jet.pricePerHour)}
                  </p>
                  <p className="text-gray-600">per hour</p>
                  <p className="text-sm text-gray-500 mt-2">
                    * Minimum 2 hours for one-way flights
                  </p>
                </div>
                <Button asChild className="w-full mt-4" size="lg">
                  <Link href={`/jets/${jet.id}/book`}>Book This Jet</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <AvailabilityCalendar availability={jet.availability} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our aviation experts are here to help you plan your perfect
                  flight.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
