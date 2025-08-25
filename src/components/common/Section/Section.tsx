import { Box } from '@mui/material';

const Section = ({ children, sx = {}, ...props }) => {
  return (
    <Box sx={{ marginY: 1, ...sx }} {...props}>
      {children}
    </Box>
  );
};

export default Section;
