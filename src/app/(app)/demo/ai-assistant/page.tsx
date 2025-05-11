// src/app/(app)/demo/ai-assistant/page.tsx
"use client";

import { Bot } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

const AMINOS_SCRIPT_ID = "aminos-chat-plugin-script";

export default function AIAssistantDemoPage() {
  const pathname = usePathname();
  const [chatDivKey, setChatDivKey] = useState(`chat-div-${Date.now()}`);
  const [isLoadingScript, setIsLoadingScript] = useState(false);
  const scriptAddedRef = useRef(false); // To track if script has been added in current lifecycle

  useEffect(() => {
    // Function to load the script
    const loadScript = () => {
      if (document.getElementById(AMINOS_SCRIPT_ID)) {
        console.log("AI Assistant Page: Script element already exists. May not re-initialize without manual trigger or full removal/re-add.");
        // Potentially remove and re-add if necessary, but let's see
        // For now, if it exists, we assume it might try to re-attach or already be active
        // This part is tricky with scripts that don't offer re-init.
        return;
      }

      console.log("AI Assistant Page: Attempting to load Aminos AI script.");
      setIsLoadingScript(true);
      scriptAddedRef.current = true;

      const script = document.createElement("script");
      script.id = AMINOS_SCRIPT_ID;
      script.src = "https://app.aminos.ai/js/chat_form_plugin.js";
      script.async = true;
      script.defer = true; // Similar to lazyOnload/afterInteractive
      script.setAttribute("data-bot-id", "45238");

      script.onload = () => {
        console.log("AI Assistant Page: Aminos AI script loaded successfully via dynamic script tag.");
        setIsLoadingScript(false);
        // At this point, the script should find #chat_form and initialize.
      };

      script.onerror = (error) => {
        console.error("AI Assistant Page: Error loading Aminos AI script dynamically:", error);
        setIsLoadingScript(false);
        // Remove the failed script
        const existingScript = document.getElementById(AMINOS_SCRIPT_ID);
        if (existingScript) {
          existingScript.remove();
        }
      };

      document.body.appendChild(script);
    };

    // Function to remove the script
    const removeScript = () => {
      const existingScript = document.getElementById(AMINOS_SCRIPT_ID);
      if (existingScript) {
        console.log("AI Assistant Page: Removing Aminos AI script.");
        existingScript.remove();
        scriptAddedRef.current = false;
      }
      // Also, good to clean up the chat_form content if the script adds anything directly inside it
      const chatFormDiv = document.getElementById("chat_form");
      if (chatFormDiv) {
        chatFormDiv.innerHTML = ""; // Clear out any remnants from the script
      }
    };

    if (pathname === "/demo/ai-assistant") {
      console.log("AI Assistant Page: Path matches. Forcing div re-render and ensuring script.");
      setChatDivKey(`chat-div-${Date.now()}`); // Force re-render of the target div

      // Remove previous script if any (e.g., from a previous visit during same session)
      // and then load it. This ensures a fresh execution.
      removeScript();
      loadScript();
      
    } else {
      // If we navigate away from this page, remove the script
      console.log("AI Assistant Page: Navigated away. Removing script.");
      removeScript();
    }

    // Cleanup function for when the component itself unmounts completely
    return () => {
      console.log("AI Assistant Page: Component unmounting. Removing script.");
      removeScript();
    };
  }, [pathname]); // Effect runs when pathname changes

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 animate-fade-in">
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent flex items-center justify-center">
          <Bot className="h-10 w-10 mr-4 text-primary" />
          AI Assistant Demo
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Interact with our AI Assistant demo below. {isLoadingScript && "(Loading chat...)"}
        </p>
      </header>

      <section className="max-w-3xl mx-auto bg-card p-6 md:p-8 rounded-lg shadow-lg">
        {/* The div where the chat form will be rendered, key helps ensure it's fresh */}
        <div id="chat_form" key={chatDivKey}></div>
      </section>
      
      {/* The next/script tag is no longer used for this specific script */}
    </div>
  );
}
