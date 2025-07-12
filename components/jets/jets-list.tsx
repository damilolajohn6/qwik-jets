/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/db";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, getCategoryLabel } from "@/lib/utils";
import { MapPin, Users, Gauge, Globe } from "lucide-react";
import type { Prisma } from "@prisma/client";

interface JetsListProps {
  searchParams: Promise<{
    category?: string;
    minCapacity?: string;
    maxPrice?: string;
    location?: string;
  }>;
}

export default async function JetsList({ searchParams }: JetsListProps) {
  const resolvedParams = await searchParams;

  const where: Prisma.JetWhereInput = {
    isActive: true,
  };

  if (resolvedParams.category) {
    where.category = resolvedParams.category as any;
  }

  if (resolvedParams.minCapacity) {
    const min = parseInt(resolvedParams.minCapacity);
    if (!isNaN(min)) {
      where.capacity = { gte: min };
    }
  }

  if (resolvedParams.maxPrice) {
    const max = parseFloat(resolvedParams.maxPrice);
    if (!isNaN(max)) {
      where.pricePerHour = { lte: max };
    }
  }

  if (resolvedParams.location) {
    where.baseLocation = {
      contains: resolvedParams.location,
      mode: "insensitive",
    };
  }

  const jets = await prisma.jet.findMany({
    where,
    orderBy: { pricePerHour: "asc" },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      category: true,
      capacity: true,
      cruiseSpeed: true,
      maxRange: true,
      pricePerHour: true,
      baseLocation: true,
    },
  });

  if (!jets.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No jets found matching your criteria.
        </p>
        <Button asChild className="mt-4">
          <Link href="/jets">Clear filters</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {jets.map((jet) => (
        <Card
          key={jet.id}
          className="overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="relative h-60 sm:h-64 md:h-72 lg:h-80">
            <Image
              src={
                Array.isArray(jet.images) && jet.images.length > 0
                  ? jet.images[0]
                  : "/placeholder-jet.jpg"
              }
              alt={jet.name}
              fill
              className="object-cover"
              priority
            />
            <Badge className="absolute top-4 left-4 bg-white/90 text-black font-medium text-xs px-3 py-1">
              {getCategoryLabel(jet.category)}
            </Badge>
          </div>

          <CardContent className="p-5">
            <h3 className="text-xl font-semibold mb-1">{jet.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {jet.description}
            </p>

            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{jet.capacity} passengers</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{jet.maxRange} nm</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4" />
                <span>{jet.cruiseSpeed} knots</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{jet.baseLocation}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="px-5 pb-5 flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-primary">
                {formatCurrency(jet.pricePerHour)}
              </p>
              <p className="text-xs text-gray-500">per hour</p>
            </div>
            <Button size="sm" asChild>
              <Link href={`/jets/${jet.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

