// src/components/sections/services-section.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, BrainCircuit, Cog, BarChartBig } from "lucide-react";
import type { Service } from "@/lib/types";

const services: Service[] = [
  {
    id: "custom-ai-dev",
    title: "Custom AI Development",
    description: "Tailored AI models and applications designed to meet your unique business challenges and objectives.",
    icon: BrainCircuit,
  },
  {
    id: "ai-integration",
    title: "AI System Integration",
    description: "Seamlessly integrate AI capabilities into your existing workflows and software infrastructure.",
    icon: Cog,
  },
  {
    id: "data-analytics",
    title: "AI-Powered Data Analytics",
    description: "Unlock insights from your data with advanced AI analytics, predictive modeling, and data visualization.",
    icon: BarChartBig,
  },
  {
    id: "nlp-solutions",
    title: "Natural Language Processing",
    description: "Leverage NLP for chatbots, sentiment analysis, text summarization, and other language-based AI tasks.",
    icon: Bot,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Expertise</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer a comprehensive suite of AI services to help your business thrive in the age of artificial intelligence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="items-center text-center">
                {service.icon && <service.icon className="h-12 w-12 mb-4 text-primary" />}
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-center text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
