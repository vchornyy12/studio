// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createSupabaseBrowserClient() {
  // Check if environment variables are set
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error(
      'Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY) are not set. ' +
      'The Supabase client will not be initialized. Please ensure these are set in your .env.local file.'
    );
    // Return a mock client or throw an error, depending on desired behavior for unconfigured state
    // For now, returning a basic object that won't throw if simple properties are accessed (like auth)
    // but will not be functional.
    return {
      auth: {
        onAuthStateChange: () => ({ data: { subscription: null }, error: null }), // Mock onAuthStateChange
        // Add other mock methods as needed to prevent errors in components if Supabase isn't configured
      },
      // Add other Supabase services mocks if necessary
    } as any; // Type assertion to satisfy SupabaseClient type partially
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Optional: Export a singleton instance if preferred in some parts of your app
// const supabase = createSupabaseBrowserClient();
// export default supabase;
