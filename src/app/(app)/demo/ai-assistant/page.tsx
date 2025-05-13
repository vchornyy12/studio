// src/app/(app)/demo/ai-assistant/page.tsx
"use client";

import { Sparkles } from "lucide-react"; // Changed from Bot to Sparkles
import Script from "next/script";
import { useEffect, useState, useRef } from "react";

export default function AIAssistantDemoPage() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const chatFormDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatFormDiv = chatFormDivRef.current;
    // This effect ensures the chat form div is available when the script might try to interact with it.
    // The main logic for initializing the chat should be handled by the Aminos script itself upon loading.
    if (scriptLoaded && chatFormDiv) {
      console.log("AI Assistant Demo Page: Script has loaded, and #chat_form div is present.");
      // If the AminosAI script needs explicit re-initialization after initial load
      // and being added to the DOM, it would be done here.
      // For example:
      // if (window.AminosAI && typeof window.AminosAI.reinit === 'function') {
      //   window.AminosAI.reinit(document.getElementById('chat_form'));
      // }
    }

    return () => {
      // Cleanup when the component unmounts
      if (chatFormDiv) {
        console.log("AI Assistant Demo Page: Cleaning up #chat_form div content on unmount.");
        // Clearing innerHTML is a common way to deal with third-party scripts
        // that might not clean up after themselves properly.
        chatFormDiv.innerHTML = "";
      }
    };
  }, [scriptLoaded]); // Re-run if scriptLoaded state changes.

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 animate-fade-in">
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent flex items-center justify-center">
          <Sparkles className="h-10 w-10 mr-4 text-primary" /> {/* Changed from Bot to Sparkles */}
          AI Assistant Demo
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Interact with our AI Assistant demo below. {!scriptLoaded && "(Loading chat...)"}
        </p>
      </header>

      <section className="max-w-3xl mx-auto bg-card p-6 md:p-8 rounded-lg shadow-lg">
        {/* This is the target div for the Aminos AI chat plugin. */}
        <div id="chat_form" ref={chatFormDivRef}></div>
      </section>

      <Script
        src="https://app.aminos.ai/js/chat_form_plugin.js"
        strategy="afterInteractive" 
        data-bot-id="45238"
        onLoad={() => {
          console.log('AI Assistant Demo Page: Aminos AI chat script has loaded (onLoad fired).');
          setScriptLoaded(true);
        }}
        onError={(e) => {
          console.error('AI Assistant Demo Page: Error loading Aminos AI chat script:', e);
          setScriptLoaded(false); 
        }}
        id="aminos-chat-plugin-script"
      />
    </div>
  );
}
