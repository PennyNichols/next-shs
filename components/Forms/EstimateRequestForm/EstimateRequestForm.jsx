import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Box from '@mui/material/Box';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../../firebase';
import useStyles from './EstimateRequestForm.styles';
import useRecaptcha from '../../../hooks/useRecaptcha';
import ActionButton from '../../ReusableComponents/ActionButton/ActionButton';
import { Button, IconButton, Alert } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const EstimateRequestForm = ({ setOpen }) => {
  const initialData = {
    name: '',
    address: '',
    phone: '',
    email: '',
    scopeOfWork: {
      construction: false,
      plumbing: false,
      electrical: false,
      painting: false,
      miscellaneous: false,
    },
    details: '',
    images: [],
  };

  const classes = useStyles();

  const [formData, setFormData] = useState(initialData);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const { executeRecaptcha } = useRecaptcha(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        scopeOfWork: {
          ...prevData.scopeOfWork,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleClear = () => {
    setFormData(initialData);
    setImageFiles([]);
    setImagePreviews([]);
    setUploadError(null);
    setUploadSuccess(false);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const transformScopeOfWork = (scopeOfWork) => {
    return Object.keys(scopeOfWork).filter((key) => scopeOfWork[key]);
  };

  const transformFormData = async (data) => {
    const trimString = (str) => str.trim();

    try {
      const uploadedImageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const storageRef = ref(getStorage(), `images/${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          return getDownloadURL(snapshot.ref);
        }),
      );
      setUploadSuccess(true);
      setUploadError(null);
      return {
        ...data,
        name: trimString(data.name),
        address: trimString(data.address),
        phone: trimString(data.phone),
        email: trimString(data.email),
        scopeOfWork: transformScopeOfWork(data.scopeOfWork),
        images: uploadedImageUrls, // Store URLs
        date_created: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error uploading images:', error);
      setUploadError('Error uploading images. Please try again.');
      return { ...data, images: [] }; // Return data without images if upload fails
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await executeRecaptcha('contact_form'); // Action name
    if (token) {
      try {
        const transformedData = await transformFormData(formData);

        if (transformedData.images.length === 0 && uploadError) {
          return; // Don't submit if there's an upload error
        }

        const docRef = await addDoc(collection(db, 'estimateRequests'), transformedData);
        console.log('Document written with ID: ', docRef.id);
        console.log('form data:', transformedData);
        handleClear(); // Reset form data and isHuman state
      } catch (e) {
        console.error('Error adding document: ', e);
      }
      setOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box className={classes.formContainer}>
        <Box>
          <Typography mb={2}>Please fill out the form below to request an estimate.</Typography>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="dense"
            size="small"
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            margin="dense"
            size="small"
          />
          <TextField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            margin="dense"
            size="small"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="dense"
            size="small"
          />
          <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
            Scope of Work
          </Typography>
          <FormGroup>
            <Box sx={{ display: 'flex', gap: '30px', mb: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.scopeOfWork.carpentry}
                      onChange={handleChange}
                      name="carpentry"
                      size="small"
                    />
                  }
                  label="Carpentry"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.scopeOfWork.masonry}
                      onChange={handleChange}
                      name="masonry"
                      size="small"
                    />
                  }
                  label="Masonry"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.scopeOfWork.painting}
                      onChange={handleChange}
                      name="painting"
                      size="small"
                    />
                  }
                  label="Painting"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={formData.scopeOfWork.tile} onChange={handleChange} name="tile" size="small" />
                  }
                  label="Tile"
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.scopeOfWork.fencing}
                      onChange={handleChange}
                      name="fencing"
                      size="small"
                    />
                  }
                  label="Fencing"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.scopeOfWork.fixtures}
                      onChange={handleChange}
                      name="fixtures"
                      size="small"
                    />
                  }
                  label="Fixtures"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.scopeOfWork.miscellaneous}
                      onChange={handleChange}
                      name="miscellaneous"
                      size="small"
                    />
                  }
                  label="Miscellaneous"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={formData.scopeOfWork.other} onChange={handleChange} name="other" size="small" />
                  }
                  label="Other / Unsure"
                />
              </Box>
            </Box>
          </FormGroup>
          <TextField
            label="Additional Details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            margin="dense"
            size="small"
          />
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
                    sx={{ position: 'absolute', top: 0, right: 0, minWidth: 'auto' }}
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
        </Box>
        <Box>
          <Box mt={2} gap={2} display="flex" justifyContent="flex-end">
            <ActionButton buttonType="clear" buttonVariant="text" text="Clear" onClick={handleClear} />
            <ActionButton buttonType="submit" text="Submit" />
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default EstimateRequestForm;
