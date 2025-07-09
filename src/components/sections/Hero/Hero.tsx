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

    // Set initial state
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container
      sx={{
        position: 'relative',
        minWidth: '100%',
        minHeight: '35rem',
        maxHeight: '100%',
        overflow: 'hidden',
        zIndex: 1200,
        [theme.breakpoints.up('xs')]: {
          height: '100dvh',
        },
        [theme.breakpoints.up('sm')]: {
          height: '55dvh',
        },
        [theme.breakpoints.up('md')]: {
          height: '50dvh',
        },
        [theme.breakpoints.up('lg')]: {
          height: '45dvh',
        },
        [theme.breakpoints.up('xl')]: {
          height: '65dvh',
        },
      }}
    >
      <Image src="/images/poolWithPalms.jpg" alt="Hero Image" layout="fill" objectFit="cover" />
      <HeroContainer>
        <CompanyNameHeader />
        <Box
          sx={{
            maxWidth: 'xl',
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
                justifyContent: { xs: 'center', sm: 'flex-end', lg: 'flex-end' },
                alignItems: 'center',
              }}
            >
              <HeroHeader />
              <Typography
                sx={{
                  width: '90dvw',
                  maxWidth: '100%',
                  marginBottom: { xs: theme.spacing(2), md: theme.spacing(0), lg: theme.spacing(2) },
                  fontSize: { xs: '1.4rem', sm: '1.2rem', md: '1.6rem', lg: '1.9rem', xl: '2.7rem' },
                  letterSpacing: '0.1rem',
                  color: theme.palette.secondary.dark,
                  [theme.breakpoints.down(450)]: {
                    fontSize: '1.2rem',
                  },
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
              flexGrow: { xs: 0, sm: 1 },
              margin: 0,
            }}
          >
            <HeroActionArea />
          </Section>
          {isAtTop ? (
            <HeroScroll />
          ) : (
            <Box sx={{ height: '4.57rem', [theme.breakpoints.down('xxs')] : { height: '3.92rem' }, }} />
          )}
        </Box>
      </HeroContainer>
    </Container>
  );
};

export default Hero;
