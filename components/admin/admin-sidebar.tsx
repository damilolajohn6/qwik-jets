"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Plane,
  Users,
  Calendar,
  LogOut,
  Mail
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Jets", href: "/admin/jets", icon: Plane },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Bookings", href: "/admin/bookings", icon: Calendar },
  { name: "Messages", href: "/admin/messages", icon: Mail },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow bg-gray-900 text-white">
        <div className="flex items-center justify-center h-16 bg-gray-800">
          <h1 className="text-xl font-bold">Swift Jet Admin</h1>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="px-2 py-4 border-t border-gray-800">
          <Link
            href="/api/auth/signout"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
}
