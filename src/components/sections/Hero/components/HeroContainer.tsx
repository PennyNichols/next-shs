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
        background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.main, 0.8)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 40%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
        px: 3,
      }}
    >
      {children}
    </Box>
  );
};

export default HeroContainer;
