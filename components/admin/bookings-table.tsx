/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import {
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BookingsTableProps {
  bookings: any[];
  currentPage: number;
  totalPages: number;
}

export function BookingsTable({
  bookings,
  currentPage,
  totalPages,
}: BookingsTableProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);
  const [pilotDialog, setPilotDialog] = useState<{
    open: boolean;
    bookingId: string | null;
  }>({
    open: false,
    bookingId: null,
  });
  const [pilotName, setPilotName] = useState("");

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    setLoading(bookingId);
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update booking");

      toast({
        title: "Success",
        description: `Booking status updated to ${newStatus}`,
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const handleAssignPilot = async () => {
    if (!pilotDialog.bookingId || !pilotName) return;

    setLoading(pilotDialog.bookingId);
    try {
      const response = await fetch(
        `/api/admin/bookings/${pilotDialog.bookingId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pilotAssigned: pilotName }),
        }
      );

      if (!response.ok) throw new Error("Failed to assign pilot");

      toast({
        title: "Success",
        description: "Pilot assigned successfully",
      });
      setPilotDialog({ open: false, bookingId: null });
      setPilotName("");
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign pilot",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No bookings found</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Booking ID</th>
              <th className="text-left py-3">Customer</th>
              <th className="text-left py-3">Aircraft</th>
              <th className="text-left py-3">Route</th>
              <th className="text-left py-3">Date</th>
              <th className="text-left py-3">Amount</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-gray-50">
                <td className="py-3 font-mono text-sm">
                  {booking.id.slice(-8).toUpperCase()}
                </td>
                <td className="py-3">
                  <div>
                    <p className="font-medium">{booking.user.name}</p>
                    <p className="text-sm text-gray-500">
                      {booking.user.email}
                    </p>
                  </div>
                </td>
                <td className="py-3">{booking.jet.name}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span>{booking.departureCity}</span>
                    <ArrowRight className="h-3 w-3" />
                    <span>{booking.arrivalCity}</span>
                  </div>
                </td>
                <td className="py-3">
                  <div>
                    <p>{formatDate(booking.departureDate, "PP")}</p>
                    {booking.returnDate && (
                      <p className="text-sm text-gray-500">
                        Return: {formatDate(booking.returnDate, "PP")}
                      </p>
                    )}
                  </div>
                </td>
                <td className="py-3">{formatCurrency(booking.totalPrice)}</td>
                <td className="py-3">
                  <Badge
                    className={getStatusColor(booking.status)}
                    variant="secondary"
                  >
                    {booking.status}
                  </Badge>
                </td>
                <td className="py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={loading === booking.id}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/bookings/${booking.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      {booking.status === "PENDING" && (
                        <>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusUpdate(booking.id, "CONFIRMED")
                            }
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Confirm Booking
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusUpdate(booking.id, "CANCELLED")
                            }
                            className="text-red-600"
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel Booking
                          </DropdownMenuItem>
                        </>
                      )}
                      {booking.status === "CONFIRMED" && (
                        <>
                          <DropdownMenuItem
                            onClick={() =>
                              setPilotDialog({
                                open: true,
                                bookingId: booking.id,
                              })
                            }
                          >
                            Assign Pilot
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusUpdate(booking.id, "COMPLETED")
                            }
                          >
                            Mark as Completed
                          </DropdownMenuItem>
                        </>
                      )}
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
              router.push(`/admin/bookings?page=${currentPage - 1}`)
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
              router.push(`/admin/bookings?page=${currentPage + 1}`)
            }
          >
            Next
          </Button>
        </div>
      )}

      {/* Assign Pilot Dialog */}
      <Dialog
        open={pilotDialog.open}
        onOpenChange={(open) => setPilotDialog({ open, bookingId: null })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Pilot</DialogTitle>
            <DialogDescription>
              Enter the name of the pilot to assign to this flight.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pilot" className="text-right">
                Pilot Name
              </Label>
              <Input
                id="pilot"
                value={pilotName}
                onChange={(e) => setPilotName(e.target.value)}
                className="col-span-3"
                placeholder="Captain John Smith"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={handleAssignPilot}
              disabled={!pilotName || loading === pilotDialog.bookingId}
            >
              Assign Pilot
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
