import LogoSvg from '@/assets/svg/LogoSvg/LogoSvg';
import theme from '@/styles/theme';
import { Box, Typography } from '@mui/material';

const CompanyNameHeader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        gap: 1,
        width: '100%',
        marginTop: 2,
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: { xxs: '1rem', md: '1.2rem', lg: '1.5rem' },
          lineHeight: 1,
          textTransform: 'uppercase',
          fontWeight: 700,
          marginRight: 'auto',
          color: theme.palette.accent.primary,
        }}
      >
        SHS FLORIDA
      </Typography>
    </Box>
  );
};

export default CompanyNameHeader;
