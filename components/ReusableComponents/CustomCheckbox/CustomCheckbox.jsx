import { Check } from '@mui/icons-material';
import { Box, Checkbox } from '@mui/material';

const CustomCheckbox = ({ checked = false, onChange = null, name = '' }) => {
  return (
    <Box className="checkbox-container">
      <Checkbox
        onChange={onChange}
        name={name}
        className="custom-checkbox"
        checkedIcon={<Check className="custom-checkbox-checked" />}
        icon={<Check className="custom-checkbox-unchecked" sx={{ color: 'transparent' }} />}
        checked={checked}
      />
    </Box>
  );
};

export default CustomCheckbox;
