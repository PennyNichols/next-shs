import theme from '@/theme';
import { Typography } from '@mui/material';

const CompanyNameHeader = () => {
  return (
    <Typography
      variant="h1"
      component="h1"
      //   className="company-name hero-header"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))',
        gap: 0,
        width: '95%',
        fontSize: { xs: '4rem', xl: '8rem' },
        textAlign: 'center',
        justifyContent: 'center',
        margin: theme.spacing(0, 'auto', 2),
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
