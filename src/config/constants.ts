import { routes } from './routes';

export const imageSources = {
  classifiedPlaceholder:
    'https://majestic-motors.s3.eu-west-2.amazonaws.com/uploads/classified-placeholder.jpeg',
  carLinup: 'https://majestic-motors.s3.eu-west-2.amazonaws.com/uploads/car-lineup.jpeg',
  featureSection: 'https://majestic-motors.s3.eu-west-2.amazonaws.com/uploads/feature-section.jpg',
};

export const SOURCE_ID_KEY = 'sourceId';
export const CLASSIFIEDS_PER_PAGE = 10;

export const navLinks = [
  { id: 1, href: routes.home, label: 'Home' },
  { id: 2, href: routes.classifieds, label: 'Classifieds' },
];
