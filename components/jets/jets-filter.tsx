"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@prisma/client";
import { getCategoryLabel } from "@/lib/utils";

export function JetsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState("");
  const [minCapacity, setMinCapacity] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [location, setLocation] = useState("");

  // Sync URL params into local state after hydration
  useEffect(() => {
    if (searchParams) {
      const categoryParam = searchParams.get("category");
      setCategory(categoryParam || "all"); // Default to "all" if no category is set
      setMinCapacity(searchParams.get("minCapacity") || "");
      setMaxPrice(searchParams.get("maxPrice") || "");
      setLocation(searchParams.get("location") || "");
    }
  }, [searchParams]);

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key === "category" && value === "all") {
      params.delete("category"); // Remove category param when "all" is selected
    } else if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/jets?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/jets");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Jets</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Select */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={category}
            onValueChange={(value) => {
              setCategory(value);
              updateParams("category", value);
            }}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {Object.values(Category).map((c) => (
                <SelectItem key={c} value={c}>
                  {getCategoryLabel(c)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Min Capacity */}
        <div className="space-y-2">
          <Label htmlFor="minCapacity">Minimum Capacity</Label>
          <Input
            id="minCapacity"
            type="number"
            min="1"
            value={minCapacity}
            onChange={(e) => {
              setMinCapacity(e.target.value);
              updateParams("minCapacity", e.target.value);
            }}
            placeholder="Any"
          />
        </div>

        {/* Max Price */}
        <div className="space-y-2">
          <Label htmlFor="maxPrice">Maximum Price (per hour)</Label>
          <Input
            id="maxPrice"
            type="number"
            step="100"
            min="0"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              updateParams("maxPrice", e.target.value);
            }}
            placeholder="Any"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Base Location</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              updateParams("location", e.target.value);
            }}
            placeholder="e.g. New York"
          />
        </div>

        <Button variant="outline" className="w-full" onClick={clearFilters}>
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
}
