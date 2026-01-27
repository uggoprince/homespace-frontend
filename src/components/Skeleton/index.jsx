import MuiSkeleton from '@mui/material/Skeleton';
import PropTypes from 'prop-types';

/**
 * Generic Skeleton component for loading states
 * Wraps MUI Skeleton with convenient presets
 */
export function Skeleton({
  variant = 'rectangular',
  width,
  height,
  className = '',
  animation = 'pulse',
  rounded = false,
  circle = false,
  children,
  ...props
}) {
  const resolvedVariant = circle ? 'circular' : variant;

  const roundedClass = rounded && !circle ? 'rounded-lg' : '';
  const combinedClassName = `${roundedClass} ${className}`.trim();

  return (
    <MuiSkeleton
      variant={resolvedVariant}
      width={width}
      height={height}
      animation={animation}
      className={combinedClassName || undefined}
      {...props}
    >
      {children}
    </MuiSkeleton>
  );
}

Skeleton.propTypes = {
  variant: PropTypes.oneOf(['text', 'rectangular', 'circular', 'rounded']),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  animation: PropTypes.oneOf(['pulse', 'wave', false]),
  rounded: PropTypes.bool,
  circle: PropTypes.bool,
  children: PropTypes.node,
};

Skeleton.defaultProps = {
  variant: 'rectangular',
  width: undefined,
  height: undefined,
  className: '',
  animation: 'pulse',
  rounded: false,
  circle: false,
  children: undefined,
};

export default Skeleton;
