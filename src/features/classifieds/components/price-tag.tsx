import { formatPrice } from '@/lib/utils';
import type { PriceTagProps } from '../types';

export const PriceTag = ({ price }: PriceTagProps) => (
  <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg">
    <p className="text-sm lg:text-base font-bold">{formatPrice({ price, currency: 'GBP' })}</p>
  </div>
);
