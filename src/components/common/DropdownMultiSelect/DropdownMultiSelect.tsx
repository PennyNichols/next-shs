import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography, FormHelperText, Chip } from '@mui/material';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import TruncatedChip from '../TruncatedChip/TruncatedChip';

/**
 * A generic reusable single-select dropdown component with CustomCheckboxes
 * for visual feedback within the dropdown menu.
 * Can be used with React Hook Form's Controller or directly with state.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The main label for the select input.
 * @param {object} props.field - The main label for the select input.
 * @param {string[]} props.fieldValue - The currently selected item's value.
 * @param {function(string[]): void} props.onChange - The change handler function for the selected value.
 * @param {boolean} [props.required=false] - Whether the input is required.
 * @param {array} props.options - An array of options to display in the dropdown.
 * @param {boolean} [props.error=false] - If true, the component will be in an error state.
 * @param {string} [props.helperText] - Helper text or error message to display below the input.
 * @param {object} [props.selectProps] - Additional props to pass directly to the Mui Select component.
 * @param {object} [props.formControlProps] - Additional props to pass directly to the Mui FormControl component.
 * @param {number} [props.menuMaxHeight=300] - Maximum height for the dropdown menu paper.
 */
const DropdownMultiSelect = ({
  label,
  field,
  fieldValue,
  onChange,
  required = false,
  options,
  error = false,
  helperText,
  selectProps = {},
  formControlProps = {},
  menuMaxHeight = 300,
}) => {
  const uniqueId = React.useId();

  const handleChipDelete = (val) => {
    const newSelectedValues = (fieldValue || []).filter((value) => value !== val);
    onChange(newSelectedValues);
  };

  const handleMenuItemClick = (selectedValue) => {
    const currentValues = Array.isArray(fieldValue) ? fieldValue : [];

    const newSelectedValues = currentValues.includes(selectedValue)
      ? currentValues.filter((value) => value !== selectedValue)
      : [...currentValues, selectedValue];

    onChange(newSelectedValues);
  };
  // Handle the internal MUI Select's onChange event
  const handleMuiSelectChange = (event) => {
    // MUI SelectChangeEvent's target.value is already the array of selected items
    onChange(event.target.value); // Pass the raw value (string[]) directly to the onChange prop
  };
  const hasChips = fieldValue.length > 0;
  console.log('field', field);
  return (
    <FormControl fullWidth required={required} error={error} {...formControlProps}>
      <InputLabel id={`label-${uniqueId}`}>{label}</InputLabel>
      <Select
        labelId={`label-${uniqueId}`}
        id={`select-${uniqueId}`}
        multiple
        label={label}
        value={fieldValue || []}
        onChange={() => {}}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, paddingY: hasChips ? 1 : 0, overflow: 'visible' }}>
            {Array.isArray(selected) &&
              selected.map((val) => <TruncatedChip key={val} label={val} onDelete={() => handleChipDelete(val)} />)}
          </Box>
        )}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: menuMaxHeight,
            },
            className: 'MuiSelect-dropdown-paper',
          },
        }}
        {...selectProps}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            onClick={(event) => {
              event.stopPropagation();
              handleMenuItemClick(option);
            }}
          >
            <CustomCheckbox checked={fieldValue.includes(option)} />
            <Typography variant="body1" sx={{ textWrap: 'wrap' }}>
              {option}
            </Typography>
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default DropdownMultiSelect;
