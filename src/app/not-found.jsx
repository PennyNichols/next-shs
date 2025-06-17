'use client';
import theme from '../theme/theme';
import { Box, Typography, Button, CssBaseline } from '@mui/material';
import Link from 'next/link';
import NavBar from '../../components/NavBar/NavBar';
import { ThemeProvider } from '@mui/material/styles';
import MinFooter from '../../components/Footer/MinFooter';
console.log('theme', theme);
const Custom404 = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100dvh', // dynamic viewport height for better support
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
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
            backgroundColor: theme.palette.background.default, // Example: use your theme
          }}
        >
          <Box flexGrow={1} p={3}>
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
                as="a"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  '&:hover': {
                    color: theme.palette.accent.main,
                    backgroundColor: theme.palette.primary.main,
                    borderColor: theme.palette.accent.main,
                  },
                }}
              >
                Go to Homepage
              </Button>
              {/* You can add more links here */}
              <Button
                as="a"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  '&:hover': {
                    color: theme.palette.accent.main,
                    backgroundColor: theme.palette.primary.main,
                    borderColor: theme.palette.accent.main,
                  },
                }}
              >
                Explore Our Services
              </Button>
            </Box>
          </Box>
        </Box>
        <MinFooter />
      </Box>
    </ThemeProvider>
  );
};

export default Custom404;
