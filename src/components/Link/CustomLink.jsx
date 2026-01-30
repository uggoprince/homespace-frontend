import Link from './index';

export const CustomLink = ({
  to, children, className, size = 'md', variant = 'primary', ...props
}) => (
  <Link
    to={to}
    variant={variant}
    size={size}
    className={`w-full rounded-lg ${className}`}
    {...props}
  >
    {children}
  </Link>
);
