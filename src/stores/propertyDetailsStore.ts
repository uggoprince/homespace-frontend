import { create } from 'zustand';
import { Property } from '@/types/property';

interface PropertyDetailsState {
  selectedProperty: Property | null;
  setSelectedProperty: (property: Property) => void;
  clearSelectedProperty: () => void;
}

export const usePropertyDetailsStore = create<PropertyDetailsState>((set) => ({
  selectedProperty: null,
  setSelectedProperty: (property) => set({ selectedProperty: property }),
  clearSelectedProperty: () => set({ selectedProperty: null }),
}));
