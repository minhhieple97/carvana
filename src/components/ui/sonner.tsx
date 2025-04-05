'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

import type { ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();
  return (
    <Sonner
      theme={theme as 'light' | 'dark' | 'system'}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: 'group rounded-md border border-border shadow-lg',
          title: 'text-sm font-semibold font-heading',
          description: 'text-xs text-foreground/80',
          actionButton:
            'bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-md font-medium transition-colors hover:bg-primary/90',
          cancelButton:
            'bg-muted text-muted-foreground text-xs px-3 py-1.5 rounded-md font-medium transition-colors hover:bg-muted/90',
          success: 'bg-card text-card-foreground border-l-4 border-l-emerald-500',
          error: 'bg-card text-card-foreground border-l-4 border-l-red-500',
          info: 'bg-card text-card-foreground border-l-4 border-l-primary',
          warning: 'bg-card text-card-foreground border-l-4 border-l-amber-500',
        },
      }}
      style={
        {
          '--normal-bg': 'hsl(var(--card))',
          '--normal-text': 'hsl(var(--card-foreground))',
          '--normal-border': 'hsl(var(--border))',

          '--success-bg': 'hsl(var(--card))',
          '--success-text': 'hsl(var(--card-foreground))',
          '--success-border': 'hsl(142, 76%, 36%)',
          '--success-icon': 'hsl(142, 76%, 36%)',

          '--error-bg': 'hsl(var(--card))',
          '--error-text': 'hsl(var(--card-foreground))',
          '--error-border': 'hsl(0, 84%, 60%)',
          '--error-icon': 'hsl(0, 84%, 60%)',

          '--warning-bg': 'hsl(var(--card))',
          '--warning-text': 'hsl(var(--card-foreground))',
          '--warning-border': 'hsl(45, 93%, 47%)',
          '--warning-icon': 'hsl(45, 93%, 47%)',

          '--toast-radius': 'var(--radius-md)',
          '--toast-shadow': '0 4px 12px rgba(0, 0, 0, 0.08)',
          '--font-family': 'var(--font-body)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
