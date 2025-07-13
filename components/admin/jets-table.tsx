/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency, getCategoryLabel } from "@/lib/utils";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface JetsTableProps {
  jets: any[];
}

export function JetsTable({ jets }: JetsTableProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [deleteJetId, setDeleteJetId] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const handleToggleActive = async (jetId: string, currentStatus: boolean) => {
    setLoading(jetId);
    try {
      const response = await fetch(`/api/admin/jets/${jetId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (!response.ok) throw new Error("Failed to update jet");

      toast({
        title: "Success",
        description: `Jet ${
          !currentStatus ? "activated" : "deactivated"
        } successfully`,
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update jet status",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteJetId) return;

    setLoading(deleteJetId);
    try {
      const response = await fetch(`/api/admin/jets/${deleteJetId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete jet");

      toast({
        title: "Success",
        description: "Jet deleted successfully",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete jet",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
      setDeleteJetId(null);
    }
  };

  if (jets.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No jets found</p>
        <Button asChild>
          <Link href="/admin/jets/new">Add your first jet</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Image</th>
              <th className="text-left py-3">Name</th>
              <th className="text-left py-3">Category</th>
              <th className="text-left py-3">Capacity</th>
              <th className="text-left py-3">Price/Hour</th>
              <th className="text-left py-3">Bookings</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jets.map((jet) => (
              <tr key={jet.id} className="border-b hover:bg-gray-50">
                <td className="py-3">
                  <div className="relative h-12 w-16 rounded overflow-hidden">
                    <Image
                      src={jet.images[0] || "/placeholder-jet.jpg"}
                      alt={jet.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="py-3">
                  <div>
                    <p className="font-medium">{jet.name}</p>
                    <p className="text-sm text-gray-500">{jet.tailNumber}</p>
                  </div>
                </td>
                <td className="py-3">
                  <Badge variant="outline">
                    {getCategoryLabel(jet.category)}
                  </Badge>
                </td>
                <td className="py-3">{jet.capacity}</td>
                <td className="py-3">{formatCurrency(jet.pricePerHour)}</td>
                <td className="py-3">{jet._count.bookings}</td>
                <td className="py-3">
                  <Badge variant={jet.isActive ? "default" : "secondary"}>
                    {jet.isActive ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleActive(jet.id, jet.isActive)}
                      disabled={loading === jet.id}
                    >
                      {jet.isActive ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/admin/jets/${jet.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteJetId(jet.id)}
                      disabled={loading === jet.id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertDialog
        open={!!deleteJetId}
        onOpenChange={() => setDeleteJetId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the jet
              and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
