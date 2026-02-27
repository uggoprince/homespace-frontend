// Static routes — use as plain values
export const PATHS = {
  // Public
  home: '/',
  agencies: '/agencies',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',

  // Auth
  login: '/login',
  signup: '/signup',

  // Account
  profile: '/profile',
  changePassword: '/change-password',
  notifications: '/notifications',

  // Dashboard
  dashboard: '/dashboard',
  dashboardAgency: '/dashboard/agency',
  dashboardProperties: '/dashboard/properties',
  newProperty: '/dashboard/properties/new',
} as const;

// Dynamic routes — require a parameter
export const agencyPath = (username: string) => `/agencies/${username}`;
export const propertyPath = (propertyCode: string | number) => `/properties/${propertyCode}`;
export const propertyEditPath = (id: string | number) => `/dashboard/properties/${id}/edit`;
