// src/components/blog/post-card.tsx
import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/types"; // Use Post type from lib/types
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge"; // Tags removed
import { ArrowRight } from "lucide-react";
import { format } from 'date-fns';

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full">
      {post.cover_image && (
        <Link href={`/blog/${post.slug}`} className="block aspect-video relative overflow-hidden">
          <Image
            src={post.cover_image}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 hover:scale-105"
            data-ai-hint="article topic"
          />
        </Link>
      )}
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </CardTitle>
        {/* Tags functionality removed based on new schema */}
        {/* {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )} */}
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-base line-clamp-3">{post.summary}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint="author portrait"/>
            <AvatarFallback>{post.author.name?.substring(0, 2).toUpperCase() || "A"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-foreground">{post.author.name || "Anonymous"}</p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(post.createdAt), "MMMM d, yyyy")}
            </p>
          </div>
        </div>
        <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-primary hover:underline flex items-center group">
          Read More <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}
