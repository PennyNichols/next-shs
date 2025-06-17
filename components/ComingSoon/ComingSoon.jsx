import theme from '@/theme/theme';
import { Box, Button, Typography } from '@mui/material';
import CementMixerSvg from '../SVG/CementMixerSvg';

const ComingSoon = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        boxSizing: 'border-box',
        p: 0,
        m: 0,
        backgroundColor: theme.palette.background.default, // Example: use your theme
      }}
    >
      <Box flexGrow={1} p={3}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Typography variant="h2" component="h1">
            Under Construction
          </Typography>
          <CementMixerSvg style={{ height: '130px' }} />
        </Box>
        <Typography variant="h4" component="h2" sx={{ my: 2 }}>
          Don't worry, this page will be available soon!
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, maxWidth: '600px' }}>
          Our fantastic team is working hard to bring you the best experience. Stay tuned for updates!
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
            width: 0.75,
            margin: 'auto',
          }}
        >
          <Button
            as="a"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              '&:hover': {
                color: theme.palette.accent.main,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.accent.main,
              },
            }}
          >
            Go to Homepage
          </Button>
          {/* You can add more links here */}
          <Button
            as="a"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              '&:hover': {
                color: theme.palette.accent.main,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.accent.main,
              },
            }}
          >
            Explore Our Services
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ComingSoon;
