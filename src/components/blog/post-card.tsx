// src/components/blog/post-card.tsx
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { format } from 'date-fns';

type PostCardProps = {
  post: { id: string } & Partial<Post>;
};

export function PostCard({ post }: PostCardProps) {
  const { id, slug, title, cover_image, summary, createdAt } = post;

  // Fallback for slug if not present, using post id
  const postLink = `/blog/${slug || id}`;

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full">
      {cover_image && (
        <Link href={postLink} className="block aspect-video relative overflow-hidden">
          <Image
            src={cover_image}
            alt={title || "Blog post cover image"}
            fill
            style={{ objectFit: "cover" }} // Changed from layout="fill" objectFit="cover"
            className="transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Example sizes, adjust as needed
            data-ai-hint="article topic"
          />
        </Link>
      )}
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">
          <Link href={postLink} className="hover:text-primary transition-colors">
            {title || "Untitled Post"}
          </Link> {/* Properly closed Link */}
        </CardTitle>
        {/* Tags functionality removed based on new schema */}
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-base line-clamp-3">
          {summary || "No summary available."}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t">
        <div className="flex-grow">
          {createdAt && (
            <p className="text-xs text-muted-foreground">
              {format(new Date(createdAt), "MMMM d, yyyy")}
            </p>
          )}
        </div>
        <Link href={postLink} className="text-sm font-medium text-primary hover:underline flex items-center group">
          Read More <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}
