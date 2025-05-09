// src/components/ui/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import {
  LogOut,
  Brain, // Site logo icon
  Home,
  FileText,
  Settings,
  PlusCircle,
  Globe, // Added Globe icon
  type LucideIcon,
} from "lucide-react";

// Define a mapping from icon names (strings) to actual Lucide components
const iconMap: Record<string, LucideIcon> = {
  Home,
  FileText,
  Settings,
  PlusCircle,
  Globe, // Added Globe to map
  // Add any other icons you might use here
};

export interface AdminNavItem {
  href: string;
  label: string;
  iconName?: string;
}

interface SidebarProps {
  navItems: AdminNavItem[];
  userEmail?: string | null;
  siteName: string;
}

export function Sidebar({ navItems, userEmail, siteName }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <aside className="w-64 flex-shrink-0 border-r border-border bg-card p-4 md:p-6 flex flex-col shadow-lg">
      <div className="mb-8">
        <Link href="/admin" className="flex items-center gap-2 mb-2">
          <Brain className="h-8 w-8 text-primary" />
          <span className="text-xl font-semibold text-foreground">{siteName}</span>
        </Link>
        <p className="text-xs text-muted-foreground">Admin Panel</p>
      </div>

      <nav className="flex-grow space-y-2">
        {navItems.map((item) => {
          // For the homepage link, isActive should only be true if the path is exactly "/"
          // For other admin links, the existing logic (startsWith) is fine.
          const isActive = item.href === "/" ? pathname === "/" : (pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href)));
          const IconComponent = item.iconName ? iconMap[item.iconName] : null;
          return (
            <Link
              key={item.label}
              href={item.href}
              // Add target="_blank" if you want the homepage to open in a new tab from admin
              // target={item.href === "/" ? "_blank" : undefined}
              // rel={item.href === "/" ? "noopener noreferrer" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-primary",
                isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
              )}
            >
              {IconComponent && (
                <IconComponent
                  className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")}
                />
              )}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        {userEmail && (
          <div className="mb-4 p-3 rounded-md bg-muted/50">
            <p className="text-sm font-medium text-foreground truncate">{userEmail}</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        )}
        <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </aside>
  );
}
