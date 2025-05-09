// src/components/layout/header.tsx
"use client";

import Link from "next/link";
import { Menu, Brain, LogOut, UserCircle, ShieldCheck } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
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
      // Optionally, redirect on sign-in/sign-out from here if needed
      // if (event === "SIGNED_IN") router.push("/admin");
      // if (event === "SIGNED_OUT") router.push("/");
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      authListener?.subscription.unsubscribe();
    };
  }, [supabase, router]);

  const isActive = (item: NavItem) => {
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
    router.push("/"); // Redirect to homepage after logout
    router.refresh(); // Ensures server components re-evaluate auth state if any
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

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive(item) ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          {user && (
            <Link 
              href="/admin" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
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
          {/* Keep Get Started button or adjust based on auth state if needed */}
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
              <nav className="grid gap-4 text-lg font-medium mt-8">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold mb-4"
                  >
                    <Brain className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                      {SITE_NAME}
                    </span>
                  </Link>
                </SheetClose>
                {NAV_LINKS.map((item) => (
                  <SheetClose asChild key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-primary",
                        isActive(item) ? "bg-muted text-primary" : "text-muted-foreground"
                      )}
                    >
                      {item.icon && <item.icon className="h-5 w-5" />} 
                      {item.label}
                    </Link>
                  </SheetClose>
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
