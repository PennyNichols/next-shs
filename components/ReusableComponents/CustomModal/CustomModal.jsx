import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useStyles from './CustomModal.styles';

const CustomModal = ({ open, handleClose, title, children }) => {
    const classes = useStyles();

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box className={classes.outterContainer}>
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