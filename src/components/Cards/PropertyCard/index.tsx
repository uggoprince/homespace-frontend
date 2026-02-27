'use client';

import Link from 'next/link';
import {
  Home, BedDouble, MapPin, Maximize, Eye,
} from 'lucide-react';
import countryToCurrency from 'country-to-currency';
import { countryNameToCode } from '../../../Utils/constants';
import { propertyPath } from '../../../Utils/paths';
import './style.css';
import { Property } from '@/types/property';
import { usePropertyDetailsStore } from '@/stores/propertyDetailsStore';

const formatPrice = (price: number, country: string, currency?: string) => (currency
  ? price?.toLocaleString(
    countryNameToCode[country as keyof typeof countryNameToCode], { style: 'currency', currency },
  )
  : price?.toLocaleString());

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const setSelectedProperty = usePropertyDetailsStore((s) => s.setSelectedProperty);
  const {
    photos, intent, price, propertyType, address, currency, country, propertyCode,
  } = property;

  let photo1;
  if (photos && photos.length > 0 && photos[0] !== null) {
    const { photo } = photos[0];
    photo1 = photo;
  }

  const theIntent = intent.charAt(0).toUpperCase() + intent.slice(1);

  return (
    <div className="prop-card group relative">
      <Link
        href={propertyPath(propertyCode)}
        className="block"
        aria-label={`View details for ${propertyType} at ${address}`}
      >
        {/* Image section */}
        <div className="card-image" style={{ backgroundImage: `url(${photo1})` }}>
          <div className="price-tag">
            <div className="font-medium inline-block">
              For
              {' '}
              {theIntent}
            </div>
          </div>
        </div>
        {/* Property details section */}
        <div className="px-2 py-2 space-y-1">
          <div className="text-sm font-bold text-indigo-400">
            {formatPrice(price, country, currency || countryToCurrency[countryNameToCode[country as keyof typeof countryNameToCode] as keyof typeof countryToCurrency])}
          </div>
          <div className="text-tertiary font-semibold text-sm capitalize">{propertyType}</div>
          <div className="text-xs truncate flex items-center gap-1 dark:text-white pb-1">
            <MapPin size={16} />
            <span className="flex-1 truncate">{address}</span>
          </div>
          <div className="flex items-center gap-4 text-sm dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
            <span className="flex items-center gap-1.5">
              <Home size={14} />
              {property.bedRooms ? (
                <span>
                  {property.bedRooms}
                  {' '}
                  beds
                </span>
              ) : ' - '}
            </span>
            <span className="flex items-center gap-1.5">
              <BedDouble size={14} />
              {property.bathRooms ? (
                <span>
                  {property.bathRooms}
                  {' '}
                  baths
                </span>
              ) : ' - '}
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize size={14} />
              {property.area ? (
                <span>
                  {property.area}
                  {' '}
                  sqft
                </span>
              ) : ' - '}
            </span>
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => setSelectedProperty(property)}
        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-lg
          transition-all opacity-0 group-hover:opacity-100 hover:scale-105 z-10"
        aria-label="Preview property"
        title="Preview"
      >
        <Eye size={16} />
      </button>
    </div>
  );
};

export default PropertyCard;
