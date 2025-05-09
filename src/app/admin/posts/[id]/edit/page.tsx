// src/app/admin/posts/[id]/edit/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Loader2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PostForm, type PostFormValues } from "@/components/admin/post-form";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const supabase = createSupabaseBrowserClient();
  const { toast } = useToast();

  const [initialData, setInitialData] = useState<Partial<PostFormValues> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [originalPostTitle, setOriginalPostTitle] = useState<string>("");

  const fetchPost = useCallback(async () => {
    if (!postId || !supabase) {
      setIsFetchingData(false);
      setNotFound(true);
      return;
    }
    setIsFetchingData(true);
    setServerError(null);

    const { data, error } = await supabase
      .from("blog_posts")
      .select("title, slug, content, summary, cover_image, published")
      .eq("id", postId)
      .single();

    if (error || !data) {
      console.error("Error fetching post for edit:", error);
      setServerError("Failed to fetch post data. It might not exist or you may not have permission.");
      if (error?.code === 'PGRST116') setNotFound(true);
    } else {
      const fetchedPost: Partial<PostFormValues> = {
        title: data.title || "",
        slug: data.slug || "",
        content: data.content || "",
        summary: data.summary || "",
        cover_image: data.cover_image || "",
        published: data.published || false,
      };
      setInitialData(fetchedPost);
      setOriginalPostTitle(data.title || "Post");
      setNotFound(false);
    }
    setIsFetchingData(false);
  }, [postId, supabase]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleUpdatePost = async (values: PostFormValues) => {
    setIsLoading(true);
    setServerError(null);

    if (!supabase) {
      setServerError("Supabase client not initialized.");
      setIsLoading(false);
      return;
    }

    const postDataToUpdate = {
      title: values.title,
      slug: values.slug,
      content: values.content,
      summary: values.summary,
      cover_image: values.cover_image || null,
      published: values.published,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("blog_posts")
      .update(postDataToUpdate)
      .eq("id", postId);

    if (error) {
      console.error("Error updating post:", error);
      setServerError(`Failed to update post: ${error.message}`);
      toast({
        title: "Error Updating Post",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Post Updated!",
        description: `"${values.title}" has been successfully updated.`,
        className: "bg-green-100 dark:bg-green-700/30 text-green-700 dark:text-green-300 border-green-500",
      });
      router.push("/admin/posts");
      router.refresh(); // Revalidate data
    }
    setIsLoading(false);
  };

  if (isFetchingData) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-3 text-muted-foreground">Loading post data...</p>
      </div>
    );
  }

  if (notFound || !initialData) {
    return (
      <div className="max-w-xl mx-auto text-center py-10">
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Post Not Found</h1>
        <p className="text-muted-foreground mb-6">
          {serverError || "The post you are trying to edit could not be found or you do not have permission to access it."}
        </p>
        <Button asChild variant="outline">
          <Link href="/admin/posts">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Posts
          </Link>
        </Button>
      </div>
    );
  }

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
          Edit Post: {originalPostTitle}
        </h1>
      </div>

      {serverError && !notFound && (
        <div className="mb-4 p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-md flex items-start">
            <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0" />
            <div>
                <h5 className="font-semibold">Error</h5>
                <p className="text-sm">{serverError}</p>
            </div>
        </div>
      )}

      <PostForm 
        onSubmit={handleUpdatePost} 
        initialData={initialData} 
        isLoading={isLoading}
        // Submit button text is now handled internally by PostForm based on 'published' state
      />
    </div>
  );
}
