// src/lib/types.ts

// Represents a blog post
export type Post = {
  id: string;
  slug: string;
  title: string;
  summary: string; // Replaces excerpt and seo_description
  content: string; // Markdown or HTML content
  cover_image?: string; // Replaces imageUrl and featured_image_url
  author: User;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  published: boolean; // Replaces status and published_at for publication state
  // Add any other relevant fields like view count, likes, etc.
};

// Represents a user (author or general user)
export type User = {
  id: string;
  name: string; // Should be populated, e.g., full_name or fallback to email/anonymous
  avatarUrl?: string;
  email?: string; // May not always be public
  // Add other user-related fields, e.g., bio, role
};

// Represents a service offered by the agency
export type Service = {
  id: string;
  title: string;
  description: string;
  icon?: React.ElementType; // Lucide icon component or similar
  detailsUrl?: string; // Link to a more detailed page if needed
};

// Represents a testimonial
export type Testimonial = {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorCompany?: string;
  authorAvatarUrl?: string;
};

// SEO Optimization Tool Output (matches the GenAI flow output)
export type SeoOptimizationResult = {
  suggestions: string;
  seoScore: number;
};

