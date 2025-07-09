'use client';
import theme from '@/styles/theme';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const gradientMovement = keyframes`
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 0% -100%;
  }
`;

const generateAlternatingGradient = (color1, color2, count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(i % 2 === 0 ? color1 : color2);
  }
  return colors.join(', ');
};

const AnimatedText = styled(Typography)`
  background: linear-gradient(to bottom, 
    ${generateAlternatingGradient(theme.palette.secondary.main, theme.palette.primary.main, 40)});
  background-size: 100% 1000%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  display: inline-block;
  animation: ${gradientMovement} 25s linear infinite;
`;

const ScrollIcon = () => {
  return (
    <AnimatedText
      sx={{
        fontSize: { xxs: '2rem', xs: '2.5rem' },
      }}
    >
      &#8595;
    </AnimatedText>
  );
};

const ScrollText = () => {
  return (
    <AnimatedText
      sx={{
        fontSize: { xxs: '1.2rem', xs: '2rem' },
        marginLeft: 3,
        marginRight: 3,
      }}
    >
      Scroll for more
    </AnimatedText>
  );
};

const HeroScroll = () => {
  return (
    <Box
      sx={{
        display: { xs: 'flex', sm: 'none' },
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        mt: { xs: 2 },
        mb: 1,
      }}
    >
      <ScrollIcon />
      <ScrollIcon />
      <ScrollText />
      <ScrollIcon />
      <ScrollIcon />
    </Box>
  );
};

export default HeroScroll;
