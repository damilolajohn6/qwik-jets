/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { jetCreateSchema } from "@/lib/validations";
import { Category } from "@prisma/client";
import { getCategoryLabel } from "@/lib/utils";
import { Loader2, Plus, X } from "lucide-react";
import type { z } from "zod";
import Image from "next/image";

// Add global declaration for Cloudinary widget
declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (
        options: any,
        callback: (error: any, result: any) => void
      ) => { open: () => void };
    };
  }
}

type JetFormData = z.infer<typeof jetCreateSchema>;

interface JetFormProps {
  initialData?: Partial<JetFormData>;
  jetId?: string;
}

export function JetForm({ initialData, jetId }: JetFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [amenities, setAmenities] = useState<string[]>(
    initialData?.amenities || []
  );
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [newAmenity, setNewAmenity] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<JetFormData>({
    resolver: zodResolver(jetCreateSchema),
    defaultValues: initialData || {
      capacity: 1,
      maxRange: 1000,
      cruiseSpeed: 400,
      pricePerHour: 2000,
    },
  });

  // Load Cloudinary widget script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openCloudinaryWidget = () => {
    if (typeof window !== "undefined" && window.cloudinary) {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
          folder: "swiftjet/jets",
          multiple: true,
          sources: ["local", "url", "camera"],
          clientAllowedFormats: ["jpg", "png", "jpeg"],
          maxFileSize: 10000000, // 10MB
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            const newImageUrl = result.info.secure_url;
            setImages((prev) => [...prev, newImageUrl]);
            toast({
              title: "Success",
              description: "Image uploaded successfully",
            });
          } else if (error) {
            toast({
              title: "Error",
              description: "Failed to upload image",
              variant: "destructive",
            });
          }
        }
      );
      widget.open();
    } else {
      toast({
        title: "Error",
        description: "Cloudinary widget not available",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: JetFormData) => {
    setIsLoading(true);

    try {
      const payload = {
        ...data,
        amenities,
        images,
      };

      const response = await fetch(
        jetId ? `/api/admin/jets/${jetId}` : "/api/admin/jets",
        {
          method: jetId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save jet");
      }

      toast({
        title: "Success",
        description: `Jet ${jetId ? "updated" : "created"} successfully`,
      });

      router.push("/admin/jets");
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to save jet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addAmenity = () => {
    if (newAmenity.trim()) {
      setAmenities([...amenities, newAmenity.trim()]);
      setNewAmenity("");
    }
  };

  const removeAmenity = (index: number) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="e.g., Gulfstream G650"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tailNumber">Tail Number</Label>
          <Input
            id="tailNumber"
            placeholder="e.g., N123AB"
            {...register("tailNumber")}
          />
          {errors.tailNumber && (
            <p className="text-sm text-red-500">{errors.tailNumber.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={4}
          placeholder="Describe the aircraft..."
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            defaultValue={initialData?.category}
            onValueChange={(value) => setValue("category", value as Category)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Category).map((category) => (
                <SelectItem key={category} value={category}>
                  {getCategoryLabel(category)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="baseLocation">Base Location</Label>
          <Input
            id="baseLocation"
            placeholder="e.g., New York, NY"
            {...register("baseLocation")}
          />
          {errors.baseLocation && (
            <p className="text-sm text-red-500">
              {errors.baseLocation.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            min="1"
            max="20"
            {...register("capacity", { valueAsNumber: true })}
          />
          {errors.capacity && (
            <p className="text-sm text-red-500">{errors.capacity.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxRange">Max Range (nm)</Label>
          <Input
            id="maxRange"
            type="number"
            min="100"
            {...register("maxRange", { valueAsNumber: true })}
          />
          {errors.maxRange && (
            <p className="text-sm text-red-500">{errors.maxRange.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cruiseSpeed">Cruise Speed (kts)</Label>
          <Input
            id="cruiseSpeed"
            type="number"
            min="100"
            {...register("cruiseSpeed", { valueAsNumber: true })}
          />
          {errors.cruiseSpeed && (
            <p className="text-sm text-red-500">{errors.cruiseSpeed.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pricePerHour">Price per Hour (₦)</Label>
          <Input
            id="pricePerHour"
            type="number"
            min="500"
            step="100"
            {...register("pricePerHour", { valueAsNumber: true })}
          />
          {errors.pricePerHour && (
            <p className="text-sm text-red-500">
              {errors.pricePerHour.message}
            </p>
          )}
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-2">
        <Label>Amenities</Label>
        <div className="flex gap-2">
          <Input
            value={newAmenity}
            onChange={(e) => setNewAmenity(e.target.value)}
            placeholder="Add amenity..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addAmenity();
              }
            }}
          />
          <Button type="button" onClick={addAmenity} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
              <span>{amenity}</span>
              <button
                type="button"
                onClick={() => removeAmenity(index)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Images */}
      <div className="space-y-2">
        <Label>Images</Label>
        <div className="flex gap-2">
          <Button type="button" onClick={openCloudinaryWidget}>
            Upload Images
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={image}
                width={200}
                height={150}
                alt={`Jet image ${index + 1}`}
                className="w-full h-32 object-cover rounded-md"
              />
              <Button
                type="button"
                onClick={() => removeImage(index)}
                size="icon"
                variant="destructive"
                className="absolute top-1 right-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        {images.length === 0 && (
          <p className="text-sm text-gray-500">No images uploaded</p>
        )}
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : jetId ? (
            "Update Jet"
          ) : (
            "Create Jet"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/jets")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
