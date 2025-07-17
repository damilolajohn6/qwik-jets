/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
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
import Image from "next/image";

const bookingSchema = z.object({
  departureDate: z.string().min(1, "Departure date is required"),
  returnDate: z.string().optional(),
  departureCity: z.string().min(2, "Departure city is required"),
  arrivalCity: z.string().min(2, "Arrival city is required"),
  passengers: z.number().min(1).max(20),
  specialRequests: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  jetData: {
    id: string;
    name: string;
    pricePerHour: number;
    capacity: number;
    images: string[];
  };
}

export function BookingForm({ jetData }: BookingFormProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
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

  // Watch dates to calculate price
  const departureDate = watch("departureDate");
  const returnDate = watch("returnDate");

  useEffect(() => {
    if (departureDate) {
      const departure = new Date(departureDate);
      const returnDt = returnDate ? new Date(returnDate) : undefined;
      const price = calculateTotalPrice(
        jetData.pricePerHour,
        departure,
        returnDt
      );
      setTotalPrice(price);
    }
  }, [departureDate, returnDate, jetData.pricePerHour]);

  const onSubmit = async (data: BookingFormData) => {
    if (status === "unauthenticated") {
      router.push(
        `/login?callbackUrl=${encodeURIComponent(`/jets/${jetData.id}/book`)}`
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
          jetId: jetData.id,
          totalPrice,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create booking");
      }

      const booking = await response.json();

      toast({
        title: "Success!",
        description: "Your booking has been created successfully.",
      });

      router.push(`/bookings/${booking.id}`);
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book {jetData.name}</CardTitle>
        <CardDescription>
          Fill in your flight details to complete your booking
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Display Jet Images */}
        {jetData.images && jetData.images.length > 0 && (
          <div className="mb-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {jetData.images.map((image, index) => (
                <Image
                  src={image}
                  width={200}
                  height={150}
                  key={index}
                  alt={`Jet image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        )}

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
            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
            <Textarea
              id="specialRequests"
              placeholder="Any special requirements or preferences..."
              rows={4}
              {...register("specialRequests")}
            />
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Estimated Total:</span>
              <span className="text-2xl font-bold text-primary">
                {formatCurrency(totalPrice)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              * Final price may vary based on actual flight time and additional
              services
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
                <Link href={`/jets/${jetData.id}`}>Cancel</Link>
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
