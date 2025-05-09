"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { useEffect } from "react";

// Function to generate a slug (can be moved to utils if used elsewhere)
const generateSlug = (title: string): string => {
  if (!title) return "";
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-") // Replace spaces and non-word chars with a single dash
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
};

export const PostFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long." }).max(200),
  slug: z.string().min(3, { message: "Slug must be at least 3 characters long." }).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Slug must be a valid URL slug (e.g., 'my-post-title')."}),
  content: z.string().min(10, { message: "Content is too short." }),
  summary: z.string().min(10, { message: "Summary must be at least 10 characters."}).max(300, { message: "Summary cannot exceed 300 characters."}),
  cover_image: z.string().url({ message: "Cover image must be a valid URL."}).optional().or(z.literal("")),
  published: z.boolean().default(false),
});

export type PostFormValues = z.infer<typeof PostFormSchema>;

interface PostFormProps {
  onSubmit: (values: PostFormValues) => Promise<void>;
  initialData?: Partial<PostFormValues>; // For editing
  isLoading?: boolean;
  submitButtonText?: string; // This prop might be overridden by internal logic now
}

export function PostForm({
  onSubmit,
  initialData,
  isLoading = false,
  // submitButtonText is determined by 'published' state now
}: PostFormProps) {

  const form = useForm<PostFormValues>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      content: "",
      summary: "",
      cover_image: "",
      published: false,
    },
    mode: "onChange", // Validate on change for better UX
  });

  const watchedTitle = form.watch("title");
  const isPublished = form.watch("published");

  useEffect(() => {
    if (watchedTitle && !form.getValues("slug") && !initialData?.slug) { 
      form.setValue("slug", generateSlug(watchedTitle), { shouldValidate: true });
    }
  }, [watchedTitle, form, initialData?.slug]);

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const currentSubmitButtonText = isPublished
    ? (isLoading ? "Publishing..." : "Update Published Post")
    : (isLoading ? "Saving Draft..." : "Save Draft & Preview");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
            <CardDescription>Fill in the main content for your blog post.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Your Awesome Blog Post Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="your-awesome-blog-post-title" {...field} onChange={(e) => field.onChange(generateSlug(e.target.value))} />
                  </FormControl>
                  <FormDescription>The URL-friendly version of the title. Auto-generated but can be edited.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Textarea placeholder="Start writing your masterpiece here... Supports Markdown." rows={15} {...field} />
                  </FormControl>
                  <FormDescription>Tip: You can use Markdown for formatting.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Post Excerpt & Image</CardTitle>
            <CardDescription>Provide a summary and an optional cover image for your post.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary / Excerpt <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Textarea placeholder="Short, compelling summary for post previews (max 300 chars)." rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cover_image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/your-image.jpg" {...field} />
                  </FormControl>
                  <FormDescription>Link to the main image for this post.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        
        <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm bg-muted/30">
                <div className="space-y-0.5">
                    <FormLabel className="text-base">Publish Status</FormLabel>
                    <FormDescription>
                    Toggle on to make the post live, or off to keep it as a draft.
                    </FormDescription>
                </div>
                <FormControl>
                    <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                </FormControl>
                </FormItem>
            )}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isLoading} className="min-w-[180px]">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
            {currentSubmitButtonText}
          </Button>
        </div>
      </form>
    </Form>
  );
}
