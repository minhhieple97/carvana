import { env } from '@/env';

import { routes } from './routes';

export const imageSources = {
  classifiedPlaceholder: `${env.NEXT_PUBLIC_IMGIX_URL}/uploads/AdobeStock_855683950.jpeg`,
  carLinup: `${env.NEXT_PUBLIC_IMGIX_URL}/uploads/AdobeStock_197763326.jpeg`,
  featureSection: 'https://majestic-motors.s3.eu-west-2.amazonaws.com/uploads/feature-section.jpg',
};

export const SOURCE_ID_KEY = 'sourceId';
export const CLASSIFIEDS_PER_PAGE = 10;

export const navLinks = [
  { id: 1, href: routes.home, label: 'Home' },
  { id: 2, href: routes.classifieds, label: 'Classifieds' },
];
