'use client';
import { SmsButton, CallButton, EstimateRequestButton } from '@/components/action-buttons';
import { useMedia } from '@/hooks';
import { Grid } from '@mui/material';

const HeroActionArea = () => {

  const { isXxs, isXs, isSm, isMd, isLg, isXl } = useMedia();

  let size;

  if (isXxs) {
    size = 'small';
  } else if (isXs) {
    size = 'small';
  } else if (isSm) {
    size = 'medium';
  } else if (isMd) {
    size = 'medium';
  } else if (isLg) {
    size = 'large';
  } else if (isXl) {
    size = 'large';
  }

  return (
    <Grid
      container
      spacing={{ xxs: 2, xl: 6 }}
      sx={{
        maxWidth: { xxs: '100%', md: '90%' },
        alignSelf: 'flex-end',
      }}
      justifyContent={{ xxs: 'center', xl: 'space-between' }}
      alignItems="center"
    >
      <Grid item xxs={12} sm={6} lg={4}>
        <CallButton size={size} />
      </Grid>
      <Grid item xxs={12} sm={6} lg={4}>
        <SmsButton size={size} />
      </Grid>
      <Grid item xxs={12} sm={12} lg={4}>
        <EstimateRequestButton size={size} fullWidth={true} />
      </Grid>
    </Grid>
  );
};

export default HeroActionArea;
