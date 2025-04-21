import { PublicFooter } from './footer';
import { PublicHeader } from './header';

import type { PropsWithChildren } from 'react';

export const PublicLayout = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col min-h-screen bg-background text-foreground">
    <PublicHeader />
    <main className="flex-grow">{children}</main>
    <PublicFooter />
  </div>
);
