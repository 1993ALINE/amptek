import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase-server";
import AdminTopbar from "@/components/admin/AdminTopbar";

// Authoritative auth gate for the admin panel. The proxy does an optimistic
// redirect, but this server-side getUser() check is what actually protects the
// pages: any unauthenticated request is bounced to the login page. The login
// route lives outside this route group, so it isn't gated (no redirect loop).
export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-[80vh] bg-zinc-50 dark:bg-zinc-950">
      <AdminTopbar email={user.email ?? ""} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
