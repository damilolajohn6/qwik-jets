import  prisma  from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export async function UpcomingFlights() {
  const bookings = await prisma.booking.findMany({
    where: {
      status: "CONFIRMED",
      departureDate: {
        gte: new Date(),
      },
    },
    take: 10,
    orderBy: { departureDate: "asc" },
    include: {
      user: true,
      jet: true,
    },
  });

  if (bookings.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">No upcoming flights</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Date</th>
            <th className="text-left py-2">Customer</th>
            <th className="text-left py-2">Aircraft</th>
            <th className="text-left py-2">Route</th>
            <th className="text-left py-2">Pilot</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b hover:bg-gray-50">
              <td className="py-3">
                {formatDate(booking.departureDate, "MMM d, yyyy")}
              </td>
              <td className="py-3">{booking.user.name}</td>
              <td className="py-3">{booking.jet.name}</td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <span>{booking.departureCity}</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <span>{booking.arrivalCity}</span>
                </div>
              </td>
              <td className="py-3">
                {booking.pilotAssigned || (
                  <span className="text-amber-600">Not assigned</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
