import { Suspense } from "react";
import JetsList from "@/components/jets/jets-list";
import { JetsFilter } from "@/components/jets/jets-filter";
import { JetsListSkeleton } from "@/components/jets/jets-list-skeleton";

interface JetsPageProps {
  searchParams: Promise<{
    category?: string;
    minCapacity?: string;
    maxPrice?: string;
    location?: string;
  }>;
}

export default async function JetsPage({ searchParams }: JetsPageProps) {
  const resolvedParams = await searchParams;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-4">Our Fleet</h1>
          <p className="text-xl text-center text-gray-600 max-w-2xl mx-auto">
            Browse our premium selection of private jets, each maintained to the
            highest standards of safety and luxury.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1"><JetsFilter /></aside>
          <main className="lg:col-span-3">
            <Suspense fallback={<JetsListSkeleton />}>
              <JetsList searchParams={resolvedParams} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}
