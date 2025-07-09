import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import useRecaptcha from '../../../hooks/useRecaptcha';
import ActionButton from '../../common/ActionButton/ActionButton';
import {
  Button,
  IconButton,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  FormHelperText,
} from '@mui/material';
import { Close, CloudUpload } from '@mui/icons-material';
import { useFirebaseCollections } from '../../../contexts/FirebaseCollectionContext/FirebaseCollectionContext';
import useUser from '../../../hooks/auth/useUser';
import { SERVICE_CATEGORIES } from '../../../constants/services';
import { customBorderRadius } from '@/styles/theme/otherThemeConstants';
import CustomTextField from '@/components/common/CustomTextField';
import CustomCheckbox from '@/components/common/CustomCheckbox/CustomCheckbox';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { estimateRequestSchema } from './validation';
import GroupedMultiSelect from '@/components/common/GroupedMultiSelect/GroupedMultiSelect';

const EstimateRequestForm = ({ open, setOpen }) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(estimateRequestSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      email: '',
      propertyType: '',
      animalsOnPremises: false,
      ownerOccupied: false,
      scopeOfWork: [],
      details: '',
      subscribeToMarketing: false,
      saveServiceAddress: false,
    },
  });

  const email = watch('email');
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isEmailSubscribed, setIsEmailSubscribed] = useState(false); // State for email subscription status
  // const [showSubscribeCheckbox, setShowSubscribeCheckbox] = useState(false); // State to control checkbox visibility

  const { executeRecaptcha } = useRecaptcha(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
  const { addEstimateRequest } = useFirebaseCollections();
  const { user } = useUser(); // Hook to get authenticated user info

  const propertyTypeOptions = ['apartment', 'condo', 'duplex', 'house', 'townhouse', 'other'];

  // Mock function for checking email subscription status
  // Do not have subscriptions set up yet
  const checkEmailSubscriptionStatus = async (email) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return email === 'test@example.com';
  };

  // Effect to pre-fill form data if user is authenticated
  useEffect(() => {
    if (user) {
      setValue('firstName', user.firstName || '');
      setValue('lastName', user.lastName || '');
      setValue('email', user.email || '');
      setValue('phone', user.phoneNumber || '');
      setValue('address', user.homeAddress || '');
      // setValue('saveServiceAddress', false); // Can default to false or user's preference
    } else {
      // If user logs out or is not logged in, reset pre-filled fields in RHF
      setValue('firstName', '');
      setValue('lastName', '');
      setValue('email', '');
      setValue('phone', '');
      setValue('address', '');
      setValue('saveServiceAddress', false);
    }
  }, [user, setValue]); // Add setValue to dependencies

  // Effect to check email subscription status when email changes (and is not empty)
  useEffect(() => {
    const checkStatus = async () => {
      if (email) {
        // Use the watched email
        const subscribed = await checkEmailSubscriptionStatus(email);
        setIsEmailSubscribed(subscribed);
      } else {
        setIsEmailSubscribed(false);
      }
    };
    const handler = setTimeout(() => {
      checkStatus();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [email]); // Depend on the watched email

  // const handleChange = (e) => {
  //   const { name, value, checked, type } = e.target;

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: type === 'checkbox' ? checked : value,
  //   }));
  // };

  // // Dedicated handler for the multi-select dropdown
  // const handleScopeOfWorkChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     scopeOfWork: typeof value === 'string' ? value.split(',') : value, // On autofill we get a string of comma-separated values
  //   }));
  // };

  const handleClear = () => {
    reset();
    setImageFiles([]);
    setImagePreviews([]);
    setUploadError(null);
    setUploadSuccess(false);
    setIsEmailSubscribed(false); // Reset subscription status on clear
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prevFiles) => [...prevFiles, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== indexToRemove));
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== indexToRemove));
  };

  const transformAndSubmitData = async (data) => {
    const trimString = (str) => (typeof str === 'string' ? str.trim() : str);

    let uploadedImageUrls = [];
    try {
      if (imageFiles.length > 0) {
        uploadedImageUrls = await Promise.all(
          imageFiles.map(async (file) => {
            const storageRef = ref(getStorage(), `images/${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            return getDownloadURL(snapshot.ref);
          }),
        );
        setUploadSuccess(true);
        setUploadError(null);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      setUploadError('Error uploading images. Please try again.');
      // Do not return here; allow form submission without images if upload fails
    }

    // Construct the final data object, ensuring all fields are included
    const finalData = {
      ...data, // All RHF controlled fields are here
      firstName: user?.firstName || trimString(data.firstName),
      lastName: user?.lastName || trimString(data.lastName),
      address: user?.homeAddress || trimString(data.address),
      phone: user?.phoneNumber || trimString(data.phone),
      email: user?.email || trimString(data.email),
      details: trimString(data.details),
      images: uploadedImageUrls, // Store URLs (empty array if upload failed)
      date_created: new Date().toISOString(),
      createdBy: user?.uid || null,
      saveServiceAddress: user ? data.saveServiceAddress : false, // Only relevant if authenticated
    };

    try {
      const result = await addEstimateRequest(finalData);
      handleClear(); // Reset form data and state
      setOpen(false);
    } catch (error) {
      console.error('Error submitting estimate request: ', error);
      // Display user-friendly error message
    }
  };
  const onSubmit = async (data) => {
    const token = await executeRecaptcha('estimate_request_form');
    if (token) {
      await transformAndSubmitData(data); // Call your combined logic
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="estimate-request-dialog-title"
      fullWidth
      maxWidth="md"
      PaperProps={{ sx: {} }}
    >
      <DialogTitle id="estimate-request-dialog-title" sx={{}}>
        <Typography variant="h6" component="h2" color="inherit">
          Request an Estimate
        </Typography>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{}} // Added styling for close button
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{}}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body1">Please fill out the form below to request an estimate.</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomTextField
                    {...field}
                    label="First Name"
                    fullWidth
                    required
                    error={!!error}
                    helperText={error ? error.message : null}
                    disabled={!!user?.firstname} // Disable if pre-filled by user object
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomTextField
                    {...field}
                    label="Last Name"
                    fullWidth
                    required
                    error={!!error}
                    helperText={error ? error.message : null}
                    disabled={!!user?.lastName} // Disable if pre-filled by user object
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomTextField
                    {...field}
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    error={!!error}
                    helperText={error ? error.message : null}
                    disabled={!!user?.email} // Disable if pre-filled by user object
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomTextField
                    {...field}
                    label="Phone Number"
                    type="tel"
                    fullWidth
                    required
                    error={!!error}
                    helperText={error ? error.message : null}
                    disabled={!!user?.phoneNumber} // Disable if pre-filled by user object
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="address"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomTextField
                    {...field}
                    label="Service Address"
                    fullWidth
                    required
                    error={!!error}
                    helperText={error ? error.message : null}
                    disabled={!!user?.homeAddress} // Disable if pre-filled by user object
                  />
                )}
              />
              {user && (
                <Controller
                  name="saveServiceAddress"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value} // Use field.value for checked state
                          size="small"
                        />
                      }
                      label={<Typography variant="body2">Save service address to my profile</Typography>}
                      sx={{ mt: 1 }}
                    />
                  )}
                />
              )}
            </Grid>
            {/* Property Type Dropdown */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="propertyType"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth required error={!!error}>
                    <InputLabel id="property-type-label">Property Type</InputLabel>
                    <Select
                      labelId="property-type-label"
                      id="propertyType"
                      label="Property Type"
                      {...field} // Spreads value, onChange, onBlur, name
                    >
                      {propertyTypeOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                    {error && <FormHelperText>{error.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>
            {/* Animals on Premises and Owner Occupied Checkboxes */}
            <Grid item xs={12} sm={6} container spacing={2} sx={{ pl: 2 }}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="animalsOnPremises"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<CustomCheckbox {...field} checked={field.value} />}
                      label={
                        <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                          Animals on
                          <wbr /> Premises?
                        </Typography>
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="ownerOccupied"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<CustomCheckbox {...field} checked={field.value} />}
                      label={<Typography variant="body2">Owner Occupied?</Typography>}
                    />
                  )}
                />
              </Grid>
            </Grid>
            {/* Scope of Work - Multi-select Dropdown with Headers */}
            <Grid item xs={12}>
              <Controller
                name="scopeOfWork"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <GroupedMultiSelect
                    label="What services do you need?"
                    options={SERVICE_CATEGORIES}
                    fieldValue={field.value}
                    onChange={field.onChange} // Pass RHF's onChange
                    required={true}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </Grid>
            {/* --------------------------- */}
            {/* 
              <FormControl fullWidth required>
                <InputLabel id="scope-of-work-label">What services do you need?</InputLabel>
                <Select
                  labelId="scope-of-work-label"
                  multiple
                  label="What services do you need?"
                  value={formData.scopeOfWork}
                  onChange={handleScopeOfWorkChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                      },
                      className: 'MuiSelect-dropdown-paper MuiSelect-dropdown-headers', // Custom class for styling if needed
                    },
                  }}
                >
                  {SERVICE_CATEGORIES.map((section) => [
                    <ListSubheader key={section.sectionTitle}>
                      <Typography>{section.sectionTitle}</Typography>
                    </ListSubheader>,
                    section.typesOfWork.map((work) => (
                      <MenuItem key={work.title} value={work.title}>
                        <CustomCheckbox checked={formData.scopeOfWork.includes(work.title)} />
                        <Typography variant="body1" sx={{ textWrap: 'wrap' }}>
                          <b>{work.title}:</b> {work.description}
                        </Typography>
                      </MenuItem>
                    )),
                  ])}
                </Select>
              </FormControl>
            </Grid> */}
            {/* Additional Details */}
            <Grid item xs={12}>
              <Controller
                name="details"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomTextField
                    {...field}
                    label="Additional Details"
                    multiline
                    rows={3}
                    fullWidth
                    placeholder="Please provide any additional details about the work you need done."
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </Grid>
            {/* Image Upload */}
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <Button variant="contained" component="label" sx={{ width: '100%', mb: { xs: 1, sm: 2 } }}>
                <CloudUpload sx={{ mr: 1 }} />
                Upload Image(s)
                <input
                  type="file"
                  multiple
                  accept="image/*" // Accept any image type
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
              {imagePreviews.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
                  {imagePreviews.map((preview, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: 'relative',
                        width: 150,
                        height: 150,
                        border: '1px solid #ddd',
                        borderRadius: customBorderRadius,
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={preview}
                        alt={`Image ${index + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <IconButton
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          backgroundColor: 'rgba(255, 255, 255, 0.7)',
                          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
                        }}
                        onClick={() => handleRemoveImage(index)}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
              {uploadError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {uploadError}
                </Alert>
              )}
              {uploadSuccess && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  Images uploaded successfully!
                </Alert>
              )}
            </Grid>
            {/* Subscribe to marketing checkbox */}
            {!isEmailSubscribed && email && (
              <Grid item xs={12}>
                <Controller
                  name="subscribeToMarketing"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value} // Use field.value for checked state
                          size="small"
                        />
                      }
                      label={
                        <Typography variant="body2">
                          Subscribe to our marketing emails for updates and promotions.
                        </Typography>
                      }
                    />
                  )}
                />
              </Grid>
            )}
            {/* Submit Buttons */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <ActionButton type="button" fullWidth variant="outlined" text="Clear" onClick={handleClear} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ActionButton type="submit" fullWidth variant="contained" text="Submit" disabled={isSubmitting} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EstimateRequestForm;
