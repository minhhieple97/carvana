import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'block w-full rounded-md border bg-transparent px-4 py-2.5 text-sm',
        'text-foreground placeholder:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-colors duration-200',
        'dark:border-input dark:placeholder:text-muted-foreground',
        'hover:border-input/80 dark:hover:border-input/80',
        className
      )}
      ref={ref}
      data-slot="input"
      {...props}
    />
  )
);

Input.displayName = 'Input';

export { Input };
