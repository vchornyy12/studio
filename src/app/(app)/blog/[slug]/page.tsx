// src/app/(app)/blog/[slug]/page.tsx
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PostContent } from "@/components/blog/post-content";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from 'next';
import type { Post, User } from "@/lib/types"; // Use Post type from lib/types

interface BlogProps {
  params: { slug: string };
}

async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  const supabase = createSupabaseServerClient();
  if (!supabase) return null;

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

  if (error || !data) {
    if (error && error.code !== 'PGRST116') { 
        console.error(`[BlogSlugPage] Error fetching post by slug (${slug}):`, error);
    }
    return null;
  }
  
  const p = data as any; // p for raw post data
  const authorData = p.user_id as any;

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
      id: authorData?.id || 'unknown_user_id',
      name: authorData?.name || authorData?.email || "Anonymous",
      email: authorData?.email,
      avatarUrl: authorData?.avatar_url,
    },
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
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: 'article',
      publishedTime: post.createdAt || undefined,
      authors: post.author?.name ? [post.author.name] : undefined,
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
  if (!supabase) return [];

  const { data: postsData, error } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("published", true);

  if (error || !postsData) {
    console.error("[BlogSlugPage] Error fetching slugs for static generation:", error);
    return [];
  }
  return postsData.map((post) => ({
    slug: post.slug as string,
  })).filter(p => p.slug);
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

export const revalidate = 3600;
