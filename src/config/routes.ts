import type { MultiStepFormEnum } from '@/config';

export const routes = {
  home: '/',
  singleClassified: (slug: string) => `/classifieds/${slug}`,
  notAvailable: (slug: string) => `/classifieds/${slug}/not-available`,
  reserve: (slug: string, step: MultiStepFormEnum) => `/classifieds/${slug}/reserve?step=${step}`,
  favourites: '/favourites',
  classifieds: '/classifieds',
  signIn: '/signin',
  success: (slug: string) => `/classifieds/${slug}/success`,
  admin: {
    dashboard: '/admin/dashboard',
    classifieds: '/admin/classifieds',
    editClassified: (id: number) => `/admin/classifieds/edit/${id}`,
    customers: '/admin/customers',
    editCustomer: (id: number) => `/admin/customers/edit/${id}`,
    settings: '/admin/settings',
  },
};
