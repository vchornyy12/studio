// src/lib/constants.tsx

// General Site Information
export const SITE_NAME = "AI Solutions";
export const SITE_DESCRIPTION = "Empowering businesses with cutting-edge AI solutions for a smarter future.";
export const SITE_URL = "https://aisolutions.com";
export const CONTACT_EMAIL = "vchornyy12@gmail.com";
export const BRAND_LOGO_PATH = "/logo.svg"; 

// SEO and Metadata
export const SEO_KEYWORDS = [
  "AI solutions", 
  "artificial intelligence", 
  "machine learning", 
  "business AI", 
  "AI consulting", 
  "data analytics",
  "AI development"
];
export const TWITTER_HANDLE = "@aisolutions";

// Navigation Links (Header & Footer)
import {
  TwitterIcon, 
  LinkedinIcon, 
  GithubIcon,
  Send, 
  Smartphone,
  Bot, // Added Bot for AI Assistant Demo
  FileText, // Added for SEO Tool in mobile
  type LucideIcon
} from "lucide-react";

export interface NavItem {
  label: string;
  href?: string; 
  isExternal?: boolean; 
  dropdown?: NavItem[]; 
  icon?: LucideIcon; 
  matchPaths?: string[]; 
}

export const HEADER_NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" }, 
  { label: "Services", href: "/#services" },
  {
    label: "Demo Apps",
    dropdown: [
      { label: "SEO Tool", href: "/seo-tool", matchPaths: ["/seo-tool"], icon: FileText },
      { label: "AI Assistant", href: "/demo/ai-assistant", matchPaths: ["/demo/ai-assistant"], icon: Bot },
      { label: "AI Agent", href: "/demo/ai-agent", matchPaths: ["/demo/ai-agent"], icon: Bot },
    ],
  },
  { label: "Blog", href: "/blog", matchPaths: ["/blog", "/blog/[slug]"] },
  { label: "Contact", href: "/#contact" },
];

export const FOOTER_NAV_LINKS = {
  company: [
    { label: "About Us", href: "/#about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" }
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
  services: [ 
    { label: "Custom AI Development", href: "/services/custom-ai-dev" },
    { label: "AI System Integration", href: "/services/ai-integration" },
    { label: "AI-Powered Data Analytics", href: "/services/data-analytics" },
    { label: "AI Assistants Development", href: "/services/nlp-solutions" }
  ],
};

export const SOCIAL_LINKS = [
  { name: "Twitter", href: "https://twitter.com/aisolutions", icon: TwitterIcon }, 
  { name: "LinkedIn", href: "https://linkedin.com/company/aisolutions", icon: LinkedinIcon }, 
  { name: "GitHub", href: "https://github.com/aisolutions", icon: GithubIcon }, 
  { name: "Telegram", href: "https://t.me/Vovachornyi", icon: Send },
  { name: "WhatsApp", href: "https://wa.me/48889906053", icon: Smartphone },
];

// Testimonials (Example Data Structure)
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatarUrl?: string; 
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    quote: "AI Solutions transformed our data strategy, leading to a 200% increase in efficiency.",
    name: "John Doe",
    role: "CEO, Tech Solutions Inc.",
    avatarUrl: "/avatars/john-doe.jpg", 
  },
  {
    quote: "The custom AI model developed by AI Solutions has given us a significant competitive edge.",
    name: "Jane Smith",
    role: "CTO, Innovate Ltd.",
    avatarUrl: "/avatars/jane-smith.jpg",
  },
];

// Call to Action (CTA) Content
export const CTA_TITLE = "Ready to Revolutionize Your Business with AI?";
export const CTA_DESCRIPTION = "Contact us today for a free consultation and discover how AI Solutions can tailor solutions to meet your unique needs.";
export const CTA_BUTTON_TEXT = "Get Started";
export const CTA_BUTTON_LINK = "/#contact";

// Copyright Information
export const COPYRIGHT_HOLDER = SITE_NAME;

