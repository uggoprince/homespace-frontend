import {
  FaHeart, FaRegHeart,
  FaShareAlt,
} from 'react-icons/fa';
import Image from 'next/image';
import { Property } from '@/types/property';
import { ChevronLeft, ChevronRight, MapPin} from 'lucide-react';

const capitalizeFirstLetter = (string: string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const KeyStatsItem = ({ label, value }: { label: string; value: string | number | null }) => (
  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 text-center">
    <div className="text-2xl font-bold text-slate-900 dark:text-white">
      {value || '-'}
    </div>
    <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">{label}</div>
  </div>
);

const PropsDetailsItem = ({ label, value }: { label: string; value: string | number | null }) => (
  <div className="flex items-center justify-between">
    <span className="text-slate-500 dark:text-slate-400 text-sm">{label}</span>
    <span className="text-slate-900 dark:text-white font-medium text-right">
      {value || '-'}
    </span>
  </div>
);

interface PropertyLeftColumnProps {
  property: Property;
  photos: { photo: string }[];
  currentImage: number;
  numberOfPhotos: number;
  isSaved: boolean;
  showShareMenu: boolean;
  toggleGallery: () => void;
  toggleSaved: () => void;
  toggleShareMenu: () => void;
  prevImage: () => void;
  nextImage: () => void;
  setCurrentImage: (index: number) => void;
  formatPrice: (price: number, country?: string, currency?: string) => string;
  canViewLargeImage?: boolean;
}

const PropertyLeftColumn = ({
  property, photos, currentImage, numberOfPhotos, isSaved, showShareMenu,
  toggleGallery, toggleSaved, toggleShareMenu, prevImage, nextImage,
  setCurrentImage, formatPrice,
  canViewLargeImage = true,
}: PropertyLeftColumnProps) => (
  <div className="lg:col-span-2 space-y-4 lg:space-y-6">
    {/* Image Gallery */}
    <div
      className="bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl
      overflow-hidden border-[0.5px] border-slate-200 dark:border-slate-800/50
      shadow-xl dark:shadow-2xl dark:shadow-violet-500/5"
    >
      <div className="relative aspect-16/10 bg-slate-100 dark:bg-slate-800">
        {photos.length > 0 ? (
          <button
            type="button"
            onClick={toggleGallery}
            className="w-full h-full border-none p-0 bg-transparent cursor-pointer"
            aria-label="Open fullscreen gallery"
          >
            <Image
              src={photos[currentImage]?.photo}
              alt={property.title}
              fill
              className="w-full h-full object-cover"
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </button>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-slate-400">No images available</span>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-5 left-6">
          <span
            className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
              property.intent === 'rent'
                ? 'bg-blue-500 text-white'
                : 'bg-emerald-500 text-white'
            }`}
          >
            For
            {' '}
            {capitalizeFirstLetter(property.intent)}
          </span>
        </div>

        {/* Image Counter */}
        {numberOfPhotos > 0 && (
          <div
            className="absolute top-5 right-20 bg-black/60 backdrop-blur-sm
            text-white text-sm px-3 py-1.5 rounded-full"
          >
            {currentImage + 1}
            {' / '}
            {numberOfPhotos}
          </div>
        )}

        {/* Save Button */}
        <button
          type="button"
          onClick={toggleSaved}
          className={`absolute top-5 right-5 sm:right-6 w-10 h-10 backdrop-blur-sm rounded-full
          flex items-center justify-center shadow-lg transition-colors border-none
          ${isSaved
    ? 'bg-red-500 text-white'
    : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700'
  }`}
          aria-label={isSaved ? 'Remove from saved' : 'Save property'}
        >
          {isSaved ? <FaHeart className="w-5 h-5" /> : <FaRegHeart className="w-5 h-5" />}
        </button>

        {/* Navigation Arrows */}
        {numberOfPhotos > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10
              bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full
              flex items-center justify-center text-slate-700 dark:text-white
              hover:bg-white dark:hover:bg-slate-700 shadow-lg transition-all border-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-5 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10
              bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full
              flex items-center justify-center text-slate-700 dark:text-white
              hover:bg-white dark:hover:bg-slate-700 shadow-lg transition-all border-none"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {numberOfPhotos > 0 && canViewLargeImage && (
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60
            backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full opacity-70 cursor-pointer"
          >
            Click image to expand
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {numberOfPhotos > 1 && (
        <div className="p-5 sm:p-6 flex gap-2 overflow-x-auto">
          {photos.map((photo, index) => (
            <button
              type="button"
              key={photo.photo}
              onClick={() => setCurrentImage(index)}
              aria-label={`View thumbnail ${index + 1}`}
              className={`relative shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2
              transition-all ${
            index === currentImage
              ? 'border-indigo-600 ring-2 ring-indigo-600/20'
              : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'
            }`}
            >
              <Image
                src={photo.photo}
                alt=""
                fill
                className="w-full h-full object-cover"
                sizes="80px"
                style={{ objectFit: 'cover' }}
                priority={index === 0}
              />
            </button>
          ))}
        </div>
      )}
    </div>

    {/* Property Info */}
    <div
      className="bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl
      border border-slate-200 dark:border-slate-800/50 p-5 sm:p-6
      shadow-xl dark:shadow-2xl dark:shadow-violet-500/5"
    >
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div>
          <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
            {property.propertyType}
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {capitalizeFirstLetter(property.title)}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSaved}
            className={`w-10 h-10 flex items-center justify-center rounded-full border
            transition-all ${
  isSaved
    ? 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-500'
    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-red-500'
  }`}
          >
            {isSaved
              ? <FaHeart className="w-5 h-5" />
              : <FaRegHeart className="w-5 h-5" />}
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={toggleShareMenu}
              className="w-10 h-10 flex items-center justify-center rounded-full
              bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700
              text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors"
            >
              <FaShareAlt className="w-5 h-5" />
            </button>
            {showShareMenu && (
              <div
                className="absolute right-0 top-12 bg-white dark:bg-slate-800 rounded-xl
                shadow-xl border border-slate-200 dark:border-slate-700 p-2 min-w-37.5 z-10"
              >
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(globalThis.location.href);
                    toggleShareMenu();
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700
                  dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                >
                  Copy Link
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(globalThis.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-left px-3 py-2 text-sm text-slate-700
                  dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                >
                  Share on WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-end gap-2 text-slate-500 dark:text-slate-400 mb-5">
        <MapPin className="w-5 h-5 text-red-500 shrink-0 mb-0.5" />
        <span className="text-sm">
          {property.address}
          {property.state && `, ${property.state}`}
          {property.country && `, ${property.country}`}
        </span>
      </div>

      {/* Price */}
      <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          {formatPrice(property.price, property.country, property.currency)}
          {property.intent === 'rent' && (() => {
            let paymentPeriodLabel = '';
            if (property.rentPaymentPeriod) {
              paymentPeriodLabel = ` / ${property.rentPaymentPeriod === "yearly" ? "year" : "month"}`;
            }
            return (
              <span className="text-lg font-normal text-slate-500 dark:text-slate-400">
                {paymentPeriodLabel}
              </span>
            );
          })()}
        </div>
        {/* <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
          Property ID:
          {' '}
          {property.id}
        </p> */}
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <KeyStatsItem label="Bedrooms" value={property.bedRooms} />
        <KeyStatsItem label="Bathrooms" value={property.bathRooms} />
        <KeyStatsItem label="Area (sqm)" value={property.area} />
        <KeyStatsItem label="Units" value={property.units} />
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <PropsDetailsItem label="Property Type" value={property.propertyType} />
        <PropsDetailsItem label="Status" value={property.status} />
        <PropsDetailsItem label="State" value={property.state} />
        <PropsDetailsItem label="Country" value={property.country} />
      </div>

      {/* Description */}
      {property.description && (
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
            Description
          </h2>
          <div
            className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed
            whitespace-pre-line"
          >
            {property.description}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default PropertyLeftColumn;
