import PropTypes from 'prop-types';
import { LuHouse, LuRotateCcw } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { CustomLink } from '../../components/Link/CustomLink';
import { CustomButton } from '../../components/Button/CustomButton';

const NotFoundContent = ({ type = 'page', onRetry }) => {
  const messages = {
    page: {
      title: 'Page not found',
      description: "Sorry, the page you're looking for doesn't exist or has been moved.",
    },
    property: {
      title: 'Property not found',
      description: 'This property may have been removed or is no longer available.',
    },
    agency: {
      title: 'Agency not found',
      description: "This agency profile doesn't exist or may have been removed.",
    },
  };

  const { title, description } = messages[type] || messages.page;

  return (
    <main className="flex-1 flex items-center justify-center py-24">
      <div className="text-center max-w-md">
        {/* 404 Illustration */}
        <div className="mb-8">
          <svg
            className="w-48 h-48 mx-auto text-gray-300 dark:text-slate-700"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* House outline */}
            <path
              d="M100 30L30 80V170H170V80L100 30Z"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Roof */}
            <path
              d="M20 85L100 25L180 85"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Door */}
            <rect
              x="80"
              y="110"
              width="40"
              height="60"
              stroke="currentColor"
              strokeWidth="4"
              rx="2"
            />
            {/* Window left */}
            <rect
              x="45"
              y="100"
              width="25"
              height="25"
              stroke="currentColor"
              strokeWidth="4"
              rx="2"
            />
            {/* Window right */}
            <rect
              x="130"
              y="100"
              width="25"
              height="25"
              stroke="currentColor"
              strokeWidth="4"
              rx="2"
            />
            {/* Question mark */}
            <text
              x="100"
              y="95"
              textAnchor="middle"
              fontSize="40"
              fontWeight="bold"
              className="fill-indigo-400 dark:fill-indigo-500"
            >
              ?
            </text>
          </svg>
        </div>

        {/* 404 Text */}
        <h1 className="text-6xl sm:text-7xl font-bold text-indigo-600 dark:text-indigo-500 mb-4">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
          {title}
        </h2>

        <p className="text-gray-500 dark:text-slate-400 mb-8">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {type === 'page' && (
          <CustomLink
            to="/"
            className="w-full sm:w-auto"
            icon={LuHouse}
          >
            Go to Homepage
          </CustomLink>
          )}
          {type !== 'page' && onRetry && (
          <CustomButton
            className="w-full sm:w-auto"
            onClick={onRetry}
            icon={LuRotateCcw}
          >
            Retry
          </CustomButton>
          )}
          <CustomButton
            type="button"
            variant="secondary"
            size="md"
            onClick={() => globalThis.history.back()}
            className="w-full sm:w-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </CustomButton>
        </div>

        {/* Helpful Links */}
        {/* <div className="mt-10 pt-8 border-t border-gray-200 dark:border-slate-800">
          <p className="text-sm text-gray-500 dark:text-slate-500 mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <a
              href="/properties"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Browse Properties
            </a>
            <span className="text-gray-300 dark:text-slate-700">•</span>
            <a
              href="/agencies"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Find Agencies
            </a>
            <span className="text-gray-300 dark:text-slate-700">•</span>
            <a
              href="/contact"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Contact Us
            </a>
          </div>
        </div> */}
      </div>
    </main>
  );
};

NotFoundContent.propTypes = {
  type: PropTypes.oneOf(['page', 'property', 'agency']),
};

NotFoundContent.defaultProps = {
  type: 'page',
};

export default NotFoundContent;
