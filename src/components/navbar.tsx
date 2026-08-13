/**
 * Program: Tiny Cinema
 * Date: August 12, 2026
 * Description: This component displays the main navigation and provides the application's logout action.
 * Input: It receives a logout click from the user and uses the active Supabase authentication session.
 * Processing and Output: It signs the user out, redirects to login, and outputs navigation links for movies and contact information.
 */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const router = useRouter();

  // Authentication action: end the current session and return to login.
  const handleLogout = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  };

  // Navigation output: render branding, route links, and the logout control.
  return (
    <nav className="navbar">
      <Link href="/movies" className="navbar-logo">
        🎬 tiny cinema
      </Link>

      <div className="navbar-links">
        <Link href="/movies">Movies</Link>

        <button
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </button>

        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}
