const Block = (props) => {
  const { classlist, children } = props;
  const classname = `${classlist}`;
  return (
    <div className={classname}>{children}</div>
  );
};

export const container = (props) => {
  const { classlist, children } = props;
  const classname = `w-full mx-auto ${classlist}`;
  return (
    <Block classlist={classname}>{children}</Block>
  );
};

export default Block;
