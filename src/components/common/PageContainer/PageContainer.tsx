'use client';
import theme from '@/styles/theme';
import { Box, Container } from '@mui/material';

import { Breakpoint } from '@mui/material';

interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: Breakpoint | false;
}

const PageContainer = ({ children, maxWidth = 'xl' }: PageContainerProps) => {
  return (
    <Box
      sx={{
        minHeight: 'calc(100dvh - var(--footer-height, 200px) - var(--header-height, 80px))',
        display: 'flex',
        paddingY: { xxs: theme.spacing(4), xs: theme.spacing(6), md: theme.spacing(7) },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container
        maxWidth={maxWidth}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xxs: theme.spacing(4), xs: theme.spacing(6), md: theme.spacing(7) },
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default PageContainer;
