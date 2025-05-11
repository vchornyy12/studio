// src/app/(app)/demo/ai-assistant/page.tsx
"use client";

import { Bot } from "lucide-react";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function AIAssistantDemoPage() {

  // Optional state to give feedback while script is loading
  const [scriptReady, setScriptReady] = useState(false);

  // Effect for cleanup on unmount/navigation away
  useEffect(() => {
    console.log("AI Assistant Demo Page: Component mounted.");
    return () => {
      console.log("AI Assistant Demo Page: Component unmounting or navigating away.");
       // Clean up any potential remnants in the chat_form div on navigation away
       const chatFormDiv = document.getElementById("chat_form");
       if (chatFormDiv) {
         chatFormDiv.innerHTML = ""; 
       }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 animate-fade-in">
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent flex items-center justify-center">
          <Bot className="h-10 w-10 mr-4 text-primary" />
          AI Assistant Demo
        </h1>
        {/* Display loading text until script signals it's ready */}
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Interact with our AI Assistant demo below. {!scriptReady && "(Loading chat...)"}
        </p>
      </header>

      <section className="max-w-3xl mx-auto bg-card p-6 md:p-8 rounded-lg shadow-lg">
        {/* The div where the chat form will be rendered by the script */}
        <div id="chat_form"></div>
      </section>

      {/* 
        Aminos AI Chat Form Plugin Script
        Using next/script is the recommended way to load third-party scripts.
        - strategy="lazyOnload": Loads the script after the page is interactive,
          suitable for non-critical scripts like chat widgets.
        - data-bot-id: Essential attribute required by the Aminos script.
        - onLoad/onError: Provide feedback on script loading status.
      */}
      <Script 
        src="https://app.aminos.ai/js/chat_form_plugin.js" 
        strategy="lazyOnload" 
        data-bot-id="45238"
        onLoad={() => {
          console.log('AI Assistant Demo Page: Aminos AI chat script loaded successfully via next/script.');
          setScriptReady(true); // Update state
          // The script is expected to find the #chat_form div and initialize itself 
          // once loaded and the div is in the DOM. No manual init call is usually needed 
          // for scripts designed this way.
        }}
        onError={(e) => {
          console.error('AI Assistant Demo Page: Error loading Aminos AI chat script via next/script:', e);
          // You might want to display an error message to the user here
        }}
      />
    </div>
  );
}
