import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 10,
    px: 4,
    py: 2,
};

const CustomModal = ({ open, handleClose, title, children }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
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