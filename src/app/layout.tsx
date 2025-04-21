import type { Metadata } from 'next';

import { Mulish, Roboto } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { cn } from '@/lib/utils';
import './globals.css';
import { Toaster } from '@/components/ui';
import { ThemeProvider } from '@/components/shared';

export const metadata: Metadata = {
  title: 'Car Dealer Website',
  description: 'A sick car dealer website with AI.',
};

const mulish = Mulish({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen antialiased overscroll-none bg-background font-heading',
          roboto.variable,
          mulish.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader />
          <NuqsAdapter>{children}</NuqsAdapter>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
