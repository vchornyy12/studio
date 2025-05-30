// src/components/sections/about-section.tsx
import Image from "next/image";
import { Award, Users, Lightbulb, Zap, GitMerge } from "lucide-react"; // Added Zap and GitMerge
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants"; 

export function AboutSection() {
  return (
    <section id="about" className="py-10 md:py-16 bg-secondary/30"> {/* Reduced padding */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[10/7] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="https://cdn.pixabay.com/photo/2024/05/21/19/58/code-8779047_1280.jpg"
              alt={`${SITE_NAME} Team`} 
              layout="fill"
              objectFit="cover"
              className="rounded-xl transform transition-transform duration-500 hover:scale-110"
              data-ai-hint="team collaboration"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{`About ${SITE_NAME}`}</h2> 
            <p className="text-lg text-muted-foreground">
              {`${SITE_NAME} was founded with a mission to democratize access to powerful AI technologies. We believe in the transformative potential of AI and are dedicated to helping businesses of all sizes harness it for sustainable growth and innovation.`} 
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">Innovative Solutions</h3>
                  <p className="text-sm text-muted-foreground">We pioneer cutting-edge AI strategies tailored to your needs.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">Expert Team</h3>
                  <p className="text-sm text-muted-foreground">Our team comprises experienced AI researchers and engineers.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Zap className="h-6 w-6 text-primary" /> {/* New Icon */}
                </div>
                <div>
                  <h3 className="font-semibold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">Easy to Integrate</h3> {/* New Title */}
                  <p className="text-sm text-muted-foreground">Seamlessly integrate our AI solutions into your existing systems.</p> {/* New Description */}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <GitMerge className="h-6 w-6 text-primary" /> {/* New Icon */}
                </div>
                <div>
                  <h3 className="font-semibold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">Full Customization</h3> {/* New Title */}
                  <p className="text-sm text-muted-foreground">Tailor every aspect of the AI model to your specific requirements.</p> {/* New Description */}
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
