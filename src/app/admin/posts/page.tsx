// src/app/admin/posts/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getPosts } from "@/lib/blog-data"; // Using mock data
import { format } from 'date-fns';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Posts | AI Nexus Admin',
  description: 'View, create, edit, and delete blog posts for AI Nexus.',
};

// This component would be a client component in a real app to handle delete confirmation.
// For simplicity with server components and mock data, direct navigation for actions is used.
// Or, use server actions for delete.

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Manage Posts</h1>
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/admin/posts/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Post
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
          <CardDescription>A list of all blog posts. You can edit or delete them here.</CardDescription>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No posts found. <Link href="/admin/posts/new" className="text-primary hover:underline">Create one now</Link>!</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead className="hidden md:table-cell">Tags</TableHead>
                  <TableHead className="hidden md:table-cell">Created At</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="hidden sm:table-cell">
                      {post.imageUrl ? (
                        <img
                          alt={post.title}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={post.imageUrl}
                          width="64"
                          data-ai-hint="thumbnail post"
                        />
                      ) : (
                        <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">No Image</div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link href={`/blog/${post.slug}`} target="_blank" className="hover:underline" title="View Post">
                        {post.title}
                      </Link>
                    </TableCell>
                    <TableCell>{post.author.name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {post.tags && post.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0,2).map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                          {post.tags.length > 2 && <Badge variant="outline">...</Badge>}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">No tags</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(new Date(post.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/posts/${post.id}/edit`} className="flex items-center">
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive focus:bg-destructive/10 flex items-center"
                            onClick={() => alert(`Placeholder: Delete post "${post.title}"? This would be a server action or client-side call to an API.`)}
                            // In a real app, this would trigger a delete action, possibly with confirmation
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
}

// Revalidate this page to show fresh data
export const revalidate = 0; // Or a short interval like 60 seconds
