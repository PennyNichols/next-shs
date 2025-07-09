import theme from '@/styles/theme';
import { Typography } from '@mui/material';

const CompanyNameHeader = () => {
  return (
    <Typography
      variant="h1"
      component="h1"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))',
        gap: 0,
        width: '100%',
        fontSize: { xs: '2.5rem',sm: '3rem', md: '4rem',lg: '5rem', xl: '8rem' },
        textAlign: 'center',
        justifyContent: 'center',
        margin: theme.spacing(0, 'auto', 2),
        flexDirection: 'column',
        alignItems: 'center',
        lineHeight: 1.1,
        letterSpacing: '0.3rem',
        textTransform: 'uppercase',
        fontWeight: 800,
        [theme.breakpoints.down(450)]: {
          fontSize: '2rem',
        },
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
