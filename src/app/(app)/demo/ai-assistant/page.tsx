// src/app/(app)/demo/ai-assistant/page.tsx
"use client";

import { Bot } from "lucide-react";
import Script from "next/script";
import { useEffect, useState, useRef } from "react";

export default function AIAssistantDemoPage() {
  const [scriptReady, setScriptReady] = useState(false);
  const chatFormDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatFormDiv = chatFormDivRef.current;
    if (scriptReady && chatFormDiv) {
      console.log("AI Assistant Demo Page: Script loaded and div #chat_form is present. Chat should auto-initialize.");
      // The Aminos script is expected to find the <div id="chat_form"></div>
      // and render the chat widget automatically when it loads,
      // given data-bot-id is set on the script tag.
    }

    // Cleanup function:
    // Important to clear out any content injected by the third-party script
    // into the div when the component unmounts or the script is reloaded.
    // This helps prevent issues if the user navigates away and back.
    return () => {
      if (chatFormDiv) {
        console.log("AI Assistant Demo Page: Cleaning up #chat_form div content.");
        // Clear out any remnants added by the script.
        // This is important because the script might not clean up itself when the component unmounts.
        // Check if chatFormDiv still has child nodes before clearing, to avoid errors if it was already cleared or not populated.
        if (chatFormDiv.hasChildNodes()) {
            chatFormDiv.innerHTML = ""; 
        }
      }
    };
  }, [scriptReady]); // Re-run effect if scriptReady state changes.

  // Log component mount and div availability
  useEffect(() => {
    console.log("AI Assistant Demo Page: Component mounted.");
    if (chatFormDivRef.current) {
      console.log("AI Assistant Demo Page: #chat_form div is in the DOM upon mount.");
    }
  }, []);


  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 animate-fade-in">
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent flex items-center justify-center">
          <Bot className="h-10 w-10 mr-4 text-primary" />
          AI Assistant Demo
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Interact with our AI Assistant demo below. {!scriptReady && "(Loading chat...)"}
        </p>
      </header>

      <section className="max-w-3xl mx-auto bg-card p-6 md:p-8 rounded-lg shadow-lg">
        {/* This is the target div for the Aminos AI chat plugin. */}
        {/* The script will inject the chat interface into this div. */}
        <div id="chat_form" ref={chatFormDivRef}></div>
      </section>

      {/*
        Aminos AI Chat Form Plugin Script loaded using next/script.
        - strategy="lazyOnload": Loads the script after the page is interactive, good for non-critical third-party scripts.
        - data-bot-id: This is a required attribute for the Aminos script to identify which bot to load.
        - onLoad: Callback function executed when the script has successfully loaded.
        - onError: Callback function executed if the script fails to load.
      */}
      <Script
        src="https://app.aminos.ai/js/chat_form_plugin.js"
        strategy="lazyOnload"
        data-bot-id="45238" // This corresponds to the data-bot-id attribute in the plain HTML script tag
        onLoad={() => {
          console.log('AI Assistant Demo Page: Aminos AI chat script loaded successfully via next/script.');
          setScriptReady(true); // Update state to indicate the script is ready
        }}
        onError={(e) => {
          console.error('AI Assistant Demo Page: Error loading Aminos AI chat script via next/script:', e);
          // Optionally, you could update the UI here to inform the user that the chat widget failed to load.
        }}
        id="aminos-chat-plugin-script" // Optional: Adding an ID to the script tag for easier debugging in browser dev tools
      />
    </div>
  );
}
