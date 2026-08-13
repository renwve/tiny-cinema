/**
 * Program: Tiny Cinema
 * Date: August 12, 2026
 * Description: This file defines the application's root route and its initial navigation behavior.
 * Input: It receives a request from a visitor who opens the base application URL.
 * Processing and Output: It performs no data transformation and outputs a redirect to the login page.
 */
import { redirect } from "next/navigation";

// Root route: direct visitors to the authentication workflow.
export default function Home() {
  redirect("/login");
}
