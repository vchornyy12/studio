// src/app/admin/layout.tsx
"use client"; 

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Home, Package, Settings, Users, BarChart3, FileText, Brain, LogOut, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ADMIN_NAV_LINKS, SITE_NAME, NavItem } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// This is a simplified Admin layout.
// In a real app, this layout would be protected by authentication.

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (item.matchPaths) {
      return item.matchPaths.some(path => {
        const dynamicPathRegex = new RegExp(`^${path.replace(/\[.*?\]/g, "[^/]+")}$`);
        return dynamicPathRegex.test(pathname);
      });
    }
    return pathname === item.href;
  };


  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/admin" className="flex items-center gap-2 font-semibold">
              <Brain className="h-6 w-6 text-primary" />
              <span className="">{SITE_NAME} Admin</span>
            </Link>
            {/* Optional: Notification Bell
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button> */}
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {ADMIN_NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive(item) && "bg-muted text-primary"
                  )}
                >
                  {item.label === "Dashboard" && <Home className="h-4 w-4" />}
                  {item.label === "Posts" && <FileText className="h-4 w-4" />}
                  {/* Add more icons as needed */}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4 border-t">
            <Button size="sm" variant="ghost" className="w-full justify-start">
              <LogOut className="mr-2 h-4 w-4" /> Logout (placeholder)
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/admin"
                  className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                  <Brain className="h-6 w-6 text-primary" />
                  <span className="">{SITE_NAME} Admin</span>
                </Link>
                {ADMIN_NAV_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      isActive(item) && "bg-muted text-primary"
                    )}
                  >
                    {item.label === "Dashboard" && <Home className="h-5 w-5" />}
                    {item.label === "Posts" && <FileText className="h-5 w-5" />}
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto border-t pt-4">
                 <Button size="sm" variant="ghost" className="w-full justify-start">
                    <LogOut className="mr-2 h-4 w-4" /> Logout (placeholder)
                 </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Optional: Admin Search
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form> */}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://picsum.photos/100/100?random=admin" alt="Admin" data-ai-hint="person avatar"/>
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings (placeholder)</DropdownMenuItem>
              <DropdownMenuItem>Support (placeholder)</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout (placeholder)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
