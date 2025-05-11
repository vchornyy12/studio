// src/lib/types.ts
import type { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: LucideIcon; // Icon is optional
  href?: string; // href is optional, for linking to service pages
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorCompany?: string;
  authorAvatarUrl?: string;
}

export interface NavLink {
  href: string;
  label: string;
  current?: boolean; // Optional: to mark the current active link
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string; // ISO date string
  tags: string[];
  imageUrl?: string;
  featured?: boolean;
}

// For the AI SEO Tool
export interface OptimizeSeoTextInput {
  text: string;
  targetKeywords: string; 
}

export interface OptimizeSeoTextOutput {
  seoScore: number; // 0-100
  suggestions: string; // Markdown formatted suggestions
  // optimizedText: string; // Potentially, if the AI directly modifies text
}
