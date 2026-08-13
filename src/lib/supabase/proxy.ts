/**
 * Program: Tiny Cinema
 * Date: August 12, 2026
 * Description: This module synchronizes Supabase authentication cookies during Next.js request processing.
 * Input: It receives the current NextRequest and reads its stored session cookies.
 * Processing and Output: It validates authentication claims, copies refreshed cookies to the request and response, and outputs the updated response.
 */
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Session refresh: construct a server client and synchronize any changed cookies.
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  await supabase.auth.getClaims();

  return response;
}
