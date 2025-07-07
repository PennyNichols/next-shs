// components/CustomModal.tsx
import React from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  useTheme,
  Fade,
  // Import SxProps and Theme for type annotations
  type SxProps,
  type Theme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Requires @mui/icons-material

// Define the props interface for the CustomModal component
interface CustomModalProps {
  /**
   * Controls whether the modal is open or closed.
   */
  open: boolean;
  /**
   * Callback function fired when the modal requests to be closed.
   */
  onClose: () => void;
  /**
   * The title of the modal. Can be a string or any React node (e.g., JSX).
   */
  title: React.ReactNode;
  /**
   * The main content of the modal.
   */
  children: React.ReactNode;
  /**
   * Optional actions (e.g., buttons) to display in the modal footer.
   */
  actions?: React.ReactNode;
  /**
   * Optional: Maximum width for the modal content area (e.g., '500px', 'md').
   * Uses MUI breakpoints (xs, sm, md, lg, xl) or custom values.
   * @default { xs: '90%', sm: 500 }
   */
  maxWidth?: string | number | { xs?: string | number, sm?: string | number, md?: string | number, lg?: string | number, xl?: string | number };
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown?: boolean;
  /**
   * The system prop that allows defining system overrides as well as
   * any CSS that you would like to apply to the inner content box (the "paper").
   */
  containerSx?: SxProps<Theme>;
  /**
   * The system prop that allows defining system overrides as well as
   * any CSS that you would like to apply to the root Modal component.
   */
  sx?: SxProps<Theme>;
}

/**
 * A reusable custom modal component built on Mui Modal for lightweight,
 * fully customizable overlays with theme integration.
 */
const CustomModal: React.FC<CustomModalProps> = ({ // Type annotation for functional component
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = { xs: '90%', sm: 500 }, // Default responsive max width
  disableEscapeKeyDown = false,
  containerSx, // sx for the inner content box
  sx // sx for the root Modal component
}) => {
  const theme = useTheme(); 

  const baseContentStyle: SxProps<Theme> = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: maxWidth, 
    maxHeight: '90vh', 
    overflowY: 'auto', 
    bgcolor: 'background.paper', 
    borderRadius: theme.shape.borderRadius, 
    boxShadow: theme.shadows[24], 
    display: 'flex',
    flexDirection: 'column', 
  };

  return (
    <Modal
      component={Box}
      open={open}
      onClose={onClose}
      disableEscapeKeyDown={disableEscapeKeyDown}
      closeAfterTransition // Helps with transition behavior
      slots={{ backdrop: Box }} // Ensures Backdrop component is a Box for sx prop
      slotProps={{
        backdrop: {
          sx: { backdropFilter: 'blur(2px)' }, // Example: Add a slight blur to the backdrop
        },
      }}
      sx={sx} // Apply any custom sx prop to the root Box element (since component={Box})
    >
      <Fade in={open}>
        <Box
          sx={{
            ...baseContentStyle,
            ...containerSx, // Apply custom styles for the container over base
          }}
        >
          {/* Modal Header/Title Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2, // Consistent padding
              borderBottom: `1px solid ${theme.palette.divider}`, // Theme-consistent divider
            }}
          >
            <Typography variant="h6" component="h2" id="custom-modal-title">
              {title}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{ color: (theme) => theme.palette.grey[500] }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Modal Content Section */}
          <Box
            id="custom-modal-description"
            sx={{
              p: 2, // Consistent padding
              flexGrow: 1, // Allows content to take up available space and handle overflow
              overflowY: 'auto', // Ensure content inside this box scrolls independently if needed
            }}
          >
            {children}
          </Box>

          {/* Modal Actions Section (optional) */}
          {actions && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end', // Align buttons to the right
                p: 2, // Consistent padding
                borderTop: `1px solid ${theme.palette.divider}`, // Theme-consistent divider
              }}
            >
              {actions}
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomModal;