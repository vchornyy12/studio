// src/app/login/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | AI Nexus',
  description: 'Login to your AI Nexus account to access admin features and more.',
};

// This is a placeholder login page.
// Full Supabase auth integration would require client-side logic, Supabase client setup,
// and potentially server actions or API routes.

export default function LoginPage() {
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Placeholder for login logic
    alert("Login functionality is a placeholder. In a real app, this would integrate with Supabase Auth.");
    // Example:
    // const email = (event.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    // const password = (event.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
    // const supabase = createSupabaseBrowserClient(); // From @/lib/supabase/client
    // if (supabase) {
    //   const { error } = await supabase.auth.signInWithPassword({ email, password });
    //   if (error) alert(error.message);
    //   else alert('Logged in successfully! (placeholder)'); // Redirect to admin or dashboard
    // }
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
              <Input id="email" type="email" placeholder="admin@example.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm text-primary hover:underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base py-3">
              Log In
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              This is a placeholder login form. Full authentication with Supabase
              is not implemented in this scaffold.
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
