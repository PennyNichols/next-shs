import React, { useRef, useState, useEffect } from 'react';
import { Chip, Tooltip, ChipProps, TooltipProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { RemoveCircleOutline } from '@mui/icons-material';

interface TruncatedChipProps extends Omit<ChipProps, 'ref'> {
  label: string;
  onDelete?: () => void;
  tooltipPlacement?: TooltipProps['placement'];
}

/**
 * A wrapper around Mui Chip that adds a tooltip only if its label text is truncated,
 * and makes the delete icon visible only on hover.
 *
 * @param {object} props - The component props.
 * @param {string} props.label - The visible text label for the Chip.
 * @param {function} [props.onDelete] - Callback for when the delete icon is clicked.
 * @param {"bottom" | "left" | "right" | "top" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start"} [props.tooltipPlacement] - The position of the tooltip relative to the Chip.
 * @param {object} [props.chipProps] - Additional props to pass directly to the Mui Chip component.
 */
const TruncatedChip: React.FC<TruncatedChipProps> = ({ label, onDelete, tooltipPlacement = 'top', ...chipProps }) => {
  const chipRef = useRef(null); // Ref to the root DOM element of the Chip
  const [isTruncated, setIsTruncated] = useState(false);

  // Effect to check if the Chip's internal label text is truncated
  useEffect(() => {
    const checkTruncation = () => {
      if (chipRef.current) {
        // Query the DOM for the specific span element that renders the Chip's label
        const labelElement = chipRef.current.querySelector('.MuiChip-label');
        if (labelElement) {
          // Compare the full width of the content (scrollWidth) with the visible width (clientWidth)
          setIsTruncated(labelElement.scrollWidth > labelElement.clientWidth);
        }
      }
    };

    // Run the check on initial render, and whenever the label text changes
    checkTruncation();

    // Re-check on window resize, as available space for the chip can change
    window.addEventListener('resize', checkTruncation);
    return () => window.removeEventListener('resize', checkTruncation);
  }, [label]); // Re-run this effect if the `label` prop text changes

  const handleDeleteClick = (event) => {
    // Stop propagation so clicking the delete icon doesn't also trigger
    // any parent click handlers on the Chip itself (if it has an onClick).
    event.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  // IMPORTANT: We need to create the deleteIcon element directly to attach onMouseDown
  const deleteIconElement = (
    <RemoveCircleOutline
      fontSize="small"
      // This is the crucial part: stop the MOUSE DOWN event from propagating.
      // The Select component often opens its menu on mousedown.
      onMouseDown={(event) => {
        event.stopPropagation();
      }}
      onClick={handleDeleteClick} // Keep your existing onClick for the actual delete action
    />
  );

  return (
    <Tooltip
      title={label} // The full text for the tooltip
      disableHoverListener={!isTruncated}
      disableFocusListener={!isTruncated}
      disableTouchListener={!isTruncated}
      placement={tooltipPlacement}
      arrow
    >
      <Chip
        ref={chipRef} // Attach the ref to the root of the Chip component
        label={label} // The actual visible label text, will be ellipsized by Chip's default CSS
        onDelete={handleDeleteClick} // Attach the delete handler
        deleteIcon={deleteIconElement} // Use a smaller Close icon for consistency
        sx={{
          // Styles to control the visibility of the delete icon on hover
          '& .MuiChip-deleteIcon': {
            display: 'none',
            marginRight: 0,
            marginLeft: 0.1,
            opacity: 0,
            transition: 'opacity 0.2s ease-in-out, visibility 0s linear 0.2s',
          },
          '&:hover .MuiChip-deleteIcon': {
            display: 'block',
            opacity: 1,
            transition: 'opacity 0.2s ease-in-out, visibility 0s linear 0s',
          },
        }}
        {...chipProps} // Pass any other props (e.g., variant, color) to the Chip
      />
    </Tooltip>
  );
};

export default TruncatedChip;
