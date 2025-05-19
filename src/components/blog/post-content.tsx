// src/components/blog/post-content.tsx
import * as React from "react";
import type { BlogPost } from "@/lib/types";
import Image from "next/image";
import { format } from 'date-fns';
import { CalendarDays } from "lucide-react";

type PostContentProps = {
  post: BlogPost;
};

// Basic HTML renderer, can be replaced with a markdown parser like react-markdown
function renderHtmlContent(htmlString: string) {
  return <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-md prose-img:shadow-md" dangerouslySetInnerHTML={{ __html: htmlString }} />;
}

export function PostContent({ post }: PostContentProps) {
  return (
    <article className="py-8 md:py-12">
      {post.imageUrl && (
        <div className="relative aspect-[16/7] w-full mb-8 rounded-lg overflow-hidden shadow-xl">
          <Image
            src={post.imageUrl}
            alt={post.title || "Blog post cover image"}
            fill
            style={{ objectFit: "cover" }} // Updated from layout="fill" objectFit="cover"
            priority // Keep priority for LCP element
            sizes="(max-width: 768px) 100vw, 800px" // Example sizes, adjust as needed for your layout (max-w-3xl container)
            data-ai-hint="article main image"
          />
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-4">
          {post.title || "Untitled Post"}
        </h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {/* Author display removed */}
          {post.author && (
          <div>{post.author}</div>
          )}
          {post.date && (
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <time dateTime={post.date.toString()}>
                {format(new Date(post.date), "MMMM d, yyyy")}
              </time>
            </div>
          )}
          {/* Placeholder for reading time */}
        </div>
        {/* Tags functionality removed */}
      </header>
      
      {/* Render post content */}
      {post.content && renderHtmlContent(post.content)}

      {/* Footer with author bio removed */}
    </article>
  );
}
