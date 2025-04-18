import { routes } from './routes';

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
