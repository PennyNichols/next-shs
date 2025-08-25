import { Box, Typography } from '@mui/material';
import ServicesAccordion from './ServicesAccordion/ServicesAccordion';
import { customBorderRadius } from '@/styles/theme/otherThemeConstants';

const CustomTitleSideDecoration = () => {
  return (
    <Box
      sx={{
        flex: 1,
        height: 2,
        backgroundColor: 'accent.primary',
        margin: { xxs: '5 1', md: 5 },
      }}
    />
  );
};

const Services = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'primary.main',
        padding: 2,
        paddingBottom: 4,
        borderRadius: customBorderRadius.medium,
        width: '100%',
        maxWidth: 1535,
        boxShadow: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '90%',
          mx: 'auto',
          gap: 4,
        }}
      >
        <CustomTitleSideDecoration />
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            whiteSpace: 'nowrap',
            fontSize: { xxs: '1.75rem', sm: '2.25rem' },
            color: 'secondary.light',
          }}
        >
          Our Services
        </Typography>
        <CustomTitleSideDecoration />
      </Box>
      <ServicesAccordion />
    </Box>
  );
};

export default Services;
