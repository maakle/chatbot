import { createBrowserClient } from '@supabase/ssr';
import type { Provider, User } from '@supabase/supabase-js';

let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (supabaseInstance) return supabaseInstance;

  supabaseInstance = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  );

  return supabaseInstance;
}

const supabase = createClient();

export async function getUserOnClient(): Promise<User | null> {
  const { data } = await supabase.auth.getSession();

  if (!data?.session?.user) {
    return null;
  }

  return data.session.user;
}

export async function createSupabaseUserViaEmailAndPassword(
  email: string,
  password: string,
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}`,
    },
  });

  return { data, error };
}

export async function signInSupabaseUserWithOauth(provider: Provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  return { data, error };
}
