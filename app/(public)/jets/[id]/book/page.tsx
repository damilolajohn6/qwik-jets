import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { BookingForm } from "@/components/jets/booking-form";

// Update the interface to reflect that params is a Promise
interface BookingPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
  // Await the params Promise to get the actual parameters
  const { id } = await params;

  const jet = await prisma.jet.findUnique({
    where: { id },
  });

  if (!jet) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <BookingForm jetData={jet} />
      </div>
    </div>
  );
}
