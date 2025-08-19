import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import theme from '@/styles/theme';
import Section from '@/components/common/Section/Section';
import CompanyNameHeader from './components/CompanyNameHeader';
import HeroContainer from './components/HeroContainer';
import HeroHeader from './components/HeroHeader/HeroHeader';
import HeroActionArea from './components/HeroActionArea';
import HeroScroll from './components/HeroScroll';

const Hero = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        overflow: 'hidden',
        zIndex: 10,
        [theme.breakpoints.up('xxs')]: {
          height: '100dvh',
        },
        [theme.breakpoints.up('sm')]: {
          height: '70dvh',
        },
      }}
    >
      <Image src="/images/poolWithPalms.jpg" alt="Hero Image" layout="fill" objectFit="cover" />
      <HeroContainer>
        <Box
          maxWidth="xl"
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Section sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                maxWidth: { xxs: '100%', sm: '70%' },
                margin: '0 auto',
              }}
            >
              <HeroHeader />
              <Typography
                sx={{
                  width: '90dvw',
                  maxWidth: '100%',
                  marginBottom: { xxs: theme.spacing(10), sm: theme.spacing(8), xl: theme.spacing(10) },
                  fontSize: { xxs: '0.9rem', lg: '1rem', xl: '1.2rem' },
                  letterSpacing: '0.1rem',
                  color: theme.palette.secondary.dark,
                }}
              >
                From routine maintenance to complex projects, we handle every aspect of your home's upkeep with
                precision and care.
              </Typography>
            </Box>
          </Section>
          <Section
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              flexGrow: 0,
              margin: 0,
            }}
          >
            <HeroActionArea />
          </Section>
          {isAtTop ? (
            <HeroScroll />
          ) : (
            <Box
              sx={{
                mt: theme.spacing(2),
                mb: theme.spacing(1),
                height: '2rem',
                display: { xs: 'block', sm: 'none' },
              }}
            />
          )}
        </Box>
      </HeroContainer>
    </Box>
  );
};

export default Hero;
