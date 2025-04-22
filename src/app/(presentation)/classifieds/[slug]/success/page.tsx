import { CircleCheck } from 'lucide-react';

import { EndButtons } from '@/components/ui';

export default function SuccessfulReservationPage() {
  return (
    <div className="flex min-h-[80dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <CircleCheck
          className="mx-auto h-16 w-16 text-green-500 dark:text-green-400 transition-colors"
          aria-hidden="true"
        />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Reservation Confirmed!
        </h1>
        <p className="mt-4 text-muted-foreground">
          Thank you for your reservation. We'll see you soon.
        </p>
        <div className="mt-8">
          <EndButtons />
        </div>
      </div>
    </div>
  );
}
