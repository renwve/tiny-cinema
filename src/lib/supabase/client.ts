/**
 * Program: Tiny Cinema
 * Date: August 12, 2026
 * Description: This module creates the Supabase client used by components running in the browser.
 * Input: It reads the public Supabase URL and publishable key from environment variables.
 * Processing and Output: It configures the Supabase SSR library and outputs a browser client for authentication and database requests.
 */
import { createBrowserClient } from "@supabase/ssr";

// Client factory: create a browser-safe Supabase connection.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
