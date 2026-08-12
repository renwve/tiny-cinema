"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  };

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