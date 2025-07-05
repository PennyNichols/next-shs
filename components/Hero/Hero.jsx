import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import theme from '@/theme';
import { Section } from 'components/ReusableComponents/baseComponents';
import CompanyNameHeader from './CompanyNameHeader';
import HeroContainer from './HeroContainer';
import HeroHeader from './HeroHeader';
import HeroActionArea from './HeroActionArea';
import HeroScroll from './HeroScroll';

const Hero = () => {
  return (
    <Container className="hero-container">
      <Image src="/images/poolWithPalms.jpg" alt="Hero Image" layout="fill" objectFit="cover" />
      <HeroContainer>
        <Box sx={{ width: '90%' }}>
          <CompanyNameHeader />
        </Box>
        <Box
          sx={{
            maxWidth: 'xl',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Section sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <HeroHeader />
              <Typography
                sx={{
                  marginBottom: { xs: theme.spacing(2), xl: theme.spacing(2) },
                  fontSize: { xs: '1.4rem', xl: '2.7rem' },
                  letterSpacing: '0.1rem',
                  color: theme.palette.secondary.dark,
                }}
              >
                From routine maintenance to complex projects, we handle every aspect of your home's upkeep with
                precision and care.
              </Typography>
            </Box>
          </Section>
          <Section sx={{ width: '100%' }}>
            <HeroActionArea />
          </Section>
          <HeroScroll />
        </Box>
      </HeroContainer>
    </Container>
  );
};

export default Hero;
