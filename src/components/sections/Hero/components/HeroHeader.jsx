'use client';

import theme from '@/styles/theme';
import { alpha, Box, Typography } from '@mui/material';
import { useRef, useState } from 'react';

const HeroHeader = () => {
  const [isInteracting, setIsInteracting] = useState(false);
  const animationTimerRef = useRef(null);

  const silverGradient = `linear-gradient(
    -75deg,
      ${theme.palette.primary.main} 0%, 
      ${theme.palette.primary.main} 49%, 
      ${theme.palette.background.default} 50%, 
      ${theme.palette.primary.main} 51%, 
      ${theme.palette.primary.main} 100% 
  )`;

  const shinyEffect = {
    position: 'relative',
    color: 'transparent',
    width: { xs: '71.5rem', xl: '71.5rem' },
    // background: 'white',
    background: silverGradient,
    backgroundSize: { xs: '155rem 30rem', xl: '155rem 30rem' },
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    textShadow: `
            -2px -2px 0 rgba(255, 255, 255, 0.1),
            2px 2px 0 rgba(0, 0, 0, 0.3) 
        `,
    filter: `drop-shadow(0 0 15px ${alpha(theme.palette.primary.dark, 0.4)})`,
    WebkitTextFillColor: 'transparent',
    animation: isInteracting ? 'shine 7s linear infinite' : 'shine 7s linear',
    '@keyframes shine': {
      '0%': {
        backgroundPosition: '0rem 0%',
      },
      '50%': {
        backgroundPosition: { xs: '155rem 0%', xl: '155rem 0%' },
      },
      '100%': {
        backgroundPosition: '0rem 0%',
      },
    },
  };

  const startInteractionAnimation = () => {
    if (!isInteracting) {
      setIsInteracting(true);
      animationTimerRef.current = setTimeout(() => {
        setIsInteracting(false);
      }, 7000);
      return () => {
        if (animationTimerRef.current) {
          clearTimeout(animationTimerRef.current);
        }
      };
    }
  };

  const handleMouseEnter = () => {
    startInteractionAnimation();
  };
  const handleTouchStart = (e) => {
    e.preventDefault();
    startInteractionAnimation();
  };
  return (
    <Box>
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontWeight: '700',
          fontSize: { xs: '2.1rem', xl: '3rem' },
          letterSpacing: '0.2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 1.5,
          textTransform: 'uppercase',
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
          marginBottom: { xs: '3rem', xl: '3rem' },
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          onMouseEnter={handleMouseEnter}
          onTouchStart={handleTouchStart}
          sx={{
            display: 'inline-block !important',
            transform: 'skewX(-20deg)',
            ...shinyEffect,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1.1,
            textTransform: 'uppercase',
            fontSize: { xs: '2.5rem', xl: '5rem' },
            letterSpacing: { xs: '0.5rem', xl: '0.5rem' },
          }}
        >
          Exceptional Results.
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroHeader;
