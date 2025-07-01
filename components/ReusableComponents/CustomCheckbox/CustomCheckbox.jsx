import theme from "@/theme";
import { customBorderRadius } from "@/theme/otherThemeConstants";
import { Check } from "@mui/icons-material";
import { Box, Checkbox } from "@mui/material";

const CustomCheckbox = ({checked=false, onChange=null, name=""}) => {
  return (
    <Box
      className="checkbox-container"
      sx={{
        overflow: 'visible',
        display: 'block',
        maxWidth: 19,
        maxHeight: 19,
        mt: 1,
        mr: 1.5,
        boxSizing: 'border-box',
        border: `2px solid ${theme.palette.secondary.dark}`,
        borderRadius: customBorderRadius.small,
      }}
    >
      <Checkbox
        onChange={onChange}
        name={name}
        checkedIcon={<Check sx={{ backgroundColor: 'transparent' }} />}
        icon={<Check sx={{ color: 'transparent', backgroundColor: 'transparent' }} />}
        sx={{
          overflow: 'visible',
          '& .MuiButtonBase-root': {},
          '& .MuiTouchRipple-root': {
            position: 'absolute',
            width: 30,
            height: 30,
            top: -6.5,
            left: -6.5,
          },
          '& .MuiSvgIcon-root': {
            position: 'absolute',
            transform: 'scale(1.5)',
            backgroundColor: 'transparent',
            // transition: customTransitions.fast,
            left: 3,
            top: -4,
          },
        }}
        checked={checked}
      />
    </Box>
  );
};

export default CustomCheckbox;
