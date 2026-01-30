/* eslint-disable react/jsx-one-expression-per-line */
import { useState } from 'react';
import {
  FaUsers, FaMapMarkerAlt, FaTimes, FaChevronLeft, FaChevronRight, FaHeart,
  FaRegHeart, FaPhone, FaWhatsapp,
} from 'react-icons/fa';
import countryToCurrency from 'country-to-currency';
import { closeCardDetails } from '../../Utils/EventHandlers';
import { countryNameToCode } from '../../Utils/constants';
import isEmptyString from '../../Utils/Checkers';
import Link from '../Link';
import { CustomLink } from '../Link/CustomLink';

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const PropertyDetailsSideView = (props) => {
  const { property, number } = props;
  const {
    agency, address, state, country, propertyType, intent, price, photos, currency, description,
  } = property;
  let {
    title, area, bedRooms, bathRooms,
  } = property;

  const [currentImage, setCurrentImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  area = (!isEmptyString(area)) ? `${area}` : null;
  bedRooms = (!isEmptyString(bedRooms) ? bedRooms : null);
  bathRooms = (!isEmptyString(bathRooms) ? bathRooms : null);
  title = capitalizeFirstLetter(title);

  const numberOfPhotos = photos?.length || 0;
  const currentPhoto = photos?.[currentImage]?.photo || '';

  const formatPrice = (priceValue, countryName, curr) => {
    const currencyCode = curr || countryToCurrency[countryName];
    if (currencyCode) {
      return priceValue?.toLocaleString(
        countryNameToCode[countryName], { style: 'currency', currency: currencyCode },
      );
    }
    return priceValue?.toLocaleString();
  };

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % numberOfPhotos);
  const prevImage = () => setCurrentImage((prev) => (
    (prev - 1 + numberOfPhotos) % numberOfPhotos
  ));

  const theIntent = capitalizeFirstLetter(intent);
  const formattedPrice = formatPrice(price, country, currency);

  return (
    <div
      id="propertyDiv"
      className="w-full max-w-md mx-auto bg-white dark:bg-darkMode
      border-l-0 border-gray-200 dark:border-gray-700 overflow-y-auto shadow-xl
      pb-56"
    >
      {/* Image Carousel */}
      <div className="relative">
        <img
          src={currentPhoto}
          alt={title}
          className="w-full aspect-[4/3] object-cover"
        />

        {/* Close button */}
        <button
          type="button"
          onClick={(e) => { closeCardDetails(e, number); }}
          className="absolute top-3 left-3 w-9 h-9 bg-white/90 dark:bg-gray-800/90
          backdrop-blur-sm rounded-full flex items-center justify-center
          text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800
          shadow-md transition-colors border-none
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
          aria-label="Close property details"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        {/* Image counter */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 bg-white/90
          dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-200
          text-sm font-medium px-3 py-1 rounded-full shadow-md"
        >
          {currentImage + 1} / {numberOfPhotos}
        </div>

        {/* Navigation arrows */}
        <button
          type="button"
          onClick={prevImage}
          className="absolute top-1/2 -translate-y-1/2 left-3 w-9 h-9
          bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full
          flex items-center justify-center text-gray-700 dark:text-gray-200
          hover:bg-white dark:hover:bg-gray-800 shadow-md transition-colors border-none
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
          aria-label="Previous photo"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={nextImage}
          className="absolute top-1/2 -translate-y-1/2 right-3 w-9 h-9
          bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full
          flex items-center justify-center text-gray-700 dark:text-gray-200
          hover:bg-white dark:hover:bg-gray-800 shadow-md transition-colors border-none
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
          aria-label="Next photo"
        >
          <FaChevronRight className="w-5 h-5" />
        </button>

        {/* Save button */}
        <button
          type="button"
          onClick={() => setIsSaved(!isSaved)}
          className={`absolute top-3 right-3 w-9 h-9 backdrop-blur-sm rounded-full
          flex items-center justify-center shadow-md transition-colors border-none
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500
          ${isSaved ? 'bg-red-500 text-white' : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800'}`}
          aria-label={isSaved ? 'Remove from saved' : 'Save property'}
        >
          {isSaved ? <FaHeart className="w-5 h-5" /> : <FaRegHeart className="w-5 h-5" />}
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Agent */}
        <Link
          to={`/agencies/${agency.username}`}
          variant="link"
          size="sm"
          icon={FaUsers}
          iconPosition="left"
          className="mb-0 px-0"
        >
          {agency.name}
        </Link>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h2>

        {/* Location */}
        <div className="flex items-start gap-2 text-gray-500 dark:text-gray-400 text-sm mb-4">
          <FaMapMarkerAlt className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <span>{address}, {state}, {country}</span>
        </div>

        {/* Description */}
        {description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
            {description}
          </p>
        )}

        {/* Price & Status */}
        <div
          className="flex items-center justify-between mb-5 pb-5
          border-b border-gray-200 dark:border-gray-700"
        >
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
            <span className="text-gray-900 dark:text-white font-medium">
              {bedRooms || '—'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Area</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {area ? `${area} sqm` : '—'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Bathrooms</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {bathRooms || '—'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Type</span>
            <span className="text-gray-900 dark:text-white font-medium">{propertyType}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <CustomLink
            to={`/properties/${property.id}`}
            className="hover:bg-blue-700"
          >
            View Full Details
          </CustomLink>
          <div className="grid grid-cols-2 gap-3">
            <CustomLink
              href={`tel:${agency.phone}`}
              variant="secondary"
              icon={FaPhone}
              iconPosition="left"
              external
              className="text-white hover:bg-blue-700
              bg-indigo-600 dark:bg-indigo-600 disabled:hover:bg-indigo-600"
              disabled={!agency.phone}
            >
              Call
            </CustomLink>
            <CustomLink
              href={`https://wa.me/${agency.phone?.replace(/\D/g, '')}`}
              variant="secondary"
              size="md"
              icon={FaWhatsapp}
              iconPosition="left"
              external
              className={`text-white bg-green-600 hover:bg-green-700 dark:bg-green-600 ${!agency.phone ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!agency.phone}
            >
              WhatsApp
            </CustomLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsSideView;
