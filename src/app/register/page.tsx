/**
 * Program: Tiny Cinema
 * Date: August 12, 2026
 * Description: This page creates new Tiny Cinema user accounts through Supabase authentication.
 * Input: It accepts an email address, password, and password confirmation from the registration form.
 * Processing and Output: It checks password rules, submits valid credentials, reports errors or success, and redirects completed registrations to login.
 */
"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();

  // Form state: track account entries, feedback messages, and submission progress.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Registration processing: validate passwords and create the Supabase account.
  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);

    setSuccess("Account created successfully! Redirecting to login...");

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  // Page output: render registration inputs, feedback, and a login link.
  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <span>🎬</span>
          <strong>tiny cinema</strong>
        </div>

        <div className="auth-header">
          <span className="auth-eyebrow">NEW ACCOUNT</span>

          <h1>Create account</h1>

          <p>Create your account to start managing the movie database.</p>
        </div>

        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Enter your password again"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          {success && <div className="auth-success">{success}</div>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>

          <Link href="/login">Sign in</Link>
        </div>
      </div>
    </main>
  );
}
