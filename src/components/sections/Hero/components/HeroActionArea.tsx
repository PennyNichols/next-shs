'use client';
import { SmsButton, CallButton, EstimateRequestButton } from '@/components/action-buttons';
import { useMedia } from '@/hooks';
import { Grid } from '@mui/material';

const HeroActionArea = () => {

  return (
    <Grid
      container
      spacing={{ xxs: 2, lg: 3, xl: 6 }}
      sx={{
        maxWidth: { xxs: '100%', md: '90%', xl: '100%' },
        alignSelf: 'flex-end',
        mb: { xxs: 0, sm: 3, lg: 4, xl: 6 },
      }}
      justifyContent={{ xxs: 'center', xl: 'space-between' }}
      alignItems="center"
    >
      <Grid item xxs={12} sm={6} xl={4}>
        <CallButton />
      </Grid>
      <Grid item xxs={12} sm={6} xl={4}>
        <SmsButton />
      </Grid>
      <Grid item xxs={12} sm={12} xl={4}>
        <EstimateRequestButton fullWidth={true} />
      </Grid>
    </Grid>
  );
};

export default HeroActionArea;
