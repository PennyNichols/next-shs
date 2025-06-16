import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles'; // If you need theme for styling

const Custom404 = () => {
  const theme = useTheme(); // Use theme if your styles need it

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        p: 3,
        backgroundColor: theme.palette.background.default, // Example: use your theme
      }}
    >
      <Typography variant="h1" component="h1" sx={{ fontSize: '6rem', mb: 2 }}>
        404
      </Typography>
      <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
        Oops! Page Not Found.
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, maxWidth: '600px' }}>
        Looks like this page got lost in the blueprints. We can't find the page you're looking for.
      </Typography>
      <Link href="/" passHref>
        <Button variant="contained" color="primary" size="large">
          Go to Homepage
        </Button>
      </Link>
      {/* You can add more links here */}
      <Link href="/services" passHref>
        <Button variant="text" color="secondary" sx={{ mt: 2 }}>
          Explore Our Services
        </Button>
      </Link>
    </Box>
  );
}

export default  Custom404;