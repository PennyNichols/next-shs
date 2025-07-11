'use client';
import theme from '@/styles/theme';
import { Box, Container } from '@mui/material';

const PageContainer = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100dvh',
        width: '100dvw',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(4),
        paddingTop: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="xl">{children}</Container>
    </Box>
  );
};

export default PageContainer;
