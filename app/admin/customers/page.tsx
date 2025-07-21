import prisma from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomersTable } from "@/components/admin/customers-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download } from "lucide-react";

// Update the interface to reflect that searchParams is a Promise
export default async function AdminCustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  // Await the searchParams Promise to get the actual parameters
  const { search, page: pageParam } = await searchParams;

  const page = parseInt(pageParam || "1");
  const limit = 20;
  const skip = (page - 1) * limit;
  const searchTerm = search || "";

  const where = searchTerm
    ? {
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" as const } },
          { email: { contains: searchTerm, mode: "insensitive" as const } },
          { phone: { contains: searchTerm, mode: "insensitive" as const } },
        ],
        role: "USER" as const,
      }
    : { role: "USER" as const };

  const [customers, totalCount] = await Promise.all([
    prisma.user.findMany({
      where,
      include: {
        _count: {
          select: { bookings: true },
        },
        bookings: {
          select: {
            totalPrice: true,
            status: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where }),
  ]);

  const customersWithStats = customers.map((customer) => ({
    ...customer,
    totalSpent: customer.bookings
      .filter((b) => b.status === "CONFIRMED" || b.status === "COMPLETED")
      .reduce((sum, b) => sum + b.totalPrice, 0),
  }));

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-gray-600">Manage your customer base</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Customers ({totalCount})</CardTitle>
            <form className="flex items-center gap-2">
              <Input
                name="search"
                placeholder="Search customers..."
                defaultValue={searchTerm}
                className="w-64"
              />
              <Button type="submit" size="icon" variant="secondary">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardHeader>
        <CardContent>
          <CustomersTable
            customers={customersWithStats}
            currentPage={page}
            totalPages={totalPages}
          />
        </CardContent>
      </Card>
    </div>
  );
}
