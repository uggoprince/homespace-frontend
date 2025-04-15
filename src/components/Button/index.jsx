/* eslint-disable react/button-has-type */
import './style.css';

export default (props) => {
  const {
    id, type, text, handleclick, disable = false,
  } = props;
  return (
    <button
      id={id}
      type={type}
      onClick={handleclick}
      disabled={disable}
      className="default-button bg-indigo-600"
    >
      {text}
    </button>
  );
};

export const CustomButton = (props) => {
  const {
    id, type, text, handleclick, classname, inactive = false,
  } = props;
  return (
    <button
      disabled={inactive}
      id={id}
      type={type}
      onClick={handleclick}
      className={`${(
        classname
        || 'bg-indigo-600 hover:bg-blue-700 focus:ring-purple-600')}
       custom-button`}
    >
      {text}
    </button>
  );
};
