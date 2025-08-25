import { customBorderRadius } from '@/styles/theme/otherThemeConstants';
import { Box, Typography } from '@mui/material';

const CustomDivider = () => {
  return (
    <Box
      sx={{
        width: '50%',
        height: 2,
        backgroundColor: 'accent.primary',
      }}
    />
  );
};

const CustomSeparationDot = () => {
  return (
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: customBorderRadius.circle,
        backgroundColor: 'primary.main',
      }}
    />
  );
};

const ServiceAreas = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        padding: 4,
        backgroundColor: 'background.paper',
        boxShadow: 2,
        borderRadius: customBorderRadius.small,
        width: '100%',
        mx: 'auto',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          textAlign: 'center',
          whiteSpace: 'nowrap',
          fontSize: { xxs: '1.75rem', md: '2rem', lg: '2.25rem' },
        }}
      >
        Now Serving These
        <wbr /> Florida Locations
      </Typography>
      <CustomDivider />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xxs: 'column', md: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xxs: 2, md: 8 },
          marginTop: 3,
        }}
      >
        <Typography variant="h3" sx={{ fontSize: { xxs: '1.5rem', md: '1.625rem', lg: '1.75rem' } }}>
          Port Charlotte
        </Typography>
        <CustomSeparationDot />
        <Typography variant="h3" sx={{ fontSize: { xxs: '1.5rem', md: '1.625rem', lg: '1.75rem' } }}>
          Punta Gorda
        </Typography>
        <CustomSeparationDot />
        <Typography variant="h3" sx={{ fontSize: { xxs: '1.5rem', md: '1.625rem', lg: '1.75rem' } }}>
          North Port
        </Typography>
      </Box>
    </Box>
  );
};

export default ServiceAreas;
