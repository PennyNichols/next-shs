import { alpha, Box } from '@mui/material';
import theme from '@/styles/theme';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { customBorderRadius } from '@/styles/theme/otherThemeConstants';

export const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <Box
      className={className}
      onClick={onClick}
      sx={{
        ...style,
        display: 'block',
        color: theme.palette.primary.main,
        borderRadius: customBorderRadius.circle,
        width: '20px !important',
        height: '20px !important',
        zIndex: 1,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
        },
      }}
    >
      <KeyboardArrowRight
        sx={{
          fontSize: '1.25rem',
          color: theme.palette.secondary.light,
          padding: 0,
          margin: 0,
          boxSizing: 'border-box',
          position: 'absolute',
          left: 1,
          top: 0,
          '&:hover': { color: theme.palette.primary.main },
        }}
      />
    </Box>
  );
};

export const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <Box
      className={className}
      onClick={onClick}
      sx={{
        ...style,
        display: 'block',
        color: theme.palette.primary.main,
        borderRadius: customBorderRadius.circle,
        zIndex: 1,
        width: '20px !important',
        height: '20px !important',
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
        },
      }}
    >
      <KeyboardArrowLeft
        sx={{
          fontSize: '1.25rem',
          color: theme.palette.secondary.light,
          padding: 0,
          margin: 0,
          boxSizing: 'border-box',
          position: 'absolute',
          left: -1,
          top: 0,
          '&:hover': { color: theme.palette.primary.main },
        }}
      />
    </Box>
  );
};
