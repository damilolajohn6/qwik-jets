import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import  prisma  from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import {
  Calendar,
  MapPin,
  Users,
  Plane,
} from "lucide-react";
import Link from "next/link";

interface BookingDetailPageProps {
  params: {
    id: string;
  };
}

export default async function BookingDetailPage({
  params,
}: BookingDetailPageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const booking = await prisma.booking.findUnique({
    where: {
      id: params.id,
      // Only show booking if user owns it or is admin
      ...(session.user.role !== "ADMIN" && { userId: session.user.id }),
    },
    include: {
      user: true,
      jet: true,
      payment: true,
    },
  });

  if (!booking) {
    notFound();
  }

  const isUpcoming = new Date(booking.departureDate) > new Date();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="grid gap-6">
          {/* Header Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    Booking #{booking.id.slice(-8).toUpperCase()}
                  </CardTitle>
                  <CardDescription>
                    Booked on {formatDate(booking.createdAt, "PPP")}
                  </CardDescription>
                </div>
                <Badge
                  className={getStatusColor(booking.status)}
                  variant="secondary"
                >
                  {booking.status}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Flight Details */}
          <Card>
            <CardHeader>
              <CardTitle>Flight Details</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Aircraft</p>
                  <div className="flex items-center gap-2">
                    <Plane className="h-4 w-4 text-gray-400" />
                    <p className="font-medium">{booking.jet.name}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Route</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <p className="font-medium">
                      {booking.departureCity} → {booking.arrivalCity}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Passengers</p>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <p className="font-medium">{booking.passengers}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Departure</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="font-medium">
                      {formatDate(booking.departureDate, "PPP")} at{" "}
                      {formatDate(booking.departureDate, "p")}
                    </p>
                  </div>
                </div>

                {booking.returnDate && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Return</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <p className="font-medium">
                        {formatDate(booking.returnDate, "PPP")} at{" "}
                        {formatDate(booking.returnDate, "p")}
                      </p>
                    </div>
                  </div>
                )}

                {booking.pilotAssigned && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Pilot</p>
                    <p className="font-medium">{booking.pilotAssigned}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Special Requests */}
          {booking.specialRequests && (
            <Card>
              <CardHeader>
                <CardTitle>Special Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{booking.specialRequests}</p>
              </CardContent>
            </Card>
          )}

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(booking.totalPrice)}
                  </p>
                </div>
                {booking.payment && (
                  <Badge
                    className={
                      booking.payment.status === "COMPLETED"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    Payment {booking.payment.status}
                  </Badge>
                )}
              </div>

              {booking.status === "PENDING" && !booking.payment && (
                <Button className="w-full">Complete Payment</Button>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          {isUpcoming && booking.status === "CONFIRMED" && (
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  Download Itinerary
                </Button>
                <Button variant="outline" className="flex-1">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
