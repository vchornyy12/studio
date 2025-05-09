// src/components/blog/post-content.tsx
import type { Post } from "@/lib/types"; // Use Post type from lib/types
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge"; // Tags removed
import { format } from 'date-fns';
import { CalendarDays } from "lucide-react"; // UserCircle not used currently

type PostContentProps = {
  post: Post;
};

// Basic HTML renderer, can be replaced with a markdown parser like react-markdown
function renderHtmlContent(htmlString: string) {
  return <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-md prose-img:shadow-md" dangerouslySetInnerHTML={{ __html: htmlString }} />;
}


export function PostContent({ post }: PostContentProps) {
  return (
    <article className="py-8 md:py-12">
      {post.cover_image && (
        <div className="relative aspect-[16/7] w-full mb-8 rounded-lg overflow-hidden shadow-xl">
          <Image
            src={post.cover_image}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            priority
            data-ai-hint="article main image"
          />
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-4">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint="author photo"/>
              <AvatarFallback>{post.author.name?.substring(0,1).toUpperCase() || "A"}</AvatarFallback>
            </Avatar>
            <span>{post.author.name || "Anonymous"}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <time dateTime={post.createdAt}>
              {format(new Date(post.createdAt), "MMMM d, yyyy")}
            </time>
          </div>
          {/* Placeholder for reading time
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>5 min read</span>
          </div>
          */}
        </div>
        {/* Tags functionality removed based on new schema */}
        {/* {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs font-medium">{tag}</Badge>
            ))}
          </div>
        )} */}
      </header>
      
      {/* Render post content */}
      {renderHtmlContent(post.content)}

      <footer className="mt-12 border-t pt-8">
        <div className="flex items-center">
          <Avatar className="h-12 w-12 mr-4">
             <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint="author headshot"/>
            <AvatarFallback>{post.author.name?.substring(0, 2).toUpperCase() || "A"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">Written by</p>
            <p className="text-lg font-semibold text-foreground">{post.author.name || "Anonymous"}</p>
            {/* Placeholder for author bio
            <p className="text-sm text-muted-foreground mt-1">
              Dr. Ava Jensen is a lead AI researcher at AI Nexus, specializing in NLP and machine learning applications.
            </p>
            */}
          </div>
        </div>
        {/* Placeholder for social share buttons or related posts */}
      </footer>
    </article>
  );
}
