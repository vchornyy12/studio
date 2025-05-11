// src/components/sections/testimonials-section.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import type { Testimonial } from "@/lib/types"; // Using LocalTestimonial
import { Star } from "lucide-react";
import { SITE_NAME } from "@/lib/constants"; 

interface LocalTestimonial {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorCompany?: string;
  authorAvatarUrl?: string;
}

const testimonials: LocalTestimonial[] = [
  {
    id: "1",
    quote: `${SITE_NAME} transformed our operations. Their AI solutions are top-notch, and the team is incredibly knowledgeable and supportive.`,
    authorName: "Jane Doe",
    authorTitle: "CEO",
    authorCompany: "Tech Solutions Inc.",
    authorAvatarUrl: "https://picsum.photos/100/100?random=t1",
  },
  {
    id: "2",
    quote: `The expertise ${SITE_NAME} brought to our data analytics project was game-changing. We've seen significant improvements in efficiency.`,
    authorName: "John Smith",
    authorTitle: "CTO",
    authorCompany: "Innovate Corp.",
    authorAvatarUrl: "https://picsum.photos/100/100?random=t2",
  },
  {
    id: "3",
    quote: `Working with ${SITE_NAME} has been a pleasure. Their custom AI tools have given us a real competitive edge.`,
    authorName: "Alice Brown",
    authorTitle: "Head of Product",
    authorCompany: "Future Forward Ltd.",
    authorAvatarUrl: "https://picsum.photos/100/100?random=t3",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-10 md:py-16 bg-background"> {/* Reduced padding */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-12"> {/* Reduced margin-bottom */}
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {`Hear from businesses that have partnered with ${SITE_NAME} to achieve their goals.`} 
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card">
              <CardContent className="pt-6 flex-grow flex flex-col">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground italic mb-6 flex-grow">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center mt-auto">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.authorAvatarUrl} alt={testimonial.authorName} data-ai-hint="person portrait" />
                    <AvatarFallback>{testimonial.authorName.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.authorName}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.authorTitle}
                      {testimonial.authorCompany && `, ${testimonial.authorCompany}`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
