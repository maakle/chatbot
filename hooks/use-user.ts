import { useEffect, useState } from 'react';

import type { AuthError, Session, User } from '@supabase/supabase-js';
import { getSession } from '@/services/auth';

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const {
          data: { session },
          error,
        } = await getSession();
        if (error) throw error;

        if (session) {
          setSession(session);
          setUser(session.user);
        }
      } catch (error) {
        setError(error as AuthError);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return { loading, error, session, user };
}
