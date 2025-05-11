// src/app/(app)/seo-tool/page.tsx
import { SeoForm } from "./(components)/seo-form";
import type { Metadata } from 'next';
import { SITE_NAME } from "@/lib/constants"; // Import SITE_NAME

export const metadata: Metadata = {
  title: `AI SEO Optimization Tool | ${SITE_NAME}`,
  description: 'Utilize our AI-powered SEO tool to analyze your content, get actionable suggestions, and improve your search engine rankings. Optimize your text for target keywords effectively.',
};

export default function SeoToolPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            SEO Optimization Tool
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Enhance your content's visibility. Our AI analyzes your text against target keywords and provides actionable insights to boost your SEO performance.
          </p>
        </header>
        
        <SeoForm />
      </div>
    </div>
  );
}
