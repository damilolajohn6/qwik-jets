/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency, calculateTotalPrice } from "@/lib/utils";
import { Calendar, MapPin, Users, Loader2 } from "lucide-react";
import Link from "next/link";

const bookingSchema = z.object({
  departureDate: z.string().min(1, "Departure date is required"),
  returnDate: z.string().optional(),
  departureCity: z.string().min(2, "Departure city is required"),
  arrivalCity: z.string().min(2, "Arrival city is required"),
  passengers: z.number().min(1).max(20),
  specialRequests: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingPageProps {
  params: {
    id: string;
  };
}

export default function BookingPage({ params }: BookingPageProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [jetData, setJetData] = useState<any>(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      passengers: 1,
    },
  });

  // Fetch jet data on component mount
  useState(() => {
    fetch(`/api/jets/${params.id}`)
      .then((res) => res.json())
      .then((data) => setJetData(data));
  });

  // Watch dates to calculate price
  const departureDate = watch("departureDate");
  const returnDate = watch("returnDate");

  useState(() => {
    if (jetData && departureDate) {
      const departure = new Date(departureDate);
      const returnDt = returnDate ? new Date(returnDate) : undefined;
      const price = calculateTotalPrice(
        jetData.pricePerHour,
        departure,
        returnDt
      );
      setTotalPrice(price);
    }
  });

  const onSubmit = async (data: BookingFormData) => {
    if (status === "unauthenticated") {
      router.push(
        "/login?callbackUrl=" + encodeURIComponent(window.location.pathname)
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          jetId: params.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      const booking = await response.json();

      toast({
        title: "Success!",
        description: "Your booking has been created successfully.",
      });

      router.push(`/bookings/${booking.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!jetData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Book {jetData.name}</CardTitle>
            <CardDescription>
              Fill in your flight details to complete your booking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="departureDate">
                    <Calendar className="inline-block h-4 w-4 mr-1" />
                    Departure Date
                  </Label>
                  <Input
                    id="departureDate"
                    type="datetime-local"
                    {...register("departureDate")}
                    min={new Date().toISOString().slice(0, 16)}
                  />
                  {errors.departureDate && (
                    <p className="text-sm text-red-500">
                      {errors.departureDate.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="returnDate">
                    <Calendar className="inline-block h-4 w-4 mr-1" />
                    Return Date (Optional)
                  </Label>
                  <Input
                    id="returnDate"
                    type="datetime-local"
                    {...register("returnDate")}
                    min={departureDate || new Date().toISOString().slice(0, 16)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="departureCity">
                    <MapPin className="inline-block h-4 w-4 mr-1" />
                    Departure City
                  </Label>
                  <Input
                    id="departureCity"
                    placeholder="e.g., New York, NY"
                    {...register("departureCity")}
                  />
                  {errors.departureCity && (
                    <p className="text-sm text-red-500">
                      {errors.departureCity.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="arrivalCity">
                    <MapPin className="inline-block h-4 w-4 mr-1" />
                    Arrival City
                  </Label>
                  <Input
                    id="arrivalCity"
                    placeholder="e.g., Los Angeles, CA"
                    {...register("arrivalCity")}
                  />
                  {errors.arrivalCity && (
                    <p className="text-sm text-red-500">
                      {errors.arrivalCity.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="passengers">
                  <Users className="inline-block h-4 w-4 mr-1" />
                  Number of Passengers
                </Label>
                <Input
                  id="passengers"
                  type="number"
                  min="1"
                  max={jetData.capacity}
                  {...register("passengers", { valueAsNumber: true })}
                />
                {errors.passengers && (
                  <p className="text-sm text-red-500">
                    {errors.passengers.message}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  Maximum capacity: {jetData.capacity} passengers
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialRequests">
                  Special Requests (Optional)
                </Label>
                <Textarea
                  id="specialRequests"
                  placeholder="Any special requirements or preferences..."
                  rows={4}
                  {...register("specialRequests")}
                />
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">
                    Estimated Total:
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                  * Final price may vary based on actual flight time and
                  additional services
                </p>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Confirm Booking"
                    )}
                  </Button>
                  <Button type="button" variant="outline" size="lg" asChild>
                    <Link href={`/jets/${params.id}`}>Cancel</Link>
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
