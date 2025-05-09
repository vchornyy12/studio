// 'use server';

/**
 * @fileOverview SEO Optimization Tool.
 *
 * This file defines a Genkit flow that analyzes text for SEO optimization and provides suggestions for improvement.
 * It exports:
 * - `optimizeSeoText` - An async function that takes text as input and returns SEO optimization suggestions.
 * - `OptimizeSeoTextInput` - The input type for the optimizeSeoText function.
 * - `OptimizeSeoTextOutput` - The output type for the optimizeSeoText function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeSeoTextInputSchema = z.object({
  text: z.string().describe('The text to analyze for SEO optimization.'),
  targetKeywords: z.string().describe('The target keywords for SEO optimization.'),
});
export type OptimizeSeoTextInput = z.infer<typeof OptimizeSeoTextInputSchema>;

const OptimizeSeoTextOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('Suggestions for improving the text for SEO optimization.'),
  seoScore: z.number().describe('The overall SEO score of the text (0-100).'),
});
export type OptimizeSeoTextOutput = z.infer<typeof OptimizeSeoTextOutputSchema>;

export async function optimizeSeoText(input: OptimizeSeoTextInput): Promise<OptimizeSeoTextOutput> {
  return optimizeSeoTextFlow(input);
}

const optimizeSeoTextPrompt = ai.definePrompt({
  name: 'optimizeSeoTextPrompt',
  input: {schema: OptimizeSeoTextInputSchema},
  output: {schema: OptimizeSeoTextOutputSchema},
  prompt: `You are an SEO expert. Analyze the following text and provide suggestions for improvement to optimize it for the target keywords. Also, provide an SEO score between 0 and 100.

Text: {{{text}}}
Target Keywords: {{{targetKeywords}}}

Respond in JSON format.
`,
});

const optimizeSeoTextFlow = ai.defineFlow(
  {
    name: 'optimizeSeoTextFlow',
    inputSchema: OptimizeSeoTextInputSchema,
    outputSchema: OptimizeSeoTextOutputSchema,
  },
  async input => {
    const {output} = await optimizeSeoTextPrompt(input);
    return output!;
  }
);
