'use client';

import Link from 'next/link';
import { Home, RotateCcw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotFoundContentProps {
  type?: 'page' | 'property' | 'agency';
  onRetry?: () => void;
}

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

const NotFoundContent = ({ type = 'page', onRetry }: NotFoundContentProps) => {
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
            <path
              d="M100 30L30 80V170H170V80L100 30Z"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 85L100 25L180 85"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="80" y="110" width="40" height="60"
              stroke="currentColor" strokeWidth="4" rx="2"
            />
            <rect
              x="45" y="100" width="25" height="25"
              stroke="currentColor" strokeWidth="4" rx="2"
            />
            <rect
              x="130" y="100" width="25" height="25"
              stroke="currentColor" strokeWidth="4" rx="2"
            />
            <text
              x="100" y="95" textAnchor="middle"
              fontSize="40" fontWeight="bold"
              className="fill-indigo-400 dark:fill-indigo-500"
            >
              ?
            </text>
          </svg>
        </div>

        <h1 className="text-6xl sm:text-7xl font-bold text-indigo-600 dark:text-indigo-500 mb-4">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
          {title}
        </h2>

        <p className="text-gray-500 dark:text-slate-400 mb-8">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {type === 'page' && (
            <Button asChild>
              <Link href="/">
                <Home className="w-5 h-5" />
                Go to Homepage
              </Link>
            </Button>
          )}
          {type !== 'page' && onRetry && (
            <Button onClick={onRetry}>
              <RotateCcw className="w-5 h-5" />
              Retry
            </Button>
          )}
          <Button
            variant="secondary"
            onClick={() => globalThis.history.back()}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFoundContent;
