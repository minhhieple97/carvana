import { PublicFooter } from './footer';
import { PublicHeader } from './header';

import type { PropsWithChildren } from 'react';

export const PublicLayout = ({ children }: PropsWithChildren) => (
  <>
    <PublicHeader />
    <div className="max-w-screen-2xl w-full mx-auto px-4 sm:px-6 md:px-8">
      <main className="bg-white">{children}</main>
    </div>
    <PublicFooter />
  </>
);
