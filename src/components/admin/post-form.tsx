// src/components/admin/post-form.tsx
"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import type { Post, User } from "@/lib/types";
import { createPost, updatePost, getAuthors } from "@/lib/blog-data"; // Using mock data
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const postFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(150, "Title cannot exceed 150 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").max(150, "Slug cannot exceed 150 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase alphanumeric with hyphens"),
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters").max(300, "Excerpt cannot exceed 300 characters"),
  content: z.string().min(100, "Content must be at least 100 characters"),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  tags: z.string().optional().describe("Comma-separated tags"),
  authorId: z.string().min(1, "Author is required"),
  seoTitle: z.string().max(70, "SEO Title should not exceed 70 characters").optional(),
  seoDescription: z.string().max(160, "SEO Description should not exceed 160 characters").optional(),
});

type PostFormValues = z.infer<typeof postFormSchema>;

interface PostFormProps {
  post?: Post; // For editing existing post
  authors: User[];
}

export function PostForm({ post, authors }: PostFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      excerpt: post?.excerpt || "",
      content: post?.content || "",
      imageUrl: post?.imageUrl || "",
      tags: post?.tags?.join(", ") || "",
      authorId: post?.author.id || (authors.length > 0 ? authors[0].id : ""),
      seoTitle: post?.seoTitle || "",
      seoDescription: post?.seoDescription || "",
    },
  });

  const onSubmit: SubmitHandler<PostFormValues> = (data) => {
    startTransition(async () => {
      try {
        const postDataPayload = {
          ...data,
          tags: data.tags ? data.tags.split(",").map(tag => tag.trim()).filter(tag => tag) : [],
        };

        if (post) { // Editing existing post
          const updatedPost = await updatePost(post.id, postDataPayload);
          if (updatedPost) {
            toast({ title: "Post Updated", description: `"${updatedPost.title}" has been successfully updated.` });
            router.push(`/admin/posts`); // Or to the post view page
            router.refresh();
          } else {
            toast({ title: "Error", description: "Failed to update post.", variant: "destructive" });
          }
        } else { // Creating new post
          const newPost = await createPost(postDataPayload);
          toast({ title: "Post Created", description: `"${newPost.title}" has been successfully created.` });
          router.push(`/admin/posts`);
          router.refresh();
        }
      } catch (error) {
        console.error("Failed to save post:", error);
        toast({ title: "Error", description: "An unexpected error occurred while saving the post.", variant: "destructive" });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>{post ? "Edit Post" : "Create New Post"}</CardTitle>
            <CardDescription>
              {post ? "Modify the details of your blog post." : "Fill in the details for your new blog post."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl><Input placeholder="Enter post title" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl><Input placeholder="e.g., my-awesome-post" {...field} /></FormControl>
                  <FormDescription>URL-friendly version of the title (lowercase, hyphens for spaces).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="authorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an author" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {authors.map(author => (
                        <SelectItem key={author.id} value={author.id}>
                          {author.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl><Textarea placeholder="Short summary of the post" rows={3} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content (Markdown/HTML)</FormLabel>
                  <FormControl><Textarea placeholder="Full content of the post. Use Markdown or HTML." rows={15} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL (Optional)</FormLabel>
                  <FormControl><Input type="url" placeholder="https://example.com/image.jpg" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (Comma-separated)</FormLabel>
                  <FormControl><Input placeholder="e.g., AI, Technology, Guide" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardTitle className="text-lg pt-4 border-t">SEO Settings (Optional)</CardTitle>
             <FormField
              control={form.control}
              name="seoTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Title</FormLabel>
                  <FormControl><Input placeholder="Custom title for search engines" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="seoDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Meta Description</FormLabel>
                  <FormControl><Textarea placeholder="Custom description for search engines" rows={2} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {post ? "Save Changes" : "Publish Post"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} className="ml-2">
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
