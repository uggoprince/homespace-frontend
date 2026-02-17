'use client';

import { useEffect } from 'react';
import { ApolloError } from '@apollo/client';
import { AlertTriangle, RotateCcw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/AuthProvider';
import NotFoundContent from '@/app/not-found-content';

const ErrorDisplay = ({ message, onRetry, showBackButton }: { message: string; onRetry?: () => void; showBackButton?: boolean }) => (
  <main className="flex-1 flex items-center justify-center py-24">
    <div className="text-center max-w-md">
      <div className="mb-8">
        <AlertTriangle className="w-24 h-24 mx-auto text-red-300 dark:text-red-800" strokeWidth={1.5} />
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
        Something went wrong
      </h2>

      <p className="text-gray-500 dark:text-slate-400 mb-8">
        {message}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button onClick={onRetry || (() => globalThis.location.reload())} className='cursor-pointer'>
          <RotateCcw className="w-5 h-5" />
          Try Again
        </Button>
        {showBackButton && (
          <Button
            variant="secondary"
            onClick={() => globalThis.history.back()}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Button>
        )}
      </div>
    </div>
  </main>
);

interface ErrorHandlerProps {
  error: ApolloError;
  onRetry?: () => void;
  retrying?: boolean;
  type?: 'page' | 'property' | 'agency';
  showBackButton?: boolean;
}

const ErrorHandler = ({ error, onRetry, type, showBackButton = true, retrying = false }: ErrorHandlerProps) => {
  const auth = useAuth();

  const { graphQLErrors, networkError } = error;
  const graphQLError = graphQLErrors?.[0];
  const code = (graphQLError?.extensions?.code || (graphQLError as unknown as Record<string, unknown>)?.code) as string | undefined;
  const isUnauthenticated =
    code === 'UNAUTHENTICATED' ||
    ('statusCode' in (networkError || {}) &&
      (networkError as { statusCode: number })?.statusCode === 401);

  useEffect(() => {
    if (code === 'FORBIDDEN' && graphQLError?.message === 'Not authenticated as user.') {
      auth?.logout();
    } else if (isUnauthenticated) {
      auth?.clearStorage();
      globalThis.location.href = '/login';
    }
  }, [code, graphQLError?.message, isUnauthenticated, auth]);

  if (code === 'FORBIDDEN' || isUnauthenticated) {
    return null;
  }
  if (code === 'NOT_FOUND') {
    return <NotFoundContent type={type || 'page'} onRetry={onRetry} />;
  }
  if (graphQLError) {
    return <ErrorDisplay message={graphQLError.message} onRetry={onRetry} showBackButton={showBackButton} />;
  }

  return <ErrorDisplay message={error.message || 'Something went wrong'} onRetry={onRetry} showBackButton={showBackButton} />;
};

export default ErrorHandler;
