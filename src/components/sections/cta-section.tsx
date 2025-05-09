// src/components/sections/cta-section.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

export function CtaSection() {
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Placeholder for form submission logic
    // In a real app, you'd send this data to a backend or email service.
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    console.log("Form submitted:", { name, email, message: formData.get("message") });
    toast({
      title: "Message Sent!",
      description: `Thank you, ${name || 'friend'}! We'll be in touch shortly.`,
      variant: "default",
    });
    (event.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ready to Transform Your Business?</h2>
            <p className="text-lg text-muted-foreground">
              Let's discuss how AI Nexus can help you leverage artificial intelligence for unparalleled growth and efficiency. Reach out to us today for a personalized consultation.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-primary" />
                <a href="mailto:contact@ainexus.com" className="text-lg text-muted-foreground hover:text-primary">contact@ainexus.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-primary" />
                <a href="tel:+1234567890" className="text-lg text-muted-foreground hover:text-primary">+1 (234) 567-890</a>
              </div>
            </div>
             <div className="mt-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">Visit Us</h3>
                <p className="text-muted-foreground">
                    AI Nexus Headquarters<br />
                    123 Innovation Drive<br />
                    Tech City, TX 75001<br />
                    United States
                </p>
            </div>
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                  <Input type="text" id="name" name="name" required className="mt-1" placeholder="John Doe" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <Input type="email" id="email" name="email" required className="mt-1" placeholder="you@example.com" />
                </div>
                <div>
                  <Label htmlFor="company" className="text-sm font-medium">Company (Optional)</Label>
                  <Input type="text" id="company" name="company" className="mt-1" placeholder="Your Company Inc." />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                  <Textarea id="message" name="message" rows={4} required className="mt-1" placeholder="How can we help you?" />
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-base py-3">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
