import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Check your email to confirm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We sent you a magic link to sign in. Please check your email and
                click on it to proceed.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
