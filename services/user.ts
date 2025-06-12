import { insertUserAction } from '@/lib/actions/user';
import {
  createSupabaseUserViaEmailAndPassword,
  signInSupabaseUserWithOauth,
} from '@/lib/supabase/client';
import type { Provider } from '@supabase/supabase-js';

export async function createUserViaEmail(email: string, password: string) {
  const { data, error } = await createSupabaseUserViaEmailAndPassword(
    email,
    password,
  );
  if (error || !data.user) throw error;

  // Create user in db
  await insertUserAction(data.user.id, email);
}

export async function signInWithOauth(provider: Provider) {
  const { data, error } = await signInSupabaseUserWithOauth(provider);
  if (error) throw error;
}
