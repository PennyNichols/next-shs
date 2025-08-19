'use client';

import { alpha, Box, Typography } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { initialShinyEffect, interactionShinyEffect, shineTypography } from './HeroHeader.styles';
import theme from '@/styles/theme';
import { useMedia } from '@/hooks';

const HeroHeader = () => {
  const [isInteracting, setIsInteracting] = useState(false);
  const [hasTriggeredOnScroll, setHasTriggeredOnScroll] = useState(false);
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

const { isXxs, isXs } = useMedia();

const startInteractionAnimation = () => {
  // Prevent new interactions if animation is already running
  if (isInteracting) {
    return;
  }

  // Clear any existing timer
  if (animationTimerRef.current) {
    clearTimeout(animationTimerRef.current);
  }

  setIsInteracting(true);

  // Set new timer
  animationTimerRef.current = setTimeout(() => {
    setIsInteracting(false);
  }, 700);
};

const handleMouseEnter = () => {
  startInteractionAnimation();
};

const handleTouchStart = (e: React.TouchEvent<HTMLHeadingElement>): void => {
  e.preventDefault();
  startInteractionAnimation();
};

const handleClick = () => {
  startInteractionAnimation();
};

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasTriggeredOnScroll) {
          setHasTriggeredOnScroll(true);
          setTimeout(() => {
            startInteractionAnimation();
          }, 300);
        }
      });
    },
    {
      threshold: 0.9,
      rootMargin: '0px 0px -50px 0px',
    },
  );

  if (elementRef.current) {
    observer.observe(elementRef.current);
  }

  return () => {
    observer.disconnect();
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }
  };
}, []);
return (
  <Box ref={elementRef}>
    <Typography
      variant="h2"
      component="h2"
      sx={{
        fontWeight: '700',
        fontSize: { xxs: '.85rem', sm: '1.0rem', lg: '1.1rem', xl: '1.4rem' },
        letterSpacing: '0.2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1.5,
        textTransform: 'uppercase',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        marginBottom: { xxs: '0.1rem', sm: 0 },
      }}
    >
      Expert Hands.
    </Typography>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: '0.8rem',
        marginBottom: { xxs: '3rem', sm: '1.7rem', md: '1.5rem', lg: '2rem' },
        perspective: '1000px',
      }}
    >
      {isXxs || isXs ? (
        <Typography
          variant="h1"
          component="h2"
          onMouseEnter={handleMouseEnter}
          onTouchStart={handleTouchStart}
          onClick={handleClick}
          sx={{
            ...shineTypography,
            ...(isInteracting ? interactionShinyEffect : initialShinyEffect),
          }}
        >
          <span style={{ lineHeight: 1 }}>Exceptional</span> <span style={{ lineHeight: 1 }}>Results.</span>
        </Typography>
      ) : (
        <Typography
          variant="h1"
          component="h2"
          onMouseEnter={handleMouseEnter}
          onTouchStart={handleTouchStart}
          onClick={handleClick}
          sx={{
            ...shineTypography,
            ...(isInteracting ? interactionShinyEffect : initialShinyEffect),
          }}
        >
          Exceptional Results.
        </Typography>
      )}
    </Box>
  </Box>
);
};

export default HeroHeader;
