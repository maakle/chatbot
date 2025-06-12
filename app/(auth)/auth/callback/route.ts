import { NextResponse } from 'next/server';
import { exchangeCodeForSession } from '@/lib/supabase/server';
import { insertUserAction } from '@/lib/actions/user';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  // Extract auth code and optional redirect path
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    // Exchange the auth code for a session
    const { data, error } = await exchangeCodeForSession(code);

    // Insert user into db
    if (data?.user?.id && data?.user?.email) {
      await insertUserAction(data.user.id, data.user.email);
    } else {
      throw new Error('Failed to get user data');
    }

    if (!error) {
      // Redirect to the intended path or fallback to homepage
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Redirect to error page if code is missing or exchange fails
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
