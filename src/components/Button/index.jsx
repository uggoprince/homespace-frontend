/* eslint-disable react/button-has-type */
import { cn } from '../../Utils/cn';
import './style.css';

const Button = (props) => {
  const {
    id, type, text, handleclick, disable = false, className,
  } = props;
  return (
    <button
      id={id}
      type={type}
      onClick={handleclick}
      disabled={disable}
      className={cn('default-button bg-indigo-600', className)}
    >
      {text}
    </button>
  );
};

export default Button;

export const CustomButton = (props) => {
  const {
    id, type, text, handleclick, classname, className, inactive = false,
  } = props;
  return (
    <button
      disabled={inactive}
      id={id}
      type={type}
      onClick={handleclick}
      className={cn(
        'custom-button',
        classname || 'bg-indigo-600 hover:bg-blue-700 focus:ring-purple-600',
        className,
      )}
    >
      {text}
    </button>
  );
};
