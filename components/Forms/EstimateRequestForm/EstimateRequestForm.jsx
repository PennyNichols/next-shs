//come back and add subscribe to marketing checkbox:
//only appear if the email address entered is not already subscribed
//add option to save service address to user profile if authenticated
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
import {
  Button,
  IconButton,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Add, ExpandMore, Remove } from '@mui/icons-material';
import { useFirebaseCollections } from '../../../hooks/FirebaseService';
import useUser from '../../../hooks/useUser';
import { serviceCategories } from '../../../constants/services';

const EstimateRequestForm = ({ setOpen }) => {
  const initialData = {
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    propertyType: '',
    animalsOnPremises: false,
    ownerOccupied: false,
    scopeOfWork: [], // Initialize as an empty array
    details: '',
    images: [],
    date_created: '',
  };

  const classes = useStyles();

  const [formData, setFormData] = useState(initialData);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  console.log('formData', formData);
  const { executeRecaptcha } = useRecaptcha(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
  const { addEstimateRequest } = useFirebaseCollections();
  const { user } = useUser();
  const propertyTypeOptions = ['apartment', 'condo', 'duplex', 'house', 'townhouse', 'other'];

  const handleChange = (e) => {
    const { name, checked, type } = e.target;

    if (type === 'checkbox') {
      let foundSectionTitle = null;
      let foundWorkItem = null;

      serviceCategories.forEach((section) => {
        section.typeOfWork.forEach((work) => {
          const itemName = work.title.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (itemName === name) {
            foundSectionTitle = section.sectionTitle;
            foundWorkItem = { title: work.title, description: work.description };
          }
        });
      });

      if (foundSectionTitle && foundWorkItem) {
        setFormData((prevData) => {
          const updatedScopeOfWork = [...prevData.scopeOfWork];
          const workItemToAdd = {
            section: foundSectionTitle,
            title: foundWorkItem.title,
            description: foundWorkItem.description,
          };

          const existingIndex = updatedScopeOfWork.findIndex(
            (item) => item.section === foundSectionTitle && item.title === foundWorkItem.title,
          );

          if (checked) {
            if (existingIndex === -1) {
              updatedScopeOfWork.push(workItemToAdd);
            }
          } else {
            if (existingIndex !== -1) {
              updatedScopeOfWork.splice(existingIndex, 1);
            }
          }

          return { ...prevData, scopeOfWork: updatedScopeOfWork };
        });
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: e.target.value,
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
        firstName: user ? user.firstName : trimString(data.firstName),
        lastName: user ? user.lastName : trimString(data.lastName),
        address: user ? user.address : trimString(data.address),
        phone: user ? user.phoneNumber : trimString(data.phone),
        email: user ? user.email : trimString(data.email),
        propertyType: data.propertyType,
        scopeOfWork: transformScopeOfWork(data.scopeOfWork),
        details: trimString(data.details),
        images: uploadedImageUrls, // Store URLs
        date_created: new Date().toISOString(),
        createdBy: user ? user.uid : null, // Store the user ID if authenticated
      };
    } catch (error) {
      // console.error('Error uploading images:', error);
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

        const result = await addEstimateRequest(transformedData, imageFiles);
        handleClear(); // Reset form data and isHuman state
      } catch (e) {
        // console.error('Error adding document: ', e);
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
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            margin="dense"
            size="small"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            margin="dense"
            size="small"
          />
          <TextField
            label="Service Address"
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
          {/* Property Type Dropdown */}
          <FormControl fullWidth margin="dense" size="small">
            <InputLabel id="property-type-label">Property Type</InputLabel>
            <Select
              labelId="property-type-label"
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              label="Property Type"
              onChange={handleChange}
            >
              {propertyTypeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
            Scope of Work
          </Typography>
          <FormGroup>
            {serviceCategories.map((section, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls={`panel-${index}-content`}
                  id={`panel-${index}-header`}
                >
                  <Typography>{section.sectionTitle}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {section.typeOfWork.map((work, idx) => {
                      const name = work.title.toLowerCase().replace(/[^a-z0-9]/g, '');
                      const isChecked = formData.scopeOfWork.some(
                        (item) => item.section === section.sectionTitle && item.title === work.title,
                      );
                      return (
                        <FormControlLabel
                          key={idx}
                          control={<Checkbox checked={isChecked} onChange={handleChange} name={name} size="small" />}
                          label={
                            <Typography>
                              <strong>{work.title}:</strong> {work.description}
                            </Typography>
                          }
                        />
                      );
                    })}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
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
