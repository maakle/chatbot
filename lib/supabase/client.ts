import { createBrowserClient } from '@supabase/ssr';
import type { User } from '@supabase/supabase-js';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  );
}

/**
 * Retrieves the current authenticated user from the client-side Supabase session.
 * @returns The authenticated user object or null if no user is logged in
 */
export async function getUserOnClient(): Promise<User | null> {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();

  if (!data?.session?.user) {
    return null;
  }

  return data.session.user;
}
