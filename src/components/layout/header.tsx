// src/components/layout/header.tsx
"use client";

import Link from "next/link";
import {
  Menu, 
  Brain, 
  LogOut, 
  UserCircle, 
  ShieldCheck,
  ChevronDown,
  FileText // Example icon for SEO Tool
} from "lucide-react";
import { HEADER_NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/constants";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const getSession = async () => {
      if (!supabase) return;
      setLoadingUser(true);
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoadingUser(false);
    };

    getSession();

    const { data: authListener } = supabase?.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoadingUser(false);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      authListener?.subscription.unsubscribe();
    };
  }, [supabase, router]);

  const isActive = (item: NavItem): boolean => {
    if (item.dropdown) {
      return item.dropdown.some(child => isActive(child));
    }
    if (item.matchPaths) {
      return item.matchPaths.some(path => {
        if (path.includes("[slug]")) {
          const basePath = path.split("/[slug]")[0];
          return pathname.startsWith(basePath);
        }
        return pathname === path;
      });
    }
    return pathname === item.href;
  };

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    router.push("/"); 
    router.refresh();
  };

  // Assign icons to NavItems if not already present (for mobile menu)
  // This is a bit of a hack, ideally icons are part of the NavItem definition in constants.tsx
  const getIconForItem = (label: string) => {
    if (label === "SEO Tool") return FileText;
    // Add other icons here if needed
    return undefined;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300",
        isScrolled || user ? "bg-background/80 backdrop-blur-md border-border shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Brain className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {SITE_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {HEADER_NAV_LINKS.map((item) => (
            item.dropdown ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary px-3 py-2 flex items-center gap-1",
                      isActive(item) ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {item.dropdown.map((child) => (
                    <DropdownMenuItem key={child.label} asChild>
                      <Link 
                        href={child.href!}
                        className={cn(
                          "w-full",
                          isActive(child) ? "font-semibold text-primary" : ""
                        )}
                      >
                        {child.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary px-3 py-2",
                  isActive(item) ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            )
          ))}
          {user && (
            <Link 
              href="/admin" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary px-3 py-2",
                pathname.startsWith("/admin") ? "text-primary" : "text-muted-foreground"
              )}
            >
              Admin Panel
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {!loadingUser && (
            <>
              {user ? (
                <Button onClick={handleLogout} variant="ghost" size="sm" className="hidden md:inline-flex">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              ) : (
                <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
                  <Link href="/login"><UserCircle className="mr-2 h-4 w-4" />Login</Link>
                </Button>
              )}
            </>
          )}
          <Button asChild size="sm" className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/#contact">Get Started</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-2 text-base font-medium mt-8">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold mb-4 px-3 py-2"
                  >
                    <Brain className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                      {SITE_NAME}
                    </span>
                  </Link>
                </SheetClose>
                {HEADER_NAV_LINKS.map((item) => (
                  item.dropdown ? (
                    <div key={item.label} className="px-3 py-2">
                      <span 
                        className={cn(
                          "font-medium", 
                          isActive(item) ? "text-primary" : "text-muted-foreground"
                          )}
                      >
                        {item.label}
                      </span>
                      <div className="grid gap-1 mt-1 pl-4">
                        {item.dropdown.map((child) => {
                          const ChildIcon = child.icon || getIconForItem(child.label);
                          return (
                            <SheetClose asChild key={child.label}>
                              <Link
                                href={child.href!}
                                className={cn(
                                  "flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-muted hover:text-primary",
                                  isActive(child) ? "bg-muted text-primary font-semibold" : "text-muted-foreground"
                                )}
                              >
                                {ChildIcon && <ChildIcon className="h-4 w-4" />}
                                {child.label}
                              </Link>
                            </SheetClose>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <SheetClose asChild key={item.label}>
                      <Link
                        href={item.href!}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-primary",
                          isActive(item) ? "bg-muted text-primary" : "text-muted-foreground"
                        )}
                      >
                        {/* {item.icon && <item.icon className="h-5 w-5" />} */}
                        {item.label}
                      </Link>
                    </SheetClose>
                  )
                ))}
                {!loadingUser && (
                  <>
                    {user ? (
                      <>
                        <SheetClose asChild>
                          <Link 
                            href="/admin" 
                            className={cn(
                              "flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-primary",
                              pathname.startsWith("/admin") ? "bg-muted text-primary" : "text-muted-foreground"
                            )}
                          >
                            <ShieldCheck className="h-5 w-5" /> Admin Panel
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button onClick={handleLogout} variant="ghost" className="w-full justify-start px-3 py-2 mt-2">
                            <LogOut className="mr-2 h-5 w-5" /> Logout
                          </Button>
                        </SheetClose>
                      </>
                    ) : (
                      <SheetClose asChild>
                        <Link 
                          href="/login" 
                          className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-primary mt-4",
                            pathname === "/login" ? "bg-muted text-primary" : "text-muted-foreground"
                          )}
                        >
                          <UserCircle className="mr-2 h-5 w-5" /> Login
                        </Link>
                      </SheetClose>
                    )}
                  </>
                )}
                <SheetClose asChild>
                  <Button asChild className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/#contact">Get Started</Link>
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
