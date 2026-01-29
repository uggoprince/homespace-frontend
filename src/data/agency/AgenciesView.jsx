const AgenciesView = (props) => {
  const { children } = props;
  return (
    <div className="container hs-pb-100 page-content">
      <div className="whitespace-normal">
        {children}
      </div>
    </div>
  );
};

export default AgenciesView;
