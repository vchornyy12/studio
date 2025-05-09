// src/app/admin/layout.tsx
import { createSupabaseServerClient, getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SITE_NAME } from "@/lib/constants";
import { Sidebar, type AdminNavItem } from "@/components/ui/sidebar"; 

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseServerClient();
  const user = await getUser();

  if (!user) {
    return redirect("/login?redirectTo=/admin"); 
  }

  const adminNavItems: AdminNavItem[] = [
    { href: "/admin", label: "Dashboard", iconName: "Home" },
    { href: "/admin/posts", label: "Posts", iconName: "FileText" },
    { href: "/admin/posts/new", label: "New Post", iconName: "PlusCircle" },
    // Add more admin links as needed, e.g., settings, users
    // { href: "/admin/settings", label: "Settings", iconName: "Settings" },
    { href: "/", label: "Go to Homepage", iconName: "Globe" }, // Added homepage link
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar navItems={adminNavItems} userEmail={user.email} siteName={SITE_NAME} />
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
