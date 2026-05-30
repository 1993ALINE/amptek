import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Supabase client for Server Components, Server Actions, and the admin layout.
// Wired into Next's request cookie store so it can read (and refresh) the auth
// session. `cookies()` is async in Next.js 16, so this factory is async too.
//
// Reading cookies opts the calling route into dynamic rendering, which is what
// we want for the store: product reads always reflect the latest DB state.
export async function createServerSupabase() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        // In Server Components the cookie store is read-only; the proxy handles
        // refresh. Swallow the resulting error so reads still work.
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component — safe to ignore.
        }
      },
    },
  });
}
