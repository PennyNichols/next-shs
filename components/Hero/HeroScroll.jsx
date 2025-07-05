import theme from "@/theme";
import { Box, Typography } from "@mui/material";

  const bgScrollEffect = {
    background: `linear-gradient(to bottom, 
    ${theme.palette.secondary.dark}, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.dark}, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.dark}, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.dark}, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.dark}, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.dark}, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.dark}, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.dark}, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.dark}, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.dark}, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.dark})`,
    backgroundSize: '100% 1000%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    display: 'inline-block',
    lineHeight: '1',
    verticalAlign: 'middle',
    animationTimingFunction: 'linear',
    animation: '$gradientMovement 20s linear infinite',
    '@keyframes gradientMovement': {
      '0%': {
        backgroundPosition: '0% 0%',
      },
      '100%': {
        backgroundPosition: '0% -100%',
      },
    },
  };

  const ScrollIcon = () => {
    return (
      <Typography
        component="span"
        sx={{
          fontSize: '1.875rem',
          ...bgScrollEffect,
        }}
      >
        &#8595;
      </Typography>
    );
  };

  const ScrollText = () => {
    return (
      <Typography
        variant="body2"
        sx={{
          fontSize: '1.5rem',
          marginLeft: 3,
          marginRight: 3,
          ...bgScrollEffect,
        }}
      >
        Scroll for more
      </Typography>
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
              mt: { xs: 6 },
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
}

export default HeroScroll;