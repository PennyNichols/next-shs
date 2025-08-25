// src/theme/typography.js
import { TypographyOptions } from '@mui/material/styles/createTypography';

const typography: TypographyOptions = {
  fontFamily: 'var(--font-poppins), open-sans, sans-serif',
  h1: {
    fontFamily: 'var(--font-archivo)',
    fontWeight: '900',
    fontSize: '2.5rem',
    wordSpacing: '8px',
    letterSpacing: '2px',
  },
  h2: {
    fontWeight: '900',
    fontFamily: 'var(--font-archivo)',
    fontSize: '2rem',
    wordSpacing: '8px',
    letterSpacing: '2px',
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: 0.2,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: 0.2,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: 0.2,
  },
  h6: {
    fontSize: '1.1rem',
    fontWeight: 500,
    lineHeight: 1.7,
    letterSpacing: 0.2,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.5,
    letterSpacing: 0.2,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
    letterSpacing: 0.2,
  },
  button: {
    textTransform: 'none',
    fontWeight: 500,
    letterSpacing: 0.2,
  },
  // Custom variants
  pageTitle: {
    fontSize: '2.4rem',
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: '1.6rem',
    fontWeight: 500,
    lineHeight: 1.1,
    letterSpacing: 0.5,
  },
};

export default typography;
