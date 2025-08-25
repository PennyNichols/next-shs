import { useState, useEffect } from 'react';

/**
 * A custom hook to determine the current screen size and provide boolean flags for breakpoints.
 *
 * Breakpoints:
 * - xxs: 0-399px
 * - xs: 400-599px
 * - sm: 600-899px
 * - md: 900-1199px
 * - lg: 1200-1535px
 * - xl: 1536px and up
 *
 * @returns {object} An object with boolean flags for each breakpoint and the current screen size.
 * - `isXxs`: `true` if the screen width is 0-400px.
 * - `isXs`: `true` if the screen width is 401-599px.
 * - `isSm`: `true` if the screen width is 600-899px.
 * - `isMd`: `true` if the screen width is 900-1199px.
 * - `isLg`: `true` if the screen width is 1200-1535px.
 * - `isXl`: `true` if the screen width is 1536px and up.
 * - `screenSize`: A string representing the current screen size:
 *    ('xxs', 'xs', 'sm', 'md', 'lg', 'xl').
 *
 * @example
 * import React from 'react';
 * import useMedia from '../../hooks/useMedia';
 *
 * const ResponsiveComponent = () => {
 *   const { isXxs, isXs, isLg, screenSize } = useMedia();
 *
 *   return (
 *     <div>
 *       {isXxs && <p>xxs is an extra small mobile view.</p>}
 *       {isXs && <p>xs is an average mobile view.</p>}
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
  xxs: '(max-width: 399px)',
  xs: '(min-width: 400px) and (max-width: 599px)',
  sm: '(min-width: 600px) and (max-width: 899px)',
  md: '(min-width: 900px) and (max-width: 1199px)',
  lg: '(min-width: 1200px) and (max-width: 1535px)',
  xl: '(min-width: 1536px)',
};

const useMedia = () => {
  const [screenSize, setScreenSize] = useState('xxs');
  const [breakpointFlags, setBreakpointFlags] = useState({
    isXxs: false,
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
      return activeBreakpoint ? activeBreakpoint.key : 'xxs';
    };

    const updateFlags = () => {
      const activeScreenSize = getActiveScreenSize();
      setScreenSize(activeScreenSize);
      setBreakpointFlags({
        isXxs: activeScreenSize === 'xxs',
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

// !!!FOR TESTING RESPONSIVENESS WITH DEVTOOLS!!!
// Common resolutions
// cellphone:
// 360 x 640px
// 375 x 667px
// 375 x 812px
// 390 x 844px
// 412 x 915px
// 414 x 896px
// 430 x 932px
// tablet:
// 601 x 962px
// 768 x 1024px
// 800 x 1280px
// 810 x 1080px
// 834 x 1194px
// 1024 x 1366px
// Laptop:
// 1366 x 768px
// 1440 x 900px
// 1920 x 1080px
// 2560 x 1440px
// 3840 x 2160px

// Desktop: (resolutions)
// 1280 x 720px
// 1366 x 768px
// 1536 x 864px
// 1920 x 1080px
// 2560 x 1440px
// 3840 x 2160px

export default useMedia;
