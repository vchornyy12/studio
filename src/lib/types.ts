// src/lib/types.ts

// Represents a blog post
export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or HTML content
  imageUrl?: string;
  author: User;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  // Add any other relevant fields like view count, likes, etc.
};

// Represents a user (author or general user)
export type User = {
  id: string;
  name: string;
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
