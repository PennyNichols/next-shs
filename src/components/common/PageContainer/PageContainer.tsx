'use client';
import theme from '@/styles/theme';
import { Box, Container } from '@mui/material';

const PageContainer = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        paddingY: { xxs: theme.spacing(4), xs: theme.spacing(6), md: theme.spacing(7) },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xxs: theme.spacing(5), xs: theme.spacing(6), md: theme.spacing(7) },
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default PageContainer;
