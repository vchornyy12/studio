// src/app/(app)/services/nlp-solutions/page.tsx
import { SITE_NAME } from "@/lib/constants";
import { Bot } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const service = {
  id: "nlp-solutions",
  title: "AI Assistants Development",
  description: "Leverage NLP for chatbots, sentiment analysis, text summarization, and other language-based AI tasks.",
  icon: Bot,
};

export const metadata = {
  title: `${service.title} | Services | ${SITE_NAME}`,
  description: service.description,
};

export default function AIAssistantsDevelopmentPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 animate-fade-in">
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent flex items-center justify-center">
          <service.icon className="h-10 w-10 mr-4 text-primary" />
          {service.title}
        </h1>
      </header>
      <section className="max-w-3xl mx-auto bg-card p-6 md:p-8 rounded-lg shadow-lg">
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
          {service.description}
        </p>
        <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">Capabilities</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-8">
          <li>Development of intelligent chatbots and virtual assistants.</li>
          <li>Sentiment analysis to understand customer feedback and opinions.</li>
          <li>Automated text summarization and document analysis.</li>
          <li>Custom Natural Language Processing (NLP) model training.</li>
        </ul>
        <div className="text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95">
            <Link href="/#contact">
              Build Your AI Assistant
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
