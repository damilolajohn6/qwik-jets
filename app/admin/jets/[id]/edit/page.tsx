import { notFound } from "next/navigation";
import  prisma  from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JetForm } from "@/components/admin/jet-form";

interface EditJetPageProps {
  params: {
    id: string;
  };
}

export default async function EditJetPage({ params }: EditJetPageProps) {
  const jet = await prisma.jet.findUnique({
    where: { id: params.id },
  });

  if (!jet) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Jet</h1>
        <p className="text-gray-600">Update aircraft information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Jet Details</CardTitle>
          <CardDescription>
            Update the information below to modify the jet details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <JetForm
            initialData={{
              name: jet.name,
              tailNumber: jet.tailNumber,
              description: jet.description,
              category: jet.category,
              capacity: jet.capacity,
              amenities: jet.amenities,
              maxRange: jet.maxRange,
              cruiseSpeed: jet.cruiseSpeed,
              pricePerHour: jet.pricePerHour,
              images: jet.images,
              baseLocation: jet.baseLocation,
            }}
            jetId={jet.id}
          />
        </CardContent>
      </Card>
    </div>
  );
}
