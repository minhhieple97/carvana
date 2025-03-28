import type { MultiStepFormEnum } from '@/config';

export const routes = {
  home: '/',
  singleClassified: (slug: string) => `/classifieds/${slug}`,
  reserve: (slug: string, step: MultiStepFormEnum) => `/classifieds/${slug}/reserve?step=${step}`,
  favourites: '/favourites',
  classifieds: '/classifieds',
  signIn: '/sign-in',
};
