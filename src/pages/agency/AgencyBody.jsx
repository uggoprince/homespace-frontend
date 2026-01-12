import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FaArrowLeft, FaFacebook, FaWhatsapp, FaTwitter, FaInstagram, FaStar, FaMapMarkerAlt,
} from 'react-icons/fa';
import { LuMail, LuPhone } from 'react-icons/lu';
import { queryApi } from '../../Utils/Api';
import { GET_AGENCY } from '../../data/agency/queryString';
import ErrorHandler from '../../data/errorHandler';
import Link from '../../components/Link';

const DisabledContactButton = ({ icon: Icon, label }) => (
  <button
    type="button"
    disabled
    className="inline-flex items-center gap-2 bg-slate-300
    dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-5 py-2.5
    rounded-xl font-medium cursor-not-allowed opacity-50"
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </button>
);

const Agency = () => {
  const [state, setState] = useState({
    agency: null,
    activeTab: 'properties',
  });
  const navigate = useNavigate();
  const { username } = useParams();
  const { loading, error, data } = queryApi(GET_AGENCY, { username }, false);
  const { agency, activeTab } = state;

  useEffect(() => {
    if (data?.getAgencyByUsername) setState({ ...state, agency: data?.getAgencyByUsername });
  }, [data]);

  const formatPhone = (phone) => {
    if (!phone) return '';
    return phone.replace(/(\+\d{3})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4');
  };

  const setActiveTab = (tab) => {
    setState({ ...state, activeTab: tab });
  };

  return (
    <div className="w-full min-h-screen bg-app-gradient dark:text-white">
      {loading && (
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-32 mb-8" />
            <div className="bg-slate-200 dark:bg-slate-800 rounded-2xl h-64 mb-8" />
          </div>
        </div>
      )}

      {error && <ErrorHandler error={error} />}

      {agency && !error && !loading && (
        <main className="max-w-6xl mx-auto px-6 py-8 pt-24">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 group"
          >
            <FaArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to agencies</span>
          </button>

          {/* Agency Header Card */}
          <div
            className="bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border
            border-slate-200 dark:border-slate-800/50 p-8 mb-8 shadow-xl
            dark:shadow-2xl dark:shadow-violet-500/5"
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Logo */}
              <div className="flex-shrink-0 flex-1">
                <div className="w-full h-80 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 ring-4 ring-slate-200 dark:ring-slate-700/50 shadow-lg">
                  <img
                    src={agency.banner}
                    alt={agency.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold tracking-tight">{agency.name}</h1>
                      <span
                        className="inline-flex items-center gap-1 bg-emerald-500/20
                        text-emerald-600 dark:text-emerald-400 px-2.5 py-1
                        rounded-full text-xs font-medium"
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Verified
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 mb-4">
                      <div className="flex items-center gap-1.5">
                        <FaStar className="text-amber-500" />
                        <span className="font-semibold text-slate-900 dark:text-white">4.8</span>
                        <span>(24 reviews)</span>
                      </div>
                      <span className="text-slate-400 dark:text-slate-600">•</span>
                      <span>
                        @
                        {agency.username}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <FaMapMarkerAlt className="text-slate-500" />
                      <span>
                        {agency.address}
                        ,
                        {' '}
                        {agency.state}
                        ,
                        {' '}
                        {agency.country}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {agency.phoneNumber ? (
                    <Link
                      href={`tel:${agency.phoneNumber}`}
                      variant="primary"
                      size="md"
                      icon={LuPhone}
                      iconPosition="left"
                      external
                      className="rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25
                      transition-all"
                    >
                      {formatPhone(agency.phoneNumber)}
                    </Link>
                  ) : (
                    <DisabledContactButton
                      icon={LuPhone}
                      label="Phone"
                    />
                  )}
                  {agency.email ? (
                    <Link
                      href={`mailto:${agency.email}`}
                      variant="secondary"
                      size="md"
                      icon={LuMail}
                      iconPosition="left"
                      external
                      className="rounded-lg hover:scale-105 transition-all border border-slate-300
                      dark:border-slate-700"
                      iconClassName="w-4 h-4"
                    >
                      Email
                    </Link>
                  ) : (
                    <DisabledContactButton
                      icon={LuMail}
                      label="Email"
                    />
                  )}
                  {agency.whatsapp ? (
                    <Link
                      href={`https://wa.me/${agency.whatsapp}`}
                      variant="secondary"
                      size="md"
                      icon={FaWhatsapp}
                      iconPosition="left"
                      external
                      className="bg-green-600 hover:bg-green-500 text-white
                      hover:scale-105 transition-all"
                    >
                      WhatsApp
                    </Link>
                  ) : (
                    <DisabledContactButton
                      icon={FaWhatsapp}
                      label="WhatsApp"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 bg-slate-200/50 dark:bg-slate-900/50 p-1.5 rounded-xl w-fit">
            {['properties', 'about', 'reviews'].map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg font-medium capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-primary text-white shadow-lg shadow-primary2/25'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/50 dark:hover:bg-slate-800/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'about' && (
            <div className="bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800/50 p-8 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                About
                {' '}
                {agency.name}
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">{agency.about}</p>

              {/* Social Links */}
              {(agency.facebook || agency.instagram || agency.twitter) && (
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                  <h3 className="text-lg font-semibold mb-4">Connect with us</h3>
                  <div className="flex items-center gap-3">
                    {agency.facebook && (
                      <a
                        href={agency.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <FaFacebook className="w-5 h-5" />
                      </a>
                    )}
                    {agency.instagram && (
                      <a
                        href={agency.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                      >
                        <FaInstagram className="w-5 h-5" />
                      </a>
                    )}
                    {agency.twitter && (
                      <a
                        href={agency.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                      >
                        <FaTwitter className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'properties' && (
            <div className="bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800/50 p-8 shadow-lg">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">No properties listed yet</h3>
                <p className="text-slate-600 dark:text-slate-400">This agency has not listed any properties</p>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800/50 p-8 shadow-lg">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574
                      3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
                <p className="text-slate-600 dark:text-slate-400">Be the first to review this agency</p>
                <button
                  type="button"
                  className="mt-4 bg-primary hover:bg-primary2 text-white px-6
                  py-2.5 rounded-lg font-medium transition-all hover:scale-105"
                >
                  Write a Review
                </button>
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );
};

export default Agency;
