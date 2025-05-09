// src/app/(app)/seo-tool/(components)/seo-form.tsx
"use client";

import { useState, useTransition } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { optimizeSeoText } from "@/ai/flows/optimize-seo-text";
import type { OptimizeSeoTextInput, OptimizeSeoTextOutput } from "@/ai/flows/optimize-seo-text";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Sparkles, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const seoFormSchema = z.object({
  text: z.string().min(50, "Text must be at least 50 characters long.").max(5000, "Text cannot exceed 5000 characters."),
  targetKeywords: z.string().min(3, "Keywords must be at least 3 characters long.").max(100, "Keywords cannot exceed 100 characters."),
});

type SeoFormValues = z.infer<typeof seoFormSchema>;

export function SeoForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<OptimizeSeoTextOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SeoFormValues>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: {
      text: "",
      targetKeywords: "",
    },
  });

  const onSubmit: SubmitHandler<SeoFormValues> = (data) => {
    setError(null);
    setResult(null);
    startTransition(async () => {
      try {
        const analysisResult = await optimizeSeoText(data);
        setResult(analysisResult);
      } catch (e: any) {
        console.error("Error in AI SEO analysis:", e);
        setError(e.message || "An unexpected error occurred during SEO analysis.");
      }
    });
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Sparkles className="mr-2 h-6 w-6 text-accent" />
                AI-Powered SEO Analyzer
              </CardTitle>
              <CardDescription>
                Enter your text and target keywords to get AI-driven SEO suggestions and a performance score.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="text" className="text-base">Your Text Content</FormLabel>
                    <FormControl>
                      <Textarea
                        id="text"
                        placeholder="Paste your blog post, product description, or any web content here..."
                        rows={10}
                        className="text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide the full text you want to analyze for SEO.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetKeywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="targetKeywords" className="text-base">Target Keywords</FormLabel>
                    <FormControl>
                      <Input
                        id="targetKeywords"
                        placeholder="e.g., AI integration, Next.js development, SEO optimization"
                        className="text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter comma-separated keywords you are targeting.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isPending} size="lg" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze SEO"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      {error && (
        <Card className="border-destructive bg-destructive/10 shadow-md">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center">
              <AlertTriangle className="mr-2 h-6 w-6" />
              Analysis Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive-foreground">{error}</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Sparkles className="mr-2 h-6 w-6 text-primary" />
              SEO Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-lg font-semibold text-foreground">Overall SEO Score</Label>
              <div className="flex items-center gap-4 mt-2">
                <Progress value={result.seoScore} className="w-full h-4" />
                <span className="text-2xl font-bold text-primary">{result.seoScore}/100</span>
              </div>
               <p className="text-sm text-muted-foreground mt-1">
                {result.seoScore >= 80 ? "Excellent! Your content is well-optimized." : 
                 result.seoScore >= 60 ? "Good, but there's room for improvement." :
                 result.seoScore >= 40 ? "Needs significant improvement to rank well." :
                 "Considerable work needed for SEO effectiveness."}
              </p>
            </div>
            <div>
              <Label className="text-lg font-semibold text-foreground">Suggestions for Improvement</Label>
              <div className="mt-2 p-4 bg-muted/50 rounded-md border">
                <pre className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">
                  {result.suggestions}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
