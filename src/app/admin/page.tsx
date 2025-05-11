// src/app/admin/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, PlusCircle } from "lucide-react";
import { SITE_NAME } from "@/lib/constants"; // Import SITE_NAME

export const metadata = {
  title: `Admin Dashboard | ${SITE_NAME}`,
};

export default async function AdminDashboardPage() {
  const user = await getUser(); 

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Welcome, {user?.email || "Admin"}! Manage your site content and settings here.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle className="text-xl bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">Blog Posts</CardTitle>
                <FileText className="h-6 w-6 text-primary" />
            </div>
            <CardDescription>Manage all your blog articles.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">View, edit, and create new posts.</p>
            <div className="flex gap-2">
                <Button asChild>
                    <Link href="/admin/posts">View Posts</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/admin/posts/new"><PlusCircle className="mr-2 h-4 w-4"/> New Post</Link>
                </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
