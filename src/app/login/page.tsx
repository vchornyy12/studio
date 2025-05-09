// src/app/login/page.tsx
"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Metadata } from 'next';

// Note: Metadata export from client components is not directly supported in App Router.
// It should be moved to a parent server component or a layout.tsx if static, or handled dynamically.
// For simplicity in this step, we'll keep it here, but acknowledge this limitation.
// export const metadata: Metadata = {
//   title: 'Login | AI Nexus',
//   description: 'Login to your AI Nexus account to access admin features and more.',
// };

export default function LoginPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!supabase) {
      setError("Supabase client is not initialized. Check your environment variables.");
      setLoading(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
    } else {
      setMessage("Logged in successfully! Redirecting...");
      // Wait for Supabase to set the session cookie
      // Then redirect to the admin page or a dashboard
      router.push("/admin"); // Or router.refresh() and let a layout handle redirect based on user state
    }
    setLoading(false);
  };

  // Placeholder for password reset functionality
  const handlePasswordReset = async () => {
    if (!email) {
      setError("Please enter your email address to reset the password.");
      return;
    }
    setLoading(true);
    setError(null);
    setMessage(null);
    if (!supabase) {
      setError("Supabase client is not initialized.");
      setLoading(false);
      return;
    }
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/update-password`, // Update with your actual password update page
    });
    if (resetError) {
      setError(resetError.message);
    } else {
      setMessage("Password reset email sent. Please check your inbox.");
    }
    setLoading(false);
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-4">
            <Brain className="h-10 w-10 text-primary" />
          </Link>
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Log in to your {SITE_NAME} admin account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <button 
                  type="button" 
                  onClick={handlePasswordReset} 
                  className="ml-auto inline-block text-sm text-primary hover:underline"
                  disabled={loading}
                >
                  Forgot your password?
                </button>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-destructive bg-destructive/10 p-2 rounded-md">{error}</p>}
            {message && <p className="text-sm text-primary bg-primary/10 p-2 rounded-md">{message}</p>}
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base py-3" 
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Need an account? Contact admin. {/* Or implement a sign-up flow */}
            </p>
            <Link href="/" className="font-medium text-primary hover:underline">
              &larr; Back to Homepage
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
