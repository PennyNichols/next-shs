'use client';
import { SmsButton, CallButton, EstimateRequestButton } from '@/components/action-buttons';
import { useMedia } from '@/hooks';
import { Grid } from '@mui/material';

const HeroActionArea = () => {

  const { isXs, isSm, isMd, isLg, isXl } = useMedia();

  let size;

  if (isXs) {
    size = 'medium';
  } else if (isSm) {
    size = 'medium';
  } else if (isMd) {
    size = 'large';
  } else if (isLg) {
    size = 'large';
  } else if (isXl) {
    size = 'large';
  }



  return (
    <Grid
      container
      spacing={{ xs: 2, xl: 6 }}
      sx={{
        maxWidth: {xs: '100%', md:'90%'},
        alignSelf: 'flex-end',
      }}
      justifyContent={{ xs: 'center', xl: 'space-between' }}
      alignItems="center"
    >
      <Grid item xs={12} sm={6} lg={4}>
        <CallButton size={size} />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <SmsButton size={size} />
      </Grid>
      <Grid item xs={12} sm={12} lg={4}>
        <EstimateRequestButton size={size} fullWidth={true} />
      </Grid>
    </Grid>
  );
};

export default HeroActionArea;
