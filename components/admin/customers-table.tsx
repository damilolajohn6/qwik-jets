/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency, formatDate } from "@/lib/utils";
import { MoreHorizontal, Ban, CheckCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CustomersTableProps {
  customers: any[];
  currentPage: number;
  totalPages: number;
}

export function CustomersTable({
  customers,
  currentPage,
  totalPages,
}: CustomersTableProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const handleToggleSuspend = async (
    userId: string,
    currentStatus: boolean
  ) => {
    setLoading(userId);
    try {
      const response = await fetch(`/api/admin/customers/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ suspended: !currentStatus }),
      });

      if (!response.ok) throw new Error("Failed to update customer");

      toast({
        title: "Success",
        description: `Customer ${
          !currentStatus ? "suspended" : "activated"
        } successfully`,
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update customer status",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  if (customers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No customers found</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Customer</th>
              <th className="text-left py-3">Contact</th>
              <th className="text-left py-3">Bookings</th>
              <th className="text-left py-3">Total Spent</th>
              <th className="text-left py-3">Joined</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b hover:bg-gray-50">
                <td className="py-3">
                  <div>
                    <p className="font-medium">{customer.name || "N/A"}</p>
                    <p className="text-sm text-gray-500">{customer.email}</p>
                  </div>
                </td>
                <td className="py-3">
                  <p className="text-sm">{customer.phone || "No phone"}</p>
                </td>
                <td className="py-3">{customer._count.bookings}</td>
                <td className="py-3">{formatCurrency(customer.totalSpent)}</td>
                <td className="py-3">{formatDate(customer.createdAt, "PP")}</td>
                <td className="py-3">
                  <Badge
                    variant={customer.suspended ? "destructive" : "default"}
                  >
                    {customer.suspended ? "Suspended" : "Active"}
                  </Badge>
                </td>
                <td className="py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/customers/${customer.id}`}>
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleToggleSuspend(customer.id, customer.suspended)
                        }
                        disabled={loading === customer.id}
                      >
                        {customer.suspended ? (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Activate
                          </>
                        ) : (
                          <>
                            <Ban className="mr-2 h-4 w-4" />
                            Suspend
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() =>
              router.push(`/admin/customers?page=${currentPage - 1}`)
            }
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() =>
              router.push(`/admin/customers?page=${currentPage + 1}`)
            }
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}
