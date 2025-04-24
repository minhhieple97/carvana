'use client';

import { Button } from '@/components/ui';
import { Loader2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { logOutOfAllSessionsAction } from '@/features/auth/actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const LogoutButton = ({ isPending, onClick }: { isPending: boolean; onClick: () => void }) => {
  return (
    <div className="mt-8 flex">
      <Button
        disabled={isPending}
        className="flex items-center gap-x-2"
        variant="destructive"
        type="button"
        onClick={onClick}
      >
        {isPending && <Loader2 className="animate-spin w-4 h-4" />}
        {isPending ? 'Logging out...' : 'Log out of all sessions'}
      </Button>
    </div>
  );
};

export const SettingsPageContent = () => {
  const router = useRouter();
  const { execute, isPending } = useAction(logOutOfAllSessionsAction, {
    onSuccess: () => {
      router.push('/');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to log out of all sessions');
    },
  });

  return (
    <div className="divide-y divide-border px-6">
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 md:grid-cols-3">
        <div>
          <h2 className="text-base font-semibold leading-7 text-foreground">
            Log out of all sessions
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            This will log out out of all of your sessions across all of your devices of which you
            are currently logged into.
          </p>
        </div>
        <div className="md:col-span-2">
          <LogoutButton isPending={isPending} onClick={execute} />
        </div>
      </div>
    </div>
  );
};
