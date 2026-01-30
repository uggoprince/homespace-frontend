import { SignOutToLogin, SignOutToHome } from '../../auth/signout';
import PageNotFound from '../../pages/404-page';

const ErrorDisplay = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center min-h-[200px] gap-3">
    <p className="text-red-500 dark:text-red-400 text-sm">{message}</p>
    <button
      type="button"
      onClick={onRetry || (() => globalThis.location.reload())}
      className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
    >
      Try again
    </button>
  </div>
);

const ErrorHandler = (props) => {
  const { error, onRetry, type } = props;
  const { graphQLErrors } = error;
  if (graphQLErrors && graphQLErrors.length) {
    const { message, code } = graphQLErrors[0];
    if (code === 'FORBIDDEN' && message === 'Not authenticated as user.') {
      return <SignOutToHome />;
    }
    if (code === 'UNAUTHENTICATED') {
      return <SignOutToLogin />;
    }
    if (code === 'NOT_FOUND') {
      return <PageNotFound type={type} />;
    }
    return <ErrorDisplay message={message} onRetry={onRetry} />;
  }
  return <ErrorDisplay message={error.message || 'Something went wrong'} onRetry={onRetry} />;
};

export default ErrorHandler;

export const formErrorHandler = (error, setErrors, notify, use = 'state') => {
  if (error.networkError) notify('Network error. Try Again.', 2);
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    notify(`${error.message}`, 2);
    const fieldError = error.graphQLErrors[0].error;
    if (fieldError) {
      if (use === 'state') setErrors(fieldError);
      else setErrors.current = fieldError;
    }
  }
};
