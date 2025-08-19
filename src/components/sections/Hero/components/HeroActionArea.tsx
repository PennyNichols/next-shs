'use client';
import { SmsButton, CallButton, EstimateRequestButton } from '@/components/action-buttons';
import { useMedia } from '@/hooks';
import theme from '@/styles/theme';
import { alpha, Grid } from '@mui/material';

const HeroActionArea = () => {
  return (
    <Grid
      container
      spacing={{ xxs: 2, lg: 3 }}
      sx={{
        maxWidth: { xxs: '100%', sm: '80%' },
        alignSelf: 'flex-end',
        mb: { xxs: 0, sm: 5, lg: 8 },
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xxs={12}>
        <EstimateRequestButton variant="contained" color="primary" fullWidth={true} />
      </Grid>
      <Grid item xxs={12} sm={6}>
        <CallButton
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: 'transparent',
            border: `2px solid ${theme.palette.background.paper}`,
            '&:hover': {
              backgroundColor: theme.palette.background.paper,
              color: 'black',
              mixBlendMode: 'screen',
            },
          }}
        />
      </Grid>
      <Grid item xxs={12} sm={6}>
        <SmsButton
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: 'transparent',
            border: `2px solid ${theme.palette.background.paper}`,
            '&:hover': {
              backgroundColor: theme.palette.background.paper,
              color: 'black',
              mixBlendMode: 'screen',
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default HeroActionArea;
