import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, Alert } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useFirebaseCollections } from '../../../contexts/FirebaseCollectionContext/FirebaseCollectionContext';

const initialState = {
  header: '',
  body: '',
  images: [''],
  keywords: [''],
};

const BlogForm = ({ setOpen }) => {
  const [formData, setFormData] = useState(initialState);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { createBlogPost } = useFirebaseCollections();

  const handleClear = () => {
    setFormData(initialState);
    setImageFiles([]);
    setImagePreviews([]);
    setUploadError(null);
    setUploadSuccess(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnChangeBody = (value) => {
    setFormData({ ...formData, body: value });
  };

  const handleArrayChange = (e, index, arrayName) => {
    const { value } = e.target;
    const newArray = [...formData[arrayName]];
    newArray[index] = value;
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const addKeyword = () => {
    setFormData({ ...formData, keywords: [...formData.keywords, ''] });
  };

  const removeKeyword = (index) => {
    const newKeywords = formData.keywords.filter((_, i) => i !== index);
    setFormData({ ...formData, keywords: newKeywords });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    setImageFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const transformFormData = (data) => {
    const trimString = (str) => str.trim();
    const trimArray = (arr) => arr.map((item) => (typeof item === 'string' ? trimString(item) : item));

    return {
      ...data,
      header: trimString(data.header),
      keywords: trimArray(data.keywords),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transformedData = transformFormData(formData);

      const result = await createBlogPost(transformedData, imageFiles);

      if (result.success) {
        setUploadSuccess(true);
        setUploadError(null);
        handleClear();
      } else {
        setUploadError('Error uploading images and blog post. Please try again.');
      }
    } catch (error) {
      setUploadError('An unexpected error occurred. Please try again.');
    }

    setOpen(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Header" name="header" value={formData.header} onChange={handleChange} fullWidth />
      {/* <ReactQuill
        value={formData.body}
        onChange={(value) => handleOnChangeBody(value)}
        placeholder="Write the details of your blog post here..."
      /> */}
      <Typography variant="h6">Keywords</Typography>
      {formData.keywords.map((keyword, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            label={`Keyword ${index + 1}`}
            name={`keyword-${index}`}
            value={keyword}
            onChange={(e) => handleArrayChange(e, index, 'keywords')}
            fullWidth
          />
          <IconButton onClick={() => removeKeyword(index)}>
            <Remove />
          </IconButton>
        </Box>
      ))}
      <Button onClick={addKeyword} startIcon={<Add />}>
        Add Keyword
      </Button>

      <input type="file" multiple id="image-upload" onChange={handleImageChange} style={{ display: 'none' }} />
      <Button variant="contained" component="label" htmlFor="image-upload">
        Upload Images
      </Button>

      {imagePreviews.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {imagePreviews.map((preview, index) => (
            <Box key={index} sx={{ position: 'relative' }}>
              <img src={preview} alt={`Image ${index + 1}`} style={{ maxWidth: '150px', maxHeight: '150px' }} />
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  minWidth: 'auto',
                }}
                onClick={() => {
                  const newImageFiles = imageFiles.filter((_, i) => i !== index);
                  const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
                  setImageFiles(newImageFiles);
                  setImagePreviews(newImagePreviews);
                }}
              >
                X
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {uploadError && <Alert severity="error">{uploadError}</Alert>}
      {uploadSuccess && <Alert severity="success">Images uploaded successfully!</Alert>}

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default BlogForm;
