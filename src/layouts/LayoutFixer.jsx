import React, { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

function LayoutFixer() {
  const routeLocation = useLocation();

  const updatePadding = useCallback(() => {
    const header = document.querySelector('.fixed-header');
    const content = document.querySelector('.page-content');

    if (!header || !content) return;

    const height = header.offsetHeight;
    content.style.paddingTop = `${height}px`;
  }, []);

  useEffect(() => {
    updatePadding(); // Run when route changes

    const header = document.querySelector('.fixed-header');
    if (!header) return undefined;

    const observer = new ResizeObserver(updatePadding);
    observer.observe(header);

    window.addEventListener('resize', updatePadding);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updatePadding);
    };
  }, [routeLocation.pathname, updatePadding]);

  return null;
}

export default LayoutFixer;
