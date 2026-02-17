'use client';

import { useLayoutEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';

function LayoutFixer() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  const updatePadding = useCallback(() => {
    const header = document.querySelector('.fixed-header');
    const main = document.querySelector('main');

    if (!header || !main) return;

    const height = (header as HTMLElement).offsetHeight;

    // Disable transition on first render to prevent flash
    if (isFirstRender.current) {
      (main as HTMLElement).style.transition = 'none';
      isFirstRender.current = false;
    }

    document.documentElement.style.setProperty('--header-height', `${height}px`);

    // Re-enable transition after paint
    requestAnimationFrame(() => {
      (main as HTMLElement).style.transition = '';
    });
  }, []);

  useLayoutEffect(() => {
    // Calculate immediately before paint to prevent flash
    updatePadding();

    const header = document.querySelector('.fixed-header');
    if (!header) return undefined;

    const observer = new ResizeObserver(updatePadding);
    observer.observe(header);

    window.addEventListener('resize', updatePadding);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updatePadding);
    };
  }, [pathname, updatePadding]);

  return null;
}

export default LayoutFixer;
