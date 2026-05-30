import { createBrowserClient } from "@supabase/ssr";

// Supabase client for the browser (Client Components: login + admin CRUD).
// Uses @supabase/ssr's browser client so the auth session is stored in cookies
// — that's what lets the server (proxy + admin layout) read the session too.
// The anon / publishable key is safe to expose client-side; Row-Level Security
// on the Supabase project is what actually guards the data.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and " +
      "NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local."
  );
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
