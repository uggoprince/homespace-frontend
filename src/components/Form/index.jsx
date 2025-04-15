import './style.css';

export default (props) => {
  const {
    children, formclass, submithandler, method, id,
  } = props;
  return (
    <form onSubmit={submithandler} method={method} id={id} className={`form ${formclass}`}>
      {children}
    </form>
  );
};
