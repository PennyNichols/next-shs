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
          height: '25rem',
        },
        [theme.breakpoints.up('md')]: {
          height: '28rem',
        },
        [theme.breakpoints.up('lg')]: {
          height: '38rem',
        },
        [theme.breakpoints.up('xl')]: {
          height: '40rem',
        },
      }}
    >
      <Image src="/images/poolWithPalms.jpg" alt="Hero Image" layout="fill" objectFit="cover" />
      <HeroContainer>
        <CompanyNameHeader />
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
                justifyContent: { xxs: 'center', sm: 'flex-end', lg: 'flex-end' },
                alignItems: 'center',
              }}
            >
              <HeroHeader />
              <Typography
                sx={{
                  width: '90dvw',
                  maxWidth: '100%',
                  marginBottom: { xxs: theme.spacing(2), md: theme.spacing(1.5), lg: theme.spacing(2) },
                  fontSize: { xxs: '1rem', sm: '1.2rem', md: '1.3rem', lg: '1.6rem', xl: '2.5rem' },
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
              flexGrow: { xxs: 0, sm: 1 },
              margin: 0,
            }}
          >
            <HeroActionArea />
          </Section>
          {isAtTop ? (
            <HeroScroll />
          ) : (
            <Box sx={{ height: { xxs: '3.95rem', xs: '4.6rem' }, display: { xs: 'block', sm: 'none' } }} />
          )}
        </Box>
      </HeroContainer>
    </Box>
  );
};

export default Hero;
