import { createClient } from '@/lib/supabase/client';
import { Button } from './ui/button';
import Image from 'next/image';

export function SocialLogins({
  type,
  isLoading,
}: {
  type: 'sign-up' | 'login';
  isLoading: boolean;
}) {
  const handleSignInWithGoogle = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const makeTitle = (provider: string) => {
    if (type === 'sign-up') {
      return `Sign up with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`;
    }
    return `Continue with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`;
  };

  return (
    <div>
      <div className="mt-4 flex justify-center">
        <Button
          type="button"
          className="w-full"
          disabled={isLoading}
          onClick={handleSignInWithGoogle}
        >
          <Image
            className="mr-2"
            width={16}
            height={16}
            src="/images/google-logo.webp"
            alt="Google"
          />
          {makeTitle('google')}
        </Button>
      </div>
    </div>
  );
}
