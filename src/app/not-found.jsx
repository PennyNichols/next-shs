'use client';
import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';
import NavBar from '../../components/NavBar/NavBar';
import MinFooter from '../../components/Footer/MinFooter';

const Custom404 = () => {
  return (
    <Container className="page-wrapper">
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          boxSizing: 'border-box',
          p: 0,
          m: 0,
          backgroundColor: 'background.default',
        }}
        flexGrow={1}
      >
        <Box p={3} pb={6}>
          <Typography variant="h1" component="h1" sx={{ fontSize: '6rem', mb: 2 }}>
            404
          </Typography>
          <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
            Oops! Page Not Found.
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: '600px' }}>
            Looks like this page got lost in the blueprints. We can't find the page you're looking for.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center',
              width: 0.75,
              margin: 'auto',
            }}
          >
            <Button
              href="/"
              component={Link}
              variant="contained"
              color="primary"
              size="large"
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  color: 'accent.main',
                  backgroundColor: 'primary.main',
                  borderColor: 'accent.main',
                },
              }}
            >
              Go to Homepage
            </Button>
            <Button
              href="/services"
              component={Link}
              variant="contained"
              color="primary"
              size="large"
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  color: 'accent.main',
                  backgroundColor: 'primary.main',
                  borderColor: 'accent.main',
                },
              }}
            >
              Explore Our Services
            </Button>
          </Box>
        </Box>
      </Box>
      <MinFooter />
    </Container>
  );
};

export default Custom404;
