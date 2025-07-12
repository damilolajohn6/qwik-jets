import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function JetsListSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="h-64 bg-gray-200 animate-skeleton" />
          <CardContent className="p-6">
            <div className="h-6 bg-gray-200 rounded animate-skeleton mb-2 w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-skeleton mb-1" />
            <div className="h-4 bg-gray-200 rounded animate-skeleton mb-4 w-5/6" />

            <div className="grid grid-cols-2 gap-4">
              <div className="h-4 bg-gray-200 rounded animate-skeleton" />
              <div className="h-4 bg-gray-200 rounded animate-skeleton" />
              <div className="h-4 bg-gray-200 rounded animate-skeleton" />
              <div className="h-4 bg-gray-200 rounded animate-skeleton" />
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0 flex items-center justify-between">
            <div>
              <div className="h-8 bg-gray-200 rounded animate-skeleton w-24 mb-1" />
              <div className="h-3 bg-gray-200 rounded animate-skeleton w-16" />
            </div>
            <div className="h-10 bg-gray-200 rounded animate-skeleton w-28" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
