// src/app/admin/posts/[id]/edit/page.tsx
import { PostForm } from "@/components/admin/post-form";
import { getPostById, getAuthors } from "@/lib/blog-data"; // Using mock data
import { notFound } from "next/navigation";
import type { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostById(params.id);
  return {
    title: post ? `Edit: ${post.title} | AI Nexus Admin` : 'Post Not Found',
  };
}


export default async function EditPostPage({ params }: Props) {
  const post = await getPostById(params.id);
  const authors = await getAuthors();

  if (!post) {
    notFound();
  }
  
  if (!authors || authors.length === 0) {
     console.warn(`No authors found for editing post ID: ${params.id}.`);
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Edit Post</h1>
      </div>
      <PostForm post={post} authors={authors || []} />
    </>
  );
}
