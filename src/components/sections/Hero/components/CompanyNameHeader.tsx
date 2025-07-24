import theme from '@/styles/theme';
import { Typography } from '@mui/material';

const CompanyNameHeader = () => {
  return (
    <Typography
      variant="h1"
      component="h1"
      sx={{
        maxWidth: '1535px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))',
        gap: 0,
        width: '100%',
        fontSize: { xxs: '2rem', sm: '2.7rem', md: '3.5rem', lg: '5rem' },
        textAlign: 'center',
        justifyContent: 'center',
        margin: theme.spacing(1, 'auto'),
        flexDirection: 'column',
        alignItems: 'center',
        lineHeight: 1.1,
        letterSpacing: '0.3rem',
        textTransform: 'uppercase',
        fontWeight: 800,
      }}
    >
      <span>S</span>
      <span>H</span>
      <span>S</span>
      <span> </span>
      <span>F</span>
      <span>L</span>
      <span>O</span>
      <span>R</span>
      <span>I</span>
      <span>D</span>
      <span>A</span>
    </Typography>
  );
};

export default CompanyNameHeader;
