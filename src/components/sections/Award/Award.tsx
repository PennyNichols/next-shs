import { Box } from '@mui/material';
import Image from 'next/image';

const Award = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: { xxs: 300, sm: 400, md: 200 },
      }}
    >
      <Image src="/images/awardRibbon.svg" alt="Award banner - top rated home services" width={200} height={200} />
    </Box>
  );
};

export default Award;
