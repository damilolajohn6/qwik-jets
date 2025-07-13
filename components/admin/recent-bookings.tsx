import  prisma  from "@/lib/db";
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export async function RecentBookings() {
  const bookings = await prisma.booking.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      jet: true,
    },
  });

  if (bookings.length === 0) {
    return <p className="text-gray-500 text-center py-4">No recent bookings</p>;
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="flex items-center justify-between">
          <div className="flex-1">
            <p className="font-medium">{booking.user.name}</p>
            <p className="text-sm text-gray-600">
              {booking.jet.name} • {formatDate(booking.departureDate, "PP")}
            </p>
          </div>
          <div className="text-right">
            <p className="font-medium">{formatCurrency(booking.totalPrice)}</p>
            <Badge
              className={getStatusColor(booking.status)}
              variant="secondary"
            >
              {booking.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
