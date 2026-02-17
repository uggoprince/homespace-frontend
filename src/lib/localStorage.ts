'use client';

const getWebUrl = () => {
  if (globalThis.window === undefined) return '';
  return process.env.NEXT_PUBLIC_WEB_URL || globalThis.location.origin;
};

export const setLocalStorage = (keyPrefix: string, value: string) => {
  if (globalThis.window === undefined) return;
  const key = `${getWebUrl()}_${keyPrefix}`;
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string): string | null => {
  if (globalThis.window === undefined) return null;
  const k = `${getWebUrl()}_${key}`;
  return localStorage.getItem(k);
};

export const getUserFromLocalStorage = (key: string) => {
  const user = getLocalStorage(key);
  if (user) return JSON.parse(user);
  return null;
};

export const updateLocalStorage = (key: string, data: Record<string, unknown>) => {
  const userStr = getLocalStorage(key);
  if (!userStr) return;
  let user = JSON.parse(userStr);
  user = { ...user, ...data };
  setLocalStorage(key, JSON.stringify(user));
};

export const destroyLocalStorage = (key: string) => {
  if (globalThis.window === undefined) return;
  const k = `${getWebUrl()}_${key}`;
  localStorage.removeItem(k);
};
