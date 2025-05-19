// src/components/sections/cta-section.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, Send, Smartphone } from "lucide-react";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/constants";

export function CtaSection() {
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const name = formData.get("name");
        toast({
          title: "Message Sent!",
          description: `Thank you, ${name || "friend"}! We'll be in touch shortly.`, 
          variant: "default",
        });
        (event.target as HTMLFormElement).reset();
      } else {
        console.error("Failed to send email", response.status);
        toast({
          title: "Error",
          description: "Failed to send your message. Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending email", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-10 md:py-16 animate-fade-in"> {/* Reduced padding */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 animate-slide-up delay-200">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-muted-foreground">
              {`Let's discuss how ${SITE_NAME} can help you leverage artificial intelligence for unparalleled growth and efficiency. Reach out to us today for a personalized consultation.`}
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 group">
                <Mail className="h-6 w-6 text-primary group-hover:animate-pulse-bright" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-lg text-muted-foreground hover:text-primary transition-colors">{CONTACT_EMAIL}</a>
              </div>
              <div className="flex items-center gap-3 group">
                <Phone className="h-6 w-6 text-primary group-hover:animate-pulse-bright" />
                <a href="tel:+1234567890" className="text-lg text-muted-foreground hover:text-primary transition-colors">+1 (234) 567-890</a>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 text-transparent bg-clip-text mb-3">Visit Us</h3>
              <p className="text-muted-foreground">
                {`${SITE_NAME} Headquarters`}
                <br />
                123 Innovation Drive
                <br />
                Tech City, TX 75001
                <br />
                United States
              </p>
            </div>
          </div>

          <Card className="shadow-xl animate-slide-up delay-400">
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                  <Input type="text" id="name" name="name" required className="mt-1 focus:ring-2 focus:ring-accent" placeholder="John Doe" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <Input type="email" id="email" name="email" required className="mt-1 focus:ring-2 focus:ring-accent" placeholder="you@example.com" />
                </div>
                <div>
                  <Label htmlFor="company" className="text-sm font-medium">Company (Optional)</Label>
                  <Input type="text" id="company" name="company" className="mt-1 focus:ring-2 focus:ring-accent" placeholder="Your Company Inc." />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                  <Textarea id="message" name="message" rows={4} required className="mt-1 focus:ring-2 focus:ring-accent" placeholder="How can we help you?" />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-base py-3 transition-transform hover:scale-105 active:scale-95"
                >
                  Send Message
                </Button>
              </form>
              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-medium text-center bg-gradient-to-r from-muted-foreground to-muted-foreground/70 text-transparent bg-clip-text mb-4">Or connect with us directly:</h4>
                <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
                  <a
                    href="https://t.me/Vovachornyi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-2 px-3 border rounded-md hover:border-primary/50"
                  >
                    <Send className="h-4 w-4" />
                    Telegram
                  </a>
                  <a
                    href="https://wa.me/48889906053"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-2 px-3 border rounded-md hover:border-primary/50"
                  >
                    <Smartphone className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
