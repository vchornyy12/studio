// src/app/admin/posts/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { PlusCircle, Edit3, Trash2, FileWarning, Eye, EyeOff } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { deletePostAction } from "./actions";
import type { Post } from "@/lib/types"; // Use Post type from lib/types
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const metadata = {
  title: "Manage Posts | Admin - AI Nexus",
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return dateString; // Return original string if date parsing fails
  }
};

// Remove local Post interface, will use imported one.

export default async function AdminPostsPage() {
  const supabase = createSupabaseServerClient();
  let posts: Post[] = []; // Use the imported Post type
  let fetchError: string | null = null;

  if (supabase) {
    // Select new fields: published, remove status and published_at for status determination
    const { data, error } = await supabase
      .from("blog_posts") 
      .select("id, title, created_at, slug, published, cover_image, summary, content, updated_at, user_id") // Fetch all necessary fields for Post type
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[AdminPostsPage] Error fetching posts from Supabase:", error);
      fetchError = "Could not retrieve posts. Check server logs and Supabase RLS policies.";
    } else {
      // Map Supabase data to our Post type structure, especially for author
      // This mapping is more robustly done where the full Post object is needed (e.g. blog pages)
      // For the admin list, we might not need the full author object, but it's good practice to align.
      // Here, we'll cast and assume the basic fields are what we need for this table.
      posts = data.map(p => ({
        ...p,
        createdAt: p.created_at, // Map to camelCase
        updatedAt: p.updated_at,
        cover_image: p.cover_image,
        author: { id: p.user_id, name: 'Author Name Placeholder' } // Simplified author for admin list
      })) as Post[];
    }
  } else {
    console.error("[AdminPostsPage] Supabase client not available on server.");
    fetchError = "Supabase client not available. Check server configuration.";
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Manage Blog Posts
          </h1>
          <p className="text-muted-foreground mt-2">Create, edit, and manage all your blog content.</p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <PlusCircle className="mr-2 h-5 w-5" />
            New Post
          </Link>
        </Button>
      </div>

      {fetchError && (
        <Alert variant="destructive" className="my-4">
          <FileWarning className="h-4 w-4" /> 
          <AlertTitle>Error Fetching Posts</AlertTitle>
          <AlertDescription>{fetchError}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>
            A list of all blog posts. ({posts.length} post{posts.length === 1 ? '' : 's'})
          </CardDescription>
        </CardHeader>
        <CardContent>
          {posts.length === 0 && !fetchError ? (
            <p className="text-muted-foreground py-4 text-center">No posts found. Get started by creating a new one!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Title</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Date Created</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-background">
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                        <Link href={`/blog/${post.slug || post.id}`} target="_blank" rel="noopener noreferrer" className="hover:underline" title={`View "${post.title}"`}>
                          {post.title || "Untitled Post"}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{formatDate(post.createdAt)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {post.published ? (
                            <Badge variant="default" className="bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300 flex items-center gap-1">
                                <Eye className="h-3 w-3" /> Published
                            </Badge>
                        ) : (
                           <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 dark:bg-yellow-600/30 dark:text-yellow-300 flex items-center gap-1">
                                <EyeOff className="h-3 w-3" /> Draft
                           </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/admin/posts/${post.id}/edit`} title={`Edit "${post.title}"`}>
                            <Edit3 className="h-4 w-4" />
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" title={`Delete "${post.title}"`}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the post
                                "<strong>{post.title || 'Untitled Post'}</strong>".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <form action={deletePostAction} className="inline">
                                <input type="hidden" name="postId" value={post.id} />
                                <AlertDialogAction type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                                  Yes, delete post
                                </AlertDialogAction>
                              </form>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

