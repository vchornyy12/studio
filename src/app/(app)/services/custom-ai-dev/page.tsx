// src/app/(app)/services/custom-ai-dev/page.tsx
import { SITE_NAME } from "@/lib/constants";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const service = {
  id: "custom-ai-dev",
  title: "Custom AI Development",
  description: "Tailored AI models and applications designed to meet your unique business challenges and objectives.",
  icon: BrainCircuit,
};

export const metadata = {
  title: `${service.title} | Services | ${SITE_NAME}`,
  description: service.description,
};

export default function CustomAIDevelopmentPage() {
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
        <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">Key Aspects</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-8">
          <li>Bespoke AI model creation based on your specific data and requirements.</li>
          <li>Development of unique AI-powered applications from scratch.</li>
          <li>Solutions for complex problems that off-the-shelf software cannot solve.</li>
          <li>Focus on scalability, maintainability, and seamless integration.</li>
        </ul>
        <div className="text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95">
            <Link href="/#contact">
              Discuss Your Project
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
