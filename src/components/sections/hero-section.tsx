// src/components/sections/hero-section.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-background to-secondary/30 py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Zap className="mr-2 h-4 w-4" />
              Future-Proof Your Business with AI
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Unlock AI Potential with AI Nexus
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              We are your trusted partner in navigating the complexities of AI integration. From strategy to implementation, AI Nexus delivers tailored solutions that drive growth and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform hover:scale-105">
                <Link href="/#services">
                  Explore Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="shadow-lg transition-transform hover:scale-105">
                <Link href="/#contact">Request a Consultation</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105">
            <Image
              src="https://picsum.photos/800/450?random=1"
              alt="AI Integration concept"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
              data-ai-hint="abstract technology"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
             <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-semibold">Innovative AI Solutions</h3>
              <p className="text-sm opacity-80">Transforming industries with intelligent automation.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
