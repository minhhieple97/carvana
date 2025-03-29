import { PublicFooter } from './footer';
import { PublicHeader } from './header';

import type { PropsWithChildren } from 'react';

export const PublicLayout = ({ children }: PropsWithChildren) => (
  <>
    <PublicHeader />
    <main className="bg-white">{children}</main>
    <PublicFooter />
  </>
);
