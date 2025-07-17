import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import  prisma  from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import { Plane, Users, Calendar, DollarSign } from "lucide-react";
import { startOfMonth, endOfMonth } from "date-fns";
import { RevenueChart } from "@/components/admin/revenue-chart";
import { RecentBookings } from "@/components/admin/recent-bookings";
import { UpcomingFlights } from "@/components/admin/upcoming-flights";

export default async function AdminDashboard() {
  // Get current month date range
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  // Fetch metrics
  const [
    totalJets,
    activeJets,
    totalCustomers,
    monthlyBookings,
    monthlyRevenue,
    pendingBookings,
    upcomingBookings,
  ] = await Promise.all([
    prisma.jet.count(),
    prisma.jet.count({ where: { isActive: true } }),
    prisma.user.count({ where: { role: "USER" } }),
    prisma.booking.count({
      where: {
        createdAt: {
          gte: monthStart,
          lte: monthEnd,
        },
      },
    }),
    prisma.booking.aggregate({
      where: {
        createdAt: {
          gte: monthStart,
          lte: monthEnd,
        },
        status: "CONFIRMED",
      },
      _sum: {
        totalPrice: true,
      },
    }),
    prisma.booking.count({ where: { status: "PENDING" } }),
    prisma.booking.count({
      where: {
        status: "CONFIRMED",
        departureDate: {
          gte: now,
        },
      },
    }),
  ]);

  const metrics = [
    {
      title: "Total Jets",
      value: totalJets,
      subtitle: `${activeJets} active`,
      icon: Plane,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      subtitle: "Registered users",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Monthly Revenue",
      value: formatCurrency(monthlyRevenue._sum.totalPrice || 0),
      subtitle: `${monthlyBookings} bookings`,
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Active Bookings",
      value: upcomingBookings,
      subtitle: `${pendingBookings} pending`,
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Lists */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentBookings />
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Flights */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Flights</CardTitle>
        </CardHeader>
        <CardContent>
          <UpcomingFlights />
        </CardContent>
      </Card>
    </div>
  );
}
