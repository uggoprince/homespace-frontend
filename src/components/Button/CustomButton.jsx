import Button from './index';

export const CustomButton = ({
  children, className, size = 'md', variant = 'primary', ...props
}) => (
  <Button
    variant={variant}
    size={size}
    className={`w-full rounded-lg ${className}`}
    {...props}
  >
    {children}
  </Button>
);
