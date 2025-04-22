import { type ElementType, forwardRef } from 'react';
import { NumericFormat, type NumericFormatProps } from 'react-number-format';

import { cn } from '@/lib/utils';

export const NumberInput = forwardRef<ElementType<typeof NumericFormat>, NumericFormatProps>(
  ({ className, ...props }, ref) => (
    <NumericFormat
      getInputRef={ref}
      thousandSeparator=","
      thousandsGroupStyle="thousand"
      decimalScale={0}
      allowNegative={false}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-transparent px-3',
        'text-sm ring-offset-background',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
);
