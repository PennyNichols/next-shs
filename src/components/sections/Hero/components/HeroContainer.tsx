import { alpha, Box } from '@mui/material';
import theme from '@/styles/theme';

const HeroContainer = ({ children }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        color: theme.palette.background.paper,
        textAlign: 'center',
        background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.light, 0.8)}, ${alpha(theme.palette.background.paper, 0.8)})`,
        px: {xs: 3, md:5},
        py: { xs: 2, sm: 3, md: 4, xl: 5 },
        paddingTop: {xs: 6,sm:3, md: 4, xl: 5},
      }}
    >
      {children}
    </Box>
  );
};

export default HeroContainer;
