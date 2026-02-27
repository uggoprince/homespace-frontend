'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  X, ChevronLeft, ChevronRight, Heart, MapPin, Users, Phone,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import countryToCurrency from 'country-to-currency';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Property } from '@/types/property';
import { countryNameToCode } from '@/Utils/constants';
import { usePropertyDetailsStore } from '@/stores/propertyDetailsStore';

const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const formatPrice = (price: number, country: string, currency?: string) => {
  const code = country as keyof typeof countryNameToCode;
  const currencyCode = currency || countryToCurrency[countryNameToCode[code] as keyof typeof countryToCurrency];
  if (currencyCode) {
    return price?.toLocaleString(countryNameToCode[code], { style: 'currency', currency: currencyCode });
  }
  return price?.toLocaleString();
};

const PropertyDetailsSideView = ({ property }: { property: Property }) => {
  const clearSelectedProperty = usePropertyDetailsStore((s) => s.clearSelectedProperty);
  const {
    agency, address, state, country, propertyType, intent, price, photos, currency, description,
    title, area, bedRooms, bathRooms,
  } = property;

  const [currentImage, setCurrentImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const numberOfPhotos = photos?.length || 0;
  const currentPhoto = photos?.[currentImage]?.photo || '';

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % numberOfPhotos);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + numberOfPhotos) % numberOfPhotos);

  const theIntent = capitalizeFirstLetter(intent);
  const formattedPrice = formatPrice(price, country, currency);

  return (
    <div className="w-full max-w-md mx-auto pb-56">
      {/* Image Carousel */}
      <div className="relative">
        <Image
          src={currentPhoto}
          alt={title}
          className="w-full aspect-4/3 object-cover"
          width={800}
          height={600}
          priority
          style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
        />

        {/* Close button */}
        <button
          type="button"
          onClick={clearSelectedProperty}
          className="absolute top-3 left-3 w-9 h-9 bg-white/90 dark:bg-gray-800/90
          backdrop-blur-sm rounded-full flex items-center justify-center
          text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800
          shadow-md transition-colors border-none cursor-pointer"
          aria-label="Close property details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image counter */}
        {numberOfPhotos > 0 && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-200 text-sm font-medium px-3 py-1 rounded-full shadow-md">
            {currentImage + 1} / {numberOfPhotos}
          </div>
        )}

        {/* Navigation arrows */}
        {numberOfPhotos > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              className="absolute top-1/2 -translate-y-1/2 left-3 w-9 h-9
              bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full
              flex items-center justify-center text-gray-700 dark:text-gray-200
              hover:bg-white dark:hover:bg-gray-800 shadow-md transition-colors border-none cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="absolute top-1/2 -translate-y-1/2 right-3 w-9 h-9
              bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full
              flex items-center justify-center text-gray-700 dark:text-gray-200
              hover:bg-white dark:hover:bg-gray-800 shadow-md transition-colors border-none cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Save button */}
        <button
          type="button"
          onClick={() => setIsSaved(!isSaved)}
          className={`absolute top-3 right-3 w-9 h-9 backdrop-blur-sm rounded-full
          flex items-center justify-center shadow-md transition-colors border-none cursor-pointer
          ${isSaved ? 'bg-red-500 text-white' : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800'}`}
          aria-label={isSaved ? 'Remove from saved' : 'Save property'}
        >
          <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Agency */}
        {agency && (
          <Link
            href={`/agencies/${agency.username}`}
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mb-2"
          >
            <Users className="w-4 h-4" />
            {agency.name}
          </Link>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          {capitalizeFirstLetter(title)}
        </h2>

        {/* Location */}
        <div className="flex items-start gap-2 text-gray-500 dark:text-gray-400 text-sm mb-4">
          <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <span>{address}, {state}, {country}</span>
        </div>

        {/* Description */}
        {description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
            {description}
          </p>
        )}

        {/* Price & Status */}
        <div className="flex items-center justify-between mb-5 pb-5 border-b border-gray-200 dark:border-gray-700">
          <div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              {formattedPrice}
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">{propertyType}</div>
          </div>
          <span
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              intent === 'rent'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
            }`}
          >
            For {theIntent}
          </span>
        </div>

        {/* Property Details Grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Bedrooms</span>
            <span className="text-gray-900 dark:text-white font-medium">{bedRooms || '—'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Area</span>
            <span className="text-gray-900 dark:text-white font-medium">{area ? `${area} sqm` : '—'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Bathrooms</span>
            <span className="text-gray-900 dark:text-white font-medium">{bathRooms || '—'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Type</span>
            <span className="text-gray-900 dark:text-white font-medium">{propertyType}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href={`/properties/${property.propertyCode}`}
            className={cn(buttonVariants(), 'w-full')}
          >
            View Full Details
          </Link>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={agency?.phoneNumber ? `tel:${agency.phoneNumber}` : undefined}
              className={agency?.phoneNumber ? 'pointer-events-none opacity-50' : ''}
            >
              <Button
                className="w-full bg-primary hover:bg-indigo-700 text-white"
                disabled={!agency?.phoneNumber}
              >
                <Phone className="w-4 h-4" />
                Call
              </Button>
            </a>
            <a
              href={agency?.phoneNumber ? `https://wa.me/${agency.phoneNumber.replaceAll(/\D/g, '')}` : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={agency?.phoneNumber ? 'pointer-events-none opacity-50' : ''}
            >
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={!agency?.phoneNumber}
              >
                <FaWhatsapp className="w-4 h-4" />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsSideView;
