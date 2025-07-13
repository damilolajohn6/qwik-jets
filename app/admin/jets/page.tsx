import Link from "next/link";
import  prisma  from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JetsTable } from "@/components/admin/jets-table";
import { Plus } from "lucide-react";

export default async function AdminJetsPage() {
  const jets = await prisma.jet.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { bookings: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Jets Management</h1>
          <p className="text-gray-600">Manage your fleet of aircraft</p>
        </div>
        <Button asChild>
          <Link href="/admin/jets/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Jet
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Jets</CardTitle>
        </CardHeader>
        <CardContent>
          <JetsTable jets={jets} />
        </CardContent>
      </Card>
    </div>
  );
}
