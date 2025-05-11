// src/app/(app)/blog/[slug]/page.tsx
import * as React from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server"; 
import { createClient } from '@supabase/supabase-js'; 
import { PostContent } from "@/components/blog/post-content";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import type { Post } from "@/lib/types";
import { SITE_NAME } from "@/lib/constants"; // Import SITE_NAME

interface BlogProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[BlogSlugPage:generateStaticParams] Supabase URL or Anon Key not configured. Skipping static param generation.");
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("id, slug, published") 
    .eq("published", true);

  if (error) {
    console.error("[BlogSlugPage:generateStaticParams] Error fetching posts for static generation:", error.message);
    return [];
  }

  if (!posts) {
    return [];
  }

  return posts.map((post) => ({
    slug: post.slug || post.id, 
  })).filter(p => p.slug); 
}

async function getPublishedPostBySlug(identifier: string): Promise<Post | null> {
  const supabase = createSupabaseServerClient(); 
  if (!supabase) {
    console.error(`[BlogSlugPage: ${identifier}] Supabase client (server) not available.`);
    return null;
  }

  const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(identifier);

  let query = supabase
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
    .eq('published', true);

  if (isUUID) {
    query = query.eq('id', identifier);
  } else {
    query = query.eq('slug', identifier);
  }
  
  const { data, error } = await query.single();

  if (error) {
    console.error(`[BlogSlugPage: ${identifier}] Error fetching post:`, error.message);
    return null;
  }

  if (!data) {
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    slug: data.slug,
    summary: data.summary,
    content: data.content,
    cover_image: data.cover_image,
    published: data.published,
  };
}

export async function generateMetadata({ params }: BlogProps): Promise<Metadata> {
  const post = await getPublishedPostBySlug(params.slug);

  if (!post) {
    return {
      title: `Post Not Found | ${SITE_NAME}`,
      description: "The blog post you are looking for could not be found.",
    };
  }

  return {
    title: `${post.title || 'Blog Post'} | ${SITE_NAME}`,
    description: post.summary || "Read this blog post.",
    openGraph: {
        title: post.title || 'Blog Post',
        description: post.summary || undefined,
        type: 'article',
        publishedTime: post.createdAt ? new Date(post.createdAt).toISOString() : undefined,
        modifiedTime: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
        images: post.cover_image ? [{ url: post.cover_image }] : [],
    },
    twitter: {
        card: 'summary_large_image',
        title: post.title || 'Blog Post',
        description: post.summary || undefined,
        images: post.cover_image ? [post.cover_image] : [],
    },
  };
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
