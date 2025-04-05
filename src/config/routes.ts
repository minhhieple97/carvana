import type { MultiStepFormEnum } from '@/config';

export const routes = {
  home: '/',
  singleClassified: (slug: string) => `/classifieds/${slug}`,
  notAvailable: (slug: string) => `/classifieds/${slug}/not-available`,
  reserve: (slug: string, step: MultiStepFormEnum) => `/classifieds/${slug}/reserve?step=${step}`,
  favourites: '/favourites',
  classifieds: '/classifieds',
  signIn: '/sign-in',
  success: (slug: string) => `/classifieds/${slug}/success`,
};
