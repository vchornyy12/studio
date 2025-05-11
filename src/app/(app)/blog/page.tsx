// src/app/(app)/blog/page.tsx
import { PostCard } from "@/components/blog/post-card";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/types"; // User import removed
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileWarning } from "lucide-react";
import type { Metadata } from 'next';
import { SITE_NAME } from "@/lib/constants"; // Import SITE_NAME

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description: `Explore insights, trends, and expert opinions on AI integration, machine learning, and technology from the ${SITE_NAME} team. Stay informed with our latest articles.`,
  keywords: `AI blog, ${SITE_NAME} blog, artificial intelligence articles, machine learning insights, AI trends, technology blog`,
};

async function fetchPublishedPosts(): Promise<{ posts: Post[]; error: string | null }> {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    console.error("[BlogPage] Supabase client not available on server.");
    return { posts: [], error: "Supabase client not available. Check server configuration." };
  }

  const { data, error } = await supabase
    .from("blog_posts") 
    .select(`
      id, 
      title, 
      created_at, 
      updated_at,
      slug, 
      summary, 
      content, 
      cover_image, 
      published
    `) 
    .eq("published", true) 
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[BlogPage] Error fetching published posts from Supabase:", error.message, "Details:", error);
    return { posts: [], error: `Could not fetch blog posts. Database error: ${error.message}. Please try again later.` };
  }

  if (!data) {
    console.warn("[BlogPage] No data returned for published posts, but no explicit error. This might indicate RLS issues or no published posts.");
    return { posts: [], error: null };
  }
  
  // Map Supabase data to our Post type, excluding author
  const fetchedPosts = data?.map((p: any) => ({
    id: p.id,
    title: p.title || "Untitled Post",
    slug: p.slug || p.id,
    summary: p.summary || p.content?.substring(0, 150) || "",
    content: p.content || "",
    cover_image: p.cover_image,
    published: p.published,
    createdAt: p.created_at,
    updatedAt: p.updated_at,
  })) || [];
  
  return { posts: fetchedPosts, error: null };
}

export default async function BlogPage() {
  const { posts, error: fetchError } = await fetchPublishedPosts();

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <header className="text-center mb-12 md:mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {`${SITE_NAME} Blog`} {/* Changed to use SITE_NAME */}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up delay-200">
            {`Insights, tutorials, and discussions on the transformative power of AI. Explore the latest trends and expert opinions from the ${SITE_NAME} team.`} {/* Changed to use SITE_NAME */}
          </p>
        </header>

        {fetchError && (
          <Alert variant="destructive" className="max-w-2xl mx-auto my-8">
            <FileWarning className="h-4 w-4" />
            <AlertTitle>Error Fetching Posts</AlertTitle>
            <AlertDescription>{fetchError}</AlertDescription>
          </Alert>
        )}

        {!fetchError && posts.length === 0 ? (
          <p className="text-center text-muted-foreground text-lg py-10">No blog posts yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in delay-300">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const revalidate = 3600;
