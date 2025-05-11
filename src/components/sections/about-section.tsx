// src/components/sections/about-section.tsx
import Image from "next/image";
import { Award, Users, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants"; 

export function AboutSection() {
  return (
    <section id="about" className="py-10 md:py-16 bg-secondary/30"> {/* Reduced padding */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square rounded-xl overflow-hidden shadow-xl">
            <Image
              src="https://picsum.photos/600/600?random=30"
              alt={`${SITE_NAME} Team`} 
              layout="fill"
              objectFit="cover"
              className="rounded-xl transform transition-transform duration-500 hover:scale-110"
              data-ai-hint="team collaboration"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{`About ${SITE_NAME}`}</h2> 
            <p className="text-lg text-muted-foreground">
              {`${SITE_NAME} was founded with a mission to democratize access to powerful AI technologies. We believe in the transformative potential of AI and are dedicated to helping businesses of all sizes harness it for sustainable growth and innovation.`} 
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Innovative Solutions</h3>
                  <p className="text-sm text-muted-foreground">We pioneer cutting-edge AI strategies tailored to your needs.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Expert Team</h3>
                  <p className="text-sm text-muted-foreground">Our team comprises experienced AI researchers and engineers.</p>
                </div>
              </div>
              
            </div>
            <Button asChild size="lg" variant="link" className="text-primary hover:text-primary/80 px-0">
              <Link href="/blog">Learn More From Our Blog &rarr;</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
