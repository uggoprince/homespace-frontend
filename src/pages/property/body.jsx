import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FaArrowLeft, FaWhatsapp, FaUsers,
} from 'react-icons/fa';
import { LuMail, LuPhone, LuCalendar } from 'react-icons/lu';
import countryToCurrency from 'country-to-currency';
import { queryApi } from '../../Utils/Api';
import { GET_PROPERTY_DETAILS } from '../../data/property/queryString';
import { countryNameToCode } from '../../Utils/constants';
import ErrorHandler from '../../data/errorHandler';
import Link from '../../components/Link';
import { BodySkeleton } from './skeleton';
import FullscreenGallery from './FullscreenGallery';
import PropertyLeftColumn from './PropertyLeftColumn';

const PropertyBody = () => {
  const [state, setState] = useState({
    property: null,
    currentImage: 0,
    isSaved: false,
    showShareMenu: false,
    showGallery: false,
  });

  const navigate = useNavigate();
  const { propertyId } = useParams();
  const {
    loading, error, data, refetch,
  } = queryApi(GET_PROPERTY_DETAILS, { id: propertyId }, false, { fetchPolicy: 'no-cache' });
  const {
    property, currentImage, isSaved, showShareMenu, showGallery,
  } = state;

  useEffect(() => {
    if (data?.getProperty) setState((prev) => ({ ...prev, property: data.getProperty }));
  }, [data]);

  const formatPrice = (priceValue, countryName, curr) => {
    const currencyCode = curr || countryToCurrency[countryName];
    if (currencyCode) {
      return priceValue?.toLocaleString(
        countryNameToCode[countryName],
        { style: 'currency', currency: currencyCode },
      );
    }
    return priceValue?.toLocaleString();
  };

  const formatPhone = (phone) => {
    if (!phone) return '';
    return phone.replace(/(\+\d{3})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4');
  };

  const photos = property?.photos || [];
  const numberOfPhotos = photos.length;

  const nextImage = () => setState((prev) => ({
    ...prev,
    currentImage: (prev.currentImage + 1) % numberOfPhotos,
  }));

  const prevImage = () => setState((prev) => ({
    ...prev,
    currentImage: (prev.currentImage - 1 + numberOfPhotos) % numberOfPhotos,
  }));

  const setCurrentImage = (index) => setState((prev) => ({ ...prev, currentImage: index }));
  const toggleSaved = () => setState((prev) => ({ ...prev, isSaved: !prev.isSaved }));
  const toggleShareMenu = () => setState((prev) => ({ ...prev, showShareMenu: !prev.showShareMenu }));
  const toggleGallery = () => setState((prev) => ({ ...prev, showGallery: !prev.showGallery }));

  const DisabledContactButton = ({ icon: Icon, label }) => (
    <span
      className="w-full flex items-center justify-center gap-2 bg-slate-300
      dark:bg-slate-700 text-slate-500 dark:text-slate-400 py-3 px-4
      rounded-xl font-medium cursor-not-allowed opacity-50"
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </span>
  );

  return (
    <div className="container w-full min-h-screen dark:text-white">
      {/* Loading State */}
      {loading && (
        <BodySkeleton />
      )}

      {/* Error State */}
      {error && <ErrorHandler error={error} onRetry={refetch} />}

      {/* Property Content */}
      {property && !error && !loading && (
        <main className="max-w-7xl mx-auto py-6 pt-24">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400
            hover:text-slate-900 dark:hover:text-white transition-colors mb-6 group"
          >
            <FaArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to properties</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column */}
            <PropertyLeftColumn
              property={property}
              photos={photos}
              currentImage={currentImage}
              numberOfPhotos={numberOfPhotos}
              isSaved={isSaved}
              showShareMenu={showShareMenu}
              toggleGallery={toggleGallery}
              toggleSaved={toggleSaved}
              toggleShareMenu={toggleShareMenu}
              prevImage={prevImage}
              nextImage={nextImage}
              setCurrentImage={setCurrentImage}
              formatPrice={formatPrice}
            />

            {/* Right Column - Agent Card */}
            <div className="space-y-6">
              <div className="lg:sticky lg:top-24">
                <div
                  className="bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl
                  border border-slate-200 dark:border-slate-800/50 p-5 sm:p-6
                  shadow-xl dark:shadow-2xl dark:shadow-violet-500/5"
                >
                  {/* <h3 className="text-sm font-medium text-slate-500 dark:text-slate-500 mb-4">
                    Listed by
                  </h3> */}

                  {/* Agency Info */}
                  {property.agency && (
                    <div className="flex items-center gap-4 mb-5 pb-5 border-b border-slate-100 dark:border-slate-800">
                      <div
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500
                        to-purple-500 flex items-center justify-center text-white text-xl
                        font-bold flex-shrink-0"
                      >
                        {property.agency.name?.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link
                          to={`/agencies/${property.agency.username}`}
                          variant="link"
                          size="sm"
                          className="font-semibold text-slate-900 dark:text-white truncate
                          block px-0 hover:text-indigo-600 dark:hover:text-indigo-400"
                        >
                          {property.agency.name}
                        </Link>
                        <p className="text-sm text-slate-500 dark:text-slate-500 truncate">
                          @
                          {property.agency.username}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Contact Buttons */}
                  <div className="space-y-3">
                    {property.agency?.phone ? (
                      <Link
                        href={`tel:${property.agency.phone}`}
                        variant="primary"
                        size="md"
                        icon={LuPhone}
                        iconPosition="left"
                        external
                        className="w-full rounded-xl hover:scale-[1.02] hover:shadow-lg
                        hover:shadow-indigo-500/25 transition-all"
                      >
                        {formatPhone(property.agency.phone)}
                      </Link>
                    ) : (
                      <DisabledContactButton icon={LuPhone} label="Phone not available" />
                    )}

                    {property.agency?.phone ? (
                      <Link
                        href={`https://wa.me/${property.agency.phone?.replace(/\D/g, '')}`}
                        variant="secondary"
                        size="md"
                        icon={FaWhatsapp}
                        iconPosition="left"
                        external
                        className="w-full rounded-xl bg-green-600 hover:bg-green-500 text-white
                        hover:scale-[1.02] transition-all"
                      >
                        WhatsApp
                      </Link>
                    ) : (
                      <DisabledContactButton icon={FaWhatsapp} label="WhatsApp not available" />
                    )}

                    {property.agency?.email ? (
                      <Link
                        href={`mailto:${property.agency.email}`}
                        variant="secondary"
                        size="md"
                        icon={LuMail}
                        iconPosition="left"
                        external
                        className="w-full rounded-xl hover:scale-[1.02] transition-all"
                      >
                        Send Email
                      </Link>
                    ) : (
                      <DisabledContactButton icon={LuMail} label="Email not available" />
                    )}
                  </div>

                  {/* View Agency */}
                  {property.agency && (
                    <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
                      <Link
                        to={`/agencies/${property.agency.username}`}
                        variant="ghost"
                        size="md"
                        icon={FaUsers}
                        iconPosition="left"
                        className="w-full rounded-xl border-2 border-indigo-600 text-indigo-600
                        dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                      >
                        View Agency Profile
                      </Link>
                    </div>
                  )}
                </div>

                {/* Safety Tips */}
                <div
                  className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200
                  dark:border-amber-800/50 rounded-xl p-4 mt-4"
                >
                  <h4 className="font-medium text-amber-800 dark:text-amber-400 text-sm mb-2">
                    Safety Tips
                  </h4>
                  <ul className="text-xs text-amber-700 dark:text-amber-500 space-y-1">
                    <li>• Verify property documents before payment</li>
                    <li>• Meet agents in safe, public locations</li>
                    <li>• Never pay in advance without viewing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Fullscreen Gallery Modal */}
      {showGallery && (
        <FullscreenGallery
          photos={photos}
          currentImage={currentImage}
          numberOfPhotos={numberOfPhotos}
          prevImage={prevImage}
          nextImage={nextImage}
          onClose={toggleGallery}
        />
      )}
    </div>
  );
};

export default PropertyBody;
