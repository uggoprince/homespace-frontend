/* eslint-disable react/button-has-type */
import { cn } from '../../Utils/cn';
import './style.css';

/**
 * Button component with variant and size support
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.variant - Style variant: 'primary', 'secondary', 'ghost'
 * @param {string} props.size - Size variant: 'sm', 'md', 'lg'
 * @param {boolean} props.disabled - Disable the button
 * @param {string} props.type - Button type: 'button', 'submit', 'reset'
 * @param {Object} props.icon - Icon component to display
 * @param {string} props.iconPosition - Icon position: 'left' or 'right'
 * @param {string} props.iconClassName - Additional CSS classes for the icon
 */
const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  icon: Icon,
  iconPosition = 'left',
  iconClassName,
  ...props
}) => {
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
      {Icon && iconPosition === 'left' && <Icon className={cn('w-4 h-4 flex-shrink-0', iconClassName)} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className={cn('w-4 h-4 flex-shrink-0', iconClassName)} />}
    </>
  );

  return (
    <button
      type={type}
      disabled={disabled}
      className={combinedClassName}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
