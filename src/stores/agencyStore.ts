import { create } from 'zustand';

function getSearchParams() {
  if (globalThis.window === undefined) return { q: '', start: 0 };
  const params = new URLSearchParams(globalThis.location.search);
  const q = params.get('search') || '';
  let start = Number(params.get('start')) || 0;
  start = Math.floor(start / 12) * 12;
  return { q, start };
}

function updateUrl(q: string, offset: number) {
  if (globalThis.window === undefined) return;
  const url = new URL(globalThis.location.href);
  if (q) {
    url.searchParams.set('search', q);
  } else {
    url.searchParams.delete('search');
  }
  if (offset > 0) {
    url.searchParams.set('start', String(offset));
  } else {
    url.searchParams.delete('start');
  }
  globalThis.history.pushState(null, '', url.toString());
}

interface AgencyStoreState {
  q: string;
  offset: number;
  limit: number;
  setSearch: (q: string, offset?: number) => void;
  setOffset: (offset: number) => void;
  syncFromUrl: () => void;
  reset: () => void;
}

export const useAgencyStore = create<AgencyStoreState>((set, get) => {
  const initial = getSearchParams();
  return {
    q: initial.q,
    offset: initial.start,
    limit: 12,
    setSearch: (q: string, offset = 0) => {
      updateUrl(q, offset);
      set({ q, offset });
    },
    setOffset: (offset: number) => {
      const { q } = get();
      updateUrl(q, offset);
      set({ offset });
    },
    syncFromUrl: () => {
      const { q, start } = getSearchParams();
      set({ q, offset: start });
    },
    reset: () => {
      updateUrl('', 0);
      set({ q: '', offset: 0 });
    },
  };
});
