// src/app/admin/posts/new/page.tsx
import { PostForm } from "@/components/admin/post-form";
import { getAuthors } from "@/lib/blog-data";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create New Post | AI Nexus Admin',
  description: 'Add a new blog post to AI Nexus.',
};

export default async function NewPostPage() {
  const authors = await getAuthors();
  if (!authors || authors.length === 0) {
     // Handle case where no authors are available, perhaps redirect or show error
     // For now, PostForm will handle empty authors array gracefully for selection
     console.warn("No authors found for new post page.");
  }
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Create New Post</h1>
      </div>
      <PostForm authors={authors || []} />
    </>
  );
}
