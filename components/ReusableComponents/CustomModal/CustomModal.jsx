import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { customBorderRadius } from '@/theme/otherThemeConstants';

const CustomModal = ({ open, handleClose, title, children }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '100%', sm: 400 },
          maxHeight: { xs: '100vh', sm: '90vh' },
          height: { xs: '100%', sm: 'auto' },
          backgroundColor: 'background.paper',
          borderRadius: customBorderRadius.small,
          boxShadow: 3,
          padding: '2 4 3',
          zIndex: 'Index.modal',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box id="modal-description" sx={{ mt: 2 }}>
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
