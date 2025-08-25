import theme from '@/styles/theme';
import { alpha, keyframes } from '@mui/material';

export const silverGradient = `linear-gradient(
    -75deg,
      ${theme.palette.primary.main} 0%, 
      ${theme.palette.primary.main} 47%, 
      ${theme.palette.background.paper} 50%, 
      ${theme.palette.primary.main} 53%, 
      ${theme.palette.primary.main} 100% 
  )`;

// Immediate shine effect that starts with shine visible
const immediateShine = keyframes`
  0% {
    background-position: -70rem 0%;
  }
  
  50% {
    background-position: -5rem 0%;
  }

  100% {
    background-position: -80rem 0%;
  }
`;

// Separate 3D rotation animation
const rotateAnimation = keyframes`
  0% {
    transform: skewX(-20deg) rotateY(0deg);
  }
  50% {
    transform: skewX(-20deg) rotateY(8deg);
  }
  100% {
    transform: skewX(-20deg) rotateY(0deg);
  }
`;

export const initialShinyEffect = {
  position: 'relative',
  color: 'transparent',
  width: { xxs: '71.5rem', xl: '71.5rem' },
  background: silverGradient,
  backgroundSize: { xxs: '120rem 30rem', xl: '140rem 30rem' },
  backgroundPosition: '-80rem 0%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  textShadow: `
          -2px -2px 0 rgba(255, 255, 255, 0.1),
          2px 2px 0 rgba(0, 0, 0, 0.5) 
      `,
  filter: `drop-shadow(0 0 15px ${alpha(theme.palette.primary.dark, 0.6)})`,
  WebkitTextFillColor: 'transparent',
  transformStyle: 'preserve-3d',
};

export const interactionShinyEffect = {
  position: 'relative',
  color: 'transparent',
  width: { xxs: '51.5rem', xl: '75.5rem' },
  background: silverGradient,
  backgroundSize: { xxs: '120rem 30rem', xl: '155rem 30rem' },
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  textShadow: `
          -2px -2px 0 rgba(255, 255, 255, 0.1),
          2px 2px 0 rgba(0, 0, 0, 0.5) 
      `,
  filter: `drop-shadow(0 0 15px ${alpha(theme.palette.primary.dark, 0.6)})`,
  WebkitTextFillColor: 'transparent',
  transformStyle: 'preserve-3d',
  animation: `${immediateShine} 0.7s ease-in-out, ${rotateAnimation} 0.7s ease-in-out`,
};

export const shineTypography = {
  display: { xxs: 'flex !important', md: 'inline-block !important' },
  transform: 'skewX(-20deg)',
  textShadow: `
        -2px -2px 0 rgba(255, 255, 255, 0.1),
        2px 2px 0 rgba(0, 0, 0, 0.5) 
    `,
  filter: `drop-shadow(0 0 15px ${alpha(theme.palette.primary.dark, 0.6)})`,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1.1,
  textTransform: 'uppercase',
  fontSize: {
    xxs: '1.5rem',
    xs: '2rem',
    sm: '1.9rem',
    md: '2.2rem',
    lg: '2.7rem',
    xl: '3.5rem',
  },
  letterSpacing: '0.5rem',
  cursor: 'pointer',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  outline: 'none',
  '&:focus': {
    outline: 'none',
  },
  '&:active': {
    outline: 'none',
  },
  '&:focus-visible': {
    outline: 'none',
  },
  WebkitTapHighlightColor: 'transparent',
};
