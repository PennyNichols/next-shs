import { useState, useEffect } from 'react';

/**
 * A custom hook to determine the current screen size and provide boolean flags for breakpoints.
 *
 * Breakpoints:
 * - xs: 0-599px
 * - sm: 600-899px
 * - md: 900-1199px
 * - lg: 1200-1535px
 * - xl: 1536px and up
 *
 * @returns {object} An object with boolean flags for each breakpoint and the current screen size.
 * - `isXs`: `true` if the screen width is 0-600px.
 * - `isSm`: `true` if the screen width is 601-900px.
 * - `isMd`: `true` if the screen width is 901-1200px.
 * - `isLg`: `true` if the screen width is 1201-1536px.
 * - `isXl`: `true` if the screen width is 1537px and up.
 * - `screenSize`: A string representing the current screen size:
 *    ('xs', 'sm', 'md', 'lg', 'xl').
 *
 * @example
 * import React from 'react';
 * import useMedia from '../../hooks/useMedia';
 *
 * const ResponsiveComponent = () => {
 *   const { isXs, isLg, screenSize } = useMedia();
 *
 *   return (
 *     <div>
 *       {isXs && <p>xs is a mobile view.</p>}
 *       {screenSize === 'sm' && <p>sm is a small tablet view.</p>}
 *       {screenSize === 'md' && <p>md is a large tablet view.</p>}
 *       {isLg && <p>lg is a desktop view.</p>}
 *       {screenSize === 'xl' && <p>xl is a large desktop view.</p>}
 *     </div>
 *   );
 * };
 *
 * export default ResponsiveComponent;
 */
const breakpoints = {
  xs: '(max-width: 599px)',
  sm: '(min-width: 600px) and (max-width: 899px)',
  md: '(min-width: 900px) and (max-width: 1199px)',
  lg: '(min-width: 1200px) and (max-width: 1535px)',
  xl: '(min-width: 1536px)',
};

const useMedia = () => {
  const [screenSize, setScreenSize] = useState('xs');
  const [breakpointFlags, setBreakpointFlags] = useState({
    isXs: false,
    isSm: false,
    isMd: false,
    isLg: false,
    isXl: false,
  });

  useEffect(() => {
    const mediaQueryLists = Object.keys(breakpoints).map((key) => ({
      key,
      mql: window.matchMedia(breakpoints[key]),
    }));

    const getActiveScreenSize = () => {
      const activeBreakpoint = mediaQueryLists.find(({ mql }) => mql.matches);
      return activeBreakpoint ? activeBreakpoint.key : 'xs';
    };

    const updateFlags = () => {
      const activeScreenSize = getActiveScreenSize();
      setScreenSize(activeScreenSize);
      setBreakpointFlags({
        isXs: activeScreenSize === 'xs',
        isSm: activeScreenSize === 'sm',
        isMd: activeScreenSize === 'md',
        isLg: activeScreenSize === 'lg',
        isXl: activeScreenSize === 'xl',
      });
    };

    // Set the initial screen size and flags
    updateFlags();

    // Add listeners for changes
    mediaQueryLists.forEach(({ mql }) => mql.addEventListener('change', updateFlags));

    // Cleanup listeners on unmount
    return () => {
      mediaQueryLists.forEach(({ mql }) => mql.removeEventListener('change', updateFlags));
    };
  }, []);

  return { ...breakpointFlags, screenSize };
};

export default useMedia;
