// src/app/(app)/blog/[slug]/page.tsx
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PostContent } from "@/components/blog/post-content";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from 'next';
import type { Post, User } from "@/lib/types"; 

interface BlogProps {
  params: { slug: string };
}

async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    console.error(`[BlogSlugPage: ${slug}] Supabase client not available.`);
    return null;
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
      published,
      user_id ( id, name, email, avatar_url ) 
    `) 
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') { // PGRST116: "Query result returned no rows" - expected for not found
      console.log(`[BlogSlugPage: ${slug}] Post not found or not published (PGRST116).`);
    } else {
      console.error(`[BlogSlugPage: ${slug}] Error fetching post by slug. DB Error: ${error.message}`, "Details:", error);
    }
    return null;
  }
  
  if (!data) {
    console.warn(`[BlogSlugPage: ${slug}] No data returned for post, but no explicit error. This might indicate RLS issues preventing access.`);
    return null;
  }
  
  const p = data as any; 
  const authorData = p.user_id; // This should be an object if the join worked, or null/string(uuid)

  if (authorData && typeof authorData !== 'object' && typeof authorData !== 'string') {
      console.warn(`[BlogSlugPage: ${slug}] Unexpected authorData type for post ID ${p.id}:`, typeof authorData, authorData);
  }

  let authorIdToUse: string;
  if (authorData && typeof authorData === 'object' && authorData.id) {
      authorIdToUse = authorData.id;
  } else if (typeof authorData === 'string') {
      // If authorData is just the UUID string (e.g., relationship didn't expand)
      authorIdToUse = authorData;
      console.warn(`[BlogSlugPage: ${slug}] Author data for post ID ${p.id} was a string (UUID), not an expanded object. Fallback for author details will be used. This might indicate RLS issues on the 'users' or 'profiles' table for anonymous users.`);
  } else {
      authorIdToUse = 'unknown_user_id';
  }

  const authorName = (authorData && typeof authorData === 'object' ? authorData.name : null) || 
                     (authorData && typeof authorData === 'object' ? authorData.email : null) || 
                     "Anonymous";
  const authorEmail = (authorData && typeof authorData === 'object' ? authorData.email : null);
  const authorAvatar = (authorData && typeof authorData === 'object' ? authorData.avatar_url : null);

  const post: Post = {
    id: p.id,
    title: p.title || "Untitled Post",
    slug: p.slug || p.id,
    summary: p.summary || p.content?.substring(0, 150) || "",
    content: p.content || "",
    cover_image: p.cover_image,
    published: p.published,
    createdAt: p.created_at,
    updatedAt: p.updated_at,
    author: {
      id: authorIdToUse,
      name: authorName,
      email: authorEmail,
      avatarUrl: authorAvatar,
    } as User,
  };

  return post;
}

export async function generateMetadata(
  { params }: BlogProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPublishedPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found | AI Nexus",
      description: "The blog post you are looking for could not be found.",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];
  const pageTitle = post.title || "Blog Post";
  const pageDescription = post.summary || "Read this exciting blog post from AI Nexus.";
  const imageUrl = post.cover_image; 

  return {
    title: `${pageTitle} | AI Nexus Blog`, // Added site name for consistency
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `/blog/${post.slug}`, // Added canonical URL
      type: 'article',
      publishedTime: post.createdAt || undefined,
      modifiedTime: post.updatedAt || undefined, // Added modified time
      authors: post.author?.name && post.author.name !== "Anonymous" ? [post.author.name] : undefined,
      images: imageUrl ? [{ url: imageUrl, alt: pageTitle }, ...previousImages] : previousImages,
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title: pageTitle,
      description: pageDescription,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    console.error("[BlogSlugPage generateStaticParams] Supabase client not available.");
    return [];
  }

  const { data: postsData, error } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("published", true); // Ensure only published posts are pre-rendered

  if (error) {
    console.error("[BlogSlugPage generateStaticParams] Error fetching slugs:", error.message);
    return [];
  }

  if (!postsData || postsData.length === 0) {
    console.warn("[BlogSlugPage generateStaticParams] No published post slugs found for static generation.");
    return [];
  }

  return postsData.map((post) => ({
    slug: post.slug as string,
  })).filter(p => p.slug); // Ensure slug is not null/empty
}

export default async function BlogPostPage({ params }: BlogProps) {
  const post = await getPublishedPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <PostContent post={post} /> 
      </div>
    </div>
  );
}

// Revalidate this page ISR (Incremental Static Regeneration)
// Revalidate at most every hour, or on-demand if revalidation is triggered
export const revalidate = 3600;
