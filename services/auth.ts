import { supabase } from '@/lib/supabase/client';
import type { Provider, User } from '@supabase/supabase-js';

export async function getUserOnClient(): Promise<User | null> {
  const { data } = await supabase.auth.getSession();

  if (!data?.session?.user) {
    return null;
  }

  return data.session.user;
}

export async function signInWithOtp(email: string) {
  return await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}`,
    },
  });
}

export async function signInWithOAuth(provider: Provider) {
  return await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function getSession() {
  return await supabase.auth.getSession();
}
