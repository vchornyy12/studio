// src/app/(app)/demo/ai-agent/page.tsx
"use client";

import { Bot } from "lucide-react"; // Using Bot icon as a placeholder

export default function AIAgentDemoPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col items-center text-center mb-12">
        <Bot className="h-16 w-16 mb-6 text-primary" />
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
          AI Agent Demo
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          Welcome to the AI Agent demonstration page. Interactive agent functionalities will be showcased here.
        </p>
      </div>

      <div className="bg-card p-8 rounded-lg shadow-xl border border-border">
        <h2 className="text-2xl font-semibold mb-4 text-center">AI Agent Interaction Zone</h2>
        <p className="text-muted-foreground text-center">
          (Placeholder for AI Agent components and interaction elements)
        </p>
      </div>
    </div>
  );
}
