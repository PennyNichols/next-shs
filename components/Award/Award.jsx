import { EmojiEvents, Star } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import useStyles from './Award.styles';
import Image from 'next/image';

const Award = () => {
  const classes = useStyles();
  return (
    <Box className={classes.awardContainer}>
      <Image src="/images/awardRibbon.svg" alt="Award banner - top rated home services" width={200} height={200} />
    </Box>
  );
};

export default Award;
