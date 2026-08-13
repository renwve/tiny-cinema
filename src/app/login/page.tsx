/**
 * Program: Tiny Cinema
 * Date: August 12, 2026
 * Description: This page authenticates existing Tiny Cinema users with Supabase.
 * Input: It accepts an email address and password submitted through the login form.
 * Processing and Output: It validates the credentials with Supabase, displays an error when authentication fails, and redirects successful users to the movie collection.
 */
"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  // Form state: track credentials, submission progress, and authentication errors.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Login processing: submit credentials and route authenticated users to movies.
  const handleLogin = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    const supabase = createClient();

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/movies");
    router.refresh();
  };

  // Page output: render the login form and registration link.
  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <span>🎬</span>
          <strong>IMR Movies</strong>
        </div>

        <div className="auth-header">
          <span className="auth-eyebrow">
            WELCOME BACK
          </span>

          <h1>Sign in</h1>

          <p>
            Log in to continue managing the movie
            collection.
          </p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
          </div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          <span>Don't have an account?</span>

          <Link href="/register">
            Create an account
          </Link>
        </div>
      </div>
    </main>
  );
}
