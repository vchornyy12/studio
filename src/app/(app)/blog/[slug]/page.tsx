// src/app/(app)/blog/[slug]/page.tsx
import { getPostBySlug, getPosts } from "@/lib/blog-data"; // Using mock data
import { PostContent } from "@/components/blog/post-content";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found | AI Nexus",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: 'article',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: post.imageUrl ? [{ url: post.imageUrl, alt: post.title }, ...previousImages] : previousImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.imageUrl ? [post.imageUrl] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <PostContent post={post} />
      </div>
    </div>
  );
}

// Revalidate data at most every hour
export const revalidate = 3600;
