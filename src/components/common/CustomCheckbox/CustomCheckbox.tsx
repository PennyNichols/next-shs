import { Check } from '@mui/icons-material';
import { Box, Checkbox } from '@mui/material';
import { customBorderRadius, customTransitions } from '@/styles/theme/otherThemeConstants';
import theme from '@/styles/theme';

const CustomCheckbox = ({ checked = false, onChange = null, name = '' }) => {
  return (
    <Box
      className="checkbox-container"
      sx={{
        overflow: 'visible',
        display: 'block',
        maxWidth: 19,
        maxHeight: 19,
        margin: theme.spacing(1, 1.5, 0, 0),
        boxSizing: 'border-box',
        border: `2px solid ${theme.palette.secondary.dark}`,
        borderRadius: customBorderRadius.small,
        transition: customTransitions.standard,
        [theme.breakpoints.down('sm')]: {
          maxWidth: 16,
          maxHeight: 16,
        },
        '&:hover': {
          borderColor: theme.palette.primary.light,
        },
      }}
    >
      <Checkbox
        onChange={onChange}
        name={name}
        checkedIcon={
          <Check
            sx={{
              color: 'inherit',
              transition: customTransitions.standard,
              paddingBottom: theme.spacing(0.4),
              [theme.breakpoints.down('sm')]: {
                transform: 'scale(1.7)',
                paddingRight: theme.spacing(0.45),
                paddingBottom: theme.spacing(0.5),
              },
            }}
          />
        }
        icon={<Check sx={{ color: 'transparent' }} />}
        checked={checked}
        sx={{
          color: theme.palette.secondary.dark,
          position: 'relative',
          top: -4,
          left: -1,
          transform: 'scale(1.2)',
          overflow: 'visible',

          [theme.breakpoints.down('sm')]: {
            top: -5,
            left: -1,
          },
          '&:hover': {
            color: theme.palette.primary.light,
          },
          '& .PrivateSwitchBase-input': {
            width: 36,
            height: 36,
          },
          '& .MuiTouchRipple-root': {
            overflow: 'visible',
            position: 'absolute',
            // backgroundColor: 'red',
            width: 22,
            height: 22,
            top: -2,
            left: -2,
            [theme.breakpoints.down('sm')]: {
              width: 20,
              height: 20,
              top: -3,
              left: -3,
            },
            '& .MuiTouchRipple-child': {
              borderRadius: customBorderRadius.small,
            },
          },
          '& .MuiSvgIcon-root': {
            position: 'absolute',
            transform: 'scale(1.5)',
            backgroundColor: 'transparent',
            // transition: customTransitions.fast,
            left: 3,
            top: 1,
            [theme.breakpoints.down('sm')]: {
              left: 5.5,
              top: -2,
            },
          },
        }}
      />
    </Box>
  );
};

export default CustomCheckbox;