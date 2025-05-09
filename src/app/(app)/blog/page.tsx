// src/app/(app)/blog/page.tsx
import { PostCard } from "@/components/blog/post-card";
import { getPosts } from "@/lib/blog-data"; // Using mock data
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | AI Nexus',
  description: 'Explore insights, trends, and expert opinions on AI integration, machine learning, and technology from the AI Nexus team. Stay informed with our latest articles.',
  keywords: 'AI blog, AI Nexus blog, artificial intelligence articles, machine learning insights, AI trends, technology blog',
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="py-12 md:py-20 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            AI Nexus Blog
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and discussions on the transformative power of AI. Explore the latest trends and expert opinions from the AI Nexus team.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground text-lg">No blog posts yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
        
        {/* Placeholder for pagination if needed in the future
        <div className="mt-16 flex justify-center">
          <Button variant="outline">Load More Posts</Button>
        </div> 
        */}
      </div>
    </div>
  );
}

// Revalidate data at most every hour
export const revalidate = 3600;
