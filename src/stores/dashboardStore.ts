import { create } from 'zustand';
import { Agency, Property } from '@/types/property';

interface DashboardState {
  agency: Agency | null;
  properties: Property[];
  agencyFetched: boolean;
  propertiesFetched: boolean;
  pendingRefresh: boolean;
  setAgency: (agency: Agency) => void;
  setProperties: (properties: Property[]) => void;
  removeProperty: (id: string) => void;
  invalidateAgency: () => void;
  invalidateProperties: () => void;
  clearDashboard: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  agency: null,
  properties: [],
  agencyFetched: false,
  propertiesFetched: false,
  pendingRefresh: false,
  setAgency: (agency) => set({ agency, agencyFetched: true }),
  setProperties: (properties) => set({ properties, propertiesFetched: true, pendingRefresh: false }),
  removeProperty: (id) => set((state) => ({ properties: state.properties.filter((p) => p.id !== id) })),
  invalidateAgency: () => set({ agencyFetched: false }),
  invalidateProperties: () => set({ properties: [], propertiesFetched: false, pendingRefresh: true }),
  clearDashboard: () => set({ agency: null, properties: [], agencyFetched: false, propertiesFetched: false, pendingRefresh: false }),
}));
