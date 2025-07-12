"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Menu } from "lucide-react";

export function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex-1" />

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Welcome, {session?.user?.name || "Admin"}
          </span>
          <Avatar>
            <AvatarImage src={session?.user?.image || undefined} />
            <AvatarFallback>
              {getInitials(session?.user?.name || "Admin User")}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
