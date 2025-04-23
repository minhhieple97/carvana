import { CustomerStatus } from '@prisma/client';

import { routes } from './routes';

import type { BadgeProps } from './types';

// export const imageSources = {
//   classifiedPlaceholder: `${env.NEXT_PUBLIC_IMGIX_URL}/uploads/AdobeStock_855683950.jpeg`,
//   carLinup: `${env.NEXT_PUBLIC_IMGIX_URL}/uploads/AdobeStock_197763326.jpeg`,
//   featureSection: `${env.NEXT_PUBLIC_IMGIX_URL}/uploads/AdobeStock_753683117.jpeg`,
// };
export const imageSources = {
  classifiedPlaceholder: `https://carvana-890304154.imgix.net/uploads/AdobeStock_855683950.jpeg`,
  carLinup: `https://carvana-890304154.imgix.net/uploads/AdobeStock_197763326.jpeg`,
  featureSection: `https://carvana-890304154.imgix.net/uploads/AdobeStock_753683117.jpeg`,
};

export const SOURCE_ID_KEY = 'sourceId';
export const CLASSIFIEDS_PER_PAGE = 10;

export const navLinks = [
  { id: 1, href: routes.home, label: 'Home' },
  { id: 2, href: routes.classifieds, label: 'Classifieds' },
];

export const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7; // 7 days
export const COOKIE_SESSION_KEY = 'session-id';
export const SESSION_PREFIX = 'session:';

export const MAX_IMAGE_SIZE = 20 * 1000 * 1000; // 2mb
export const MAX_IMAGES = 20;

export const sortOrder = ['asc', 'desc'] as const;

export const ADMIN_CLASSIFIEDS_PER_PAGE = '10';
export const ADMIN_CLASSIFIEDS_PAGE = '1';
export const ADMIN_CUSTOMERS_PER_PAGE = '10';
export const ADMIN_CUSTOMERS_PAGE = '1';
export const ITEMS_PER_PAGE = {
  '10': '10',
  '25': '25',
  '50': '50',
  '100': '100',
} as const;

export type ItemsPerPageType = keyof typeof ITEMS_PER_PAGE;

export const SORT_OPTIONS = {
  PRICE: 'price',
  YEAR: 'year',
  MAKE: 'make',
  MODEL: 'model',
} as const;

export type SortOptionsType = keyof typeof SORT_OPTIONS;

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type SortOrderType = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];

export type SortDirectionType = 'asc' | 'desc';

export const CustomerBadgeMap: Record<CustomerStatus, BadgeProps['variant']> = {
  [CustomerStatus.COLD]: 'secondary',
  [CustomerStatus.CONTACTED]: 'default',
  [CustomerStatus.INTERESTED]: 'destructive',
  [CustomerStatus.PURCHASED]: 'outline',
  [CustomerStatus.SUBSCRIBER]: 'outline',
} as const;
