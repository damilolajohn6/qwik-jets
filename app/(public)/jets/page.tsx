/* eslint-disable react/no-unescaped-entities */
import { Suspense } from "react";
import JetsList from "@/components/jets/jets-list";
import { JetsFilter } from "@/components/jets/jets-filter";
import { JetsListSkeleton } from "@/components/jets/jets-list-skeleton";
import JetSelectHero from "@/components/public/JetSelectHero";

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <JetSelectHero />

      {/* Intro */}
      <section className="bg-white border-b py-12 px-4 md:py-16">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6">
            Select Your Perfect Jet
          </h1>
          <p className="text-lg sm:text-xl text-[#EBC13C] text-center mb-4">
            Experience luxury, comfort, and seamless travel.
          </p>
          <p className="text-base sm:text-lg text-gray-600 text-center leading-relaxed max-w-3xl mx-auto">
            Fly farther, faster, and in ultimate luxury with the world’s most
            coveted business jet. Explore our curated selection of private jets,
            tailored to your travel needs. Whether you're looking for speed,
            space, or ultimate indulgence, we have the perfect aircraft for your
            journey. Choose your ideal jet and take off in style.
          </p>
        </div>
      </section>

      {/* Filter + Listings */}
      <section className="container mx-auto px-4 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Filter */}
          <aside className="lg:col-span-1">
            <JetsFilter />
          </aside>

          {/* List */}
          <main className="lg:col-span-3">
            <Suspense fallback={<JetsListSkeleton />}>
              <JetsList searchParams={resolvedParams} />
            </Suspense>
          </main>
        </div>
      </section>
    </div>
  );
}
