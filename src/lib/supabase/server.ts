/**
 * Program: Tiny Cinema
 * Date: August 12, 2026
 * Description: This module creates a server-side Supabase client that participates in cookie-based authentication.
 * Input: It reads public connection settings from the environment and session cookies from the current request.
 * Processing and Output: It connects cookie accessors to Supabase and outputs a configured client for server-side operations.
 */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Server client factory: connect Supabase authentication to the Next.js cookie store.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },

        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(
              ({ name, value, options }) => {
                cookieStore.set(name, value, options);
              }
            );
          } catch {
          }
        },
      },
    }
  );
}
