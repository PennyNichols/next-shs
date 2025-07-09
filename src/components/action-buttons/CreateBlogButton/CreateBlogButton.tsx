'use client';

import React, { useState } from 'react';
import { Create } from '@mui/icons-material';
import ActionButton from '@/components/common/ActionButton/ActionButton';
import CustomModal from '@/components/common/CustomModal/CustomModal';
import { BlogFormWYSIWYG } from '@/components/forms/BlogForm';

const CreateBlogButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ActionButton text="Write a new blog" onClick={handleOpen} icon={<Create />} />
      <CustomModal open={open} onClose={handleClose} title="New Blog">
        <BlogFormWYSIWYG setOpen={setOpen} />
      </CustomModal>
    </>
  );
};

export default CreateBlogButton;
