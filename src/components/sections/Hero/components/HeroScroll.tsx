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
  background: linear-gradient(
    to bottom,
    ${generateAlternatingGradient(theme.palette.background.paper, theme.palette.primary.light, 25)}
  );
  background-size: 1000% 2000%;
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
        fontSize: '2rem',
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
        fontSize: '1.5rem',
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
        display: { xxs: 'flex', sm: 'none' },
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: '2rem',
        mt: theme.spacing(2),
        mb: theme.spacing(1),
        whiteSpace: 'nowrap',
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
