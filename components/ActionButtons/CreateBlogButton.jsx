import React, { useState } from 'react';
import CustomModal from '../ReusableComponents/CustomModal/CustomModal';
import ActionButton from '../ReusableComponents/ActionButton/ActionButton';
import { Create } from '@mui/icons-material';
import BlogFormWYSIWYG from '../Forms/BlogForm/BlogFormWYSIWYG';

const CreateBlogButton = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>

            <ActionButton text='Write a new blog' onClick={handleOpen} icon={<Create />} />
            <CustomModal open={open} handleClose={handleClose} title="New Blog">
                <BlogFormWYSIWYG setOpen={setOpen} />
            </CustomModal>
        </>
    );
};

export default CreateBlogButton;