import { AlertTriangleIcon } from 'lucide-react';
import Link from 'next/link';

import { routes } from '@/config';

export default function AdminNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <AlertTriangleIcon className="h-16 w-16 text-amber-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2 text-foreground">Page Not Found</h1>
      <p className="text-muted-foreground mb-6">The requested admin page does not exist.</p>
      <Link
        href={routes.admin.dashboard}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
