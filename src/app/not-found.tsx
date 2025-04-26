import Link from 'next/link';

import { PublicLayout } from '@/components/shared';
import { routes } from '@/config/routes';

export default function NotFound() {
  return (
    <PublicLayout>
      <div className="container mx-auto flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6 text-foreground">Page Not Found</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          href={routes.home}
          className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </PublicLayout>
  );
}
