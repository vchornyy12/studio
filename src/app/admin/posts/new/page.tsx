// src/app/admin/posts/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PostForm, type PostFormValues } from "@/components/admin/post-form";

export default function NewPostPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleCreatePost = async (values: PostFormValues) => {
    setIsLoading(true);
    setServerError(null);

    if (!supabase) {
      setServerError("Supabase client not initialized. Check your environment variables.");
      setIsLoading(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setServerError("User not authenticated. Please log in again.");
      setIsLoading(false);
      toast({
        title: "Authentication Error",
        description: "You must be logged in to create a post.",
        variant: "destructive",
      });
      return;
    }

    const postDataToInsert = {
      title: values.title,
      slug: values.slug,
      content: values.content,
      summary: values.summary,
      cover_image: values.cover_image || null, // Ensure null if empty string
      published: values.published,
      user_id: user.id,
      // created_at and updated_at will be set by Supabase
    };

    const { error } = await supabase.from("blog_posts").insert([postDataToInsert]);

    if (error) {
      console.error("Error inserting post:", error);
      setServerError(`Failed to create post: ${error.message}`);
      toast({
        title: "Error Creating Post",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Post Created!",
        description: `"${values.title}" has been successfully created.`, 
        className: "bg-green-100 dark:bg-green-700/30 text-green-700 dark:text-green-300 border-green-500",
      });
      router.push("/admin/posts");
      router.refresh(); // Revalidate data on the posts page
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/admin/posts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Posts
          </Link>
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Create New Post
        </h1>
      </div>

      {serverError && (
        <div className="mb-4 p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-md flex items-start">
            <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0" />
            <div>
                <h5 className="font-semibold">Error Creating Post</h5>
                <p className="text-sm">{serverError}</p>
            </div>
        </div>
      )}

      <PostForm 
        onSubmit={handleCreatePost} 
        isLoading={isLoading} 
      />
    </div>
  );
}
