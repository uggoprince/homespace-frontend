const AgenciesView = (props) => {
  const { children } = props;
  return (
    <div className="container max-w-[85%] page-content">
      <div className="whitespace-normal">
        {children}
      </div>
    </div>
  );
};

export default AgenciesView;
