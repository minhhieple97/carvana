import { formatPrice } from '@/lib/utils';

import type { PriceTagProps } from '../types';

export const PriceTag = ({ price }: PriceTagProps) => (
  <div
    className="absolute top-3 right-3 bg-primary/95  
                  text-primary-foreground px-4 py-2 rounded-full 
                  shadow-lg dark:shadow-primary/10 
                  border border-primary-foreground/10 "
  >
    <p className="text-sm lg:text-base font-bold tracking-tight dark:text-black">
      {formatPrice({ price, currency: 'GBP' })}
    </p>
  </div>
);
