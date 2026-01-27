import React from 'react';
import { cn } from '../Utils/cn';

export const BaseLayout = (props) => {
  const { children, className = 'h-dvh' } = props;
  return (
    <div className={cn('w-full relative flex flex-col dark:text-white', className)}>
      {children}
    </div>
  );
};
