 interface PropertyPhoto {
  id: string;
  propertyId: string;
  userId: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  id: string;
  propertyCode: string;
  agencyId: string;
  title: string;
  description: string;
  country: string;
  state: string;
  address: string;
  price: number;
  currency: string;
  propertyType: string;
  area: string;
  bedRooms: number;
  bathRooms: number;
  units: number;
  owner: string;
  intent: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  photos: PropertyPhoto[];
  agency: Agency;
  rentPaymentPeriod?: string;
}

export interface Agency {
  id: string;
  userId: string;
  name: string;
  username: string;
  country: string;
  state: string;
  address: string;
  phoneNumber: string;
  email: string;
  about: string;
  banner: string;
  facebook: string;
  instagram: string;
  twitter: string;
  whatsapp: string;
  createdAt: string;
  updatedAt: string;
  properties: Property[];
}