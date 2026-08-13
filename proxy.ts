/**
 * Program: Tiny Cinema
 * Date: August 12, 2026
 * Description: This module applies Supabase session handling to incoming Next.js requests.
 * Input: It receives a NextRequest containing the current URL, cookies, and authentication state.
 * Processing and Output: It refreshes the session through updateSession and returns the resulting response while excluding static assets from processing.
 */
import { type NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/proxy";

// Request handling: refresh the authentication session for matched routes.
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

// Route configuration: avoid running session logic for framework and image assets.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
