import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { cn } from '../../Utils/cn';

/**
 * Custom Link component that handles both internal (React Router) and external links
 * @param {Object} props - Component props
 * @param {string} props.to - Destination URL (internal route or external URL)
 * @param {string} props.href - Alternative to 'to' for external links
 * @param {React.ReactNode} props.children - Link content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.variant - Style variant: 'primary', 'secondary', 'ghost', 'link'
 * @param {string} props.size - Size variant: 'sm', 'md', 'lg'
 * @param {boolean} props.external - Force external link behavior
 * @param {boolean} props.disabled - Disable the link
 * @param {Object} props.icon - Icon component to display
 * @param {string} props.iconPosition - Icon position: 'left' or 'right'
 */
const Link = ({
  to,
  href,
  children,
  className,
  variant = 'link',
  size = 'md',
  external = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  const destination = to || href;
  const isExternal = external || destination?.startsWith('http')
    || destination?.startsWith('mailto:')
    || destination?.startsWith('tel:');

  // Base styles
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-colors';

  // Variant styles
  const variantStyles = {
    primary: `bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg
    shadow-indigo-500/25 disabled:bg-gray-400 disabled:cursor-not-allowed`,
    secondary: `bg-gray-100 dark:bg-gray-800 hover:bg-gray-200
    dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200
    disabled:bg-gray-100 disabled:cursor-not-allowed`,
    ghost: `bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800
    text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed`,
    link: `text-indigo-600 dark:text-indigo-400 hover:text-indigo-700
    dark:hover:text-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed`,
  };

  // Size styles
  const sizeStyles = {
    sm: 'text-sm py-1.5 px-3 rounded-lg',
    md: 'text-base py-2 px-4 rounded-xl',
    lg: 'text-lg py-3 px-6 rounded-xl',
  };

  const combinedClassName = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    disabled && 'cursor-not-allowed opacity-50',
    className,
  );

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 flex-shrink-0" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 flex-shrink-0" />}
    </>
  );

  if (disabled) {
    return (
      <span className={combinedClassName} aria-disabled="true">
        {content}
      </span>
    );
  }

  if (isExternal) {
    return (
      <a
        href={destination}
        className={combinedClassName}
        target={destination?.startsWith('http') ? '_blank' : undefined}
        rel={destination?.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <RouterLink to={destination} className={combinedClassName} {...props}>
      {content}
    </RouterLink>
  );
};

Link.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'link']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  external: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.elementType,
  iconPosition: PropTypes.oneOf(['left', 'right']),
};

Link.defaultProps = {
  to: undefined,
  href: undefined,
  className: undefined,
  variant: 'link',
  size: 'md',
  external: false,
  disabled: false,
  icon: undefined,
  iconPosition: 'left',
};

export default Link;
