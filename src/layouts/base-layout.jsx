import React from 'react';

export const BaseLayout = (props) => {
  const { children, css = 'h-dvh master' } = props;
  return (
    <div className={`w-full relative flex flex-col dark:text-white ${css}`}>
      {children}
    </div>
  );
};
