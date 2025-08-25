import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  ListSubheader,
  Typography,
  FormHelperText,
} from '@mui/material';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import TruncatedChip from '../TruncatedChip/TruncatedChip';

/**
 * @typedef {Object} SelectOptionItem
 * @property {string} title
 * @property {string} [description]
 */

/**
 * @typedef {Object} SelectOptionGroup
 * @property {string} sectionTitle
 * @property {SelectOptionItem[]} typesOfWork
 */

/**
 * A generic reusable multi-select component for grouped options with checkboxes.
 * Can be used with React Hook Form's Controller or directly with state.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The main label for the select input.
 * @param {string[]} props.fieldValue - An array of selected item titles (values).
 * @param {function(string[]): void} props.onChange - The change handler function.
 * @param {boolean} [props.required=false] - Whether the input is required.
 * @param {SelectOptionGroup[]} props.options - An array of grouped options to display.
 * @param {boolean} [props.error=false] - If true, the component will be in an error state.
 * @param {string} [props.helperText] - Helper text or error message to display below the input.
 * @param {React.ElementType} [props.checkboxComponent=MuiCheckbox] - Optional: A custom checkbox component to use for each MenuItem.
 * @param {object} [props.selectProps] - Additional props to pass directly to the Mui Select component.
 * @param {object} [props.formControlProps] - Additional props to pass directly to the Mui FormControl component.
 * @param {number} [props.menuMaxHeight=300] - Maximum height for the dropdown menu.
 * @param {string} [props.listSubheaderVariant="h4"] - Typography variant for list subheaders.
 * @param {string} [props.listSubheaderColor="background.paper"] - Typography color for list subheaders.
 */
const GroupedMultiSelect = ({
  label,
  fieldValue,
  onChange,
  required = false,
  options,
  error = false,
  helperText,
  selectProps = {},
  formControlProps = {},
  menuMaxHeight = 300,
  listSubheaderVariant = 'h4',
  listSubheaderColor = 'background.paper',
}) => {
  console.log('fieldValue', fieldValue);
  const uniqueId = React.useId();
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

  const handleChipDelete = (val) => {
    const newSelectedValues = (fieldValue || []).filter((value) => value !== val);
    onChange(newSelectedValues);
  };

  const hasChips = fieldValue.length > 0;

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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, paddingY: hasChips ? 1 : 0 }}>
            {Array.isArray(selected) &&
              selected.map((val) => <TruncatedChip key={val} label={val} onDelete={() => handleChipDelete(val)} />)}
          </Box>
        )}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: menuMaxHeight,
            },
            className: 'MuiSelect-dropdown-paper MuiSelect-dropdown-headers',
          },
        }}
        {...selectProps}
      >
        {options.map((section) => (
          <Box key={section.sectionTitle}>
            <ListSubheader>
              <Typography>{section.sectionTitle}</Typography>
            </ListSubheader>
            {section.typesOfWork.map((item) => (
              <MenuItem
                key={item.title}
                value={item.title}
                onClick={(event) => {
                  event.stopPropagation();
                  handleMenuItemClick(item.title);
                }}
              >
                <CustomCheckbox checked={fieldValue.includes(item.title)} />
                <Typography variant="body1" sx={{ textWrap: 'wrap' }}>
                  <b>{item.title}:</b> {item.description}
                </Typography>
              </MenuItem>
            ))}
          </Box>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default GroupedMultiSelect;
