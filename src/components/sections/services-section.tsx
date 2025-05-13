// src/components/sections/services-section.tsx
import Link from "next/link"; // Added Link import
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Added Button import
import { Bot, BrainCircuit, Cog, BarChartBig, ArrowRight } from "lucide-react"; // Added ArrowRight
import type { Service } from "@/lib/types";

const services: Service[] = [
  {
    id: "custom-ai-dev",
    title: "Custom AI Development",
    description: "Tailored AI models and applications designed to meet your unique business challenges and objectives.",
    icon: BrainCircuit,
    href: "/services/custom-ai-dev", // Added href
  },
  {
    id: "ai-integration",
    title: "AI System Integration",
    description: "Seamlessly integrate AI capabilities into your existing workflows and software infrastructure.",
    icon: Cog,
    href: "/services/ai-integration", // Added href
  },
  {
    id: "data-analytics",
    title: "AI-Powered Data Analytics",
    description: "Unlock insights from your data with advanced AI analytics, predictive modeling, and data visualization.",
    icon: BarChartBig,
    href: "/services/data-analytics", // Added href
  },
  {
    id: "nlp-solutions",
    title: "AI Assistants Development",
    description: "Leverage NLP for chatbots, sentiment analysis, text summarization, and other language-based AI tasks.",
    icon: Bot,
    href: "/services/nlp-solutions", // Added href
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-10 md:py-16 bg-background"> {/* Reduced padding */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12"> {/* Reduced margin-bottom */}
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Our Expertise</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer a comprehensive suite of AI services to help your business thrive in the age of artificial intelligence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="items-center text-center">
                {service.icon && <service.icon className="h-12 w-12 mb-4 text-primary" />}
                <CardTitle className="text-xl bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <CardDescription className="text-center text-base mb-4 flex-grow">
                  {service.description}
                </CardDescription>
                {service.href && (
                  <Button asChild size="sm" className="mt-auto w-full group transform transition-all duration-300 hover:scale-105 hover:shadow-md hover:bg-muted">
                    <Link href={service.href} className="bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
                      Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
