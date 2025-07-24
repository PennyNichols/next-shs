import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
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
  DialogActions,
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
import { apiService } from '@/lib';
import { serviceAreaCalculator } from '@/lib/utils/utils';

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
      street1: '',
      street2: '',
      city: '',
      zip: '',
      phone: '',
      email: '',
      propertyType: '',
      hasPets: false,
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
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const [travelCharge, setTravelCharge] = useState<number>(0);
  const [travelChargeMessage, setTravelChargeMessage] = useState<string>('');
  const [outOfAreaDialogOpen, setOutOfAreaDialogOpen] = useState<boolean>(false);
  const [agreedToCharges, setAgreedToCharges] = useState<boolean>(false);
  const [pendingFormData, setPendingFormData] = useState<any>(null);

  const { executeRecaptcha } = useRecaptcha(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
  const { createEstimateRequest } = useFirebaseCollections();
  const { user } = useUser();

  const propertyTypeOptions = ['apartment', 'condo', 'duplex', 'house', 'townhouse', 'other'];

  // Mock function for checking email subscription status
  // Do not have subscriptions set up yet
  const checkEmailSubscriptionStatus = async (email) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return email === 'test@example.com';
  };

  // Effect to pre-fill form data if user is authenticated
  // useEffect(() => {
  //   const defaultServiceAddress = user?.serviceAddresses?.find((addr) => addr.isDefault);
  //   if (user) {
  //     setValue('firstName', user.first || '');
  //     setValue('lastName', user.last || '');
  //     setValue('email', user.email || '');
  //     setValue('phone', user.phone || '');
  //     if (defaultServiceAddress) {
  //       setValue('street1', defaultServiceAddress.street1 || '');
  //       setValue('street2', defaultServiceAddress.street2 || '');
  //       setValue('city', defaultServiceAddress.city || '');
  //       setValue('zip', defaultServiceAddress.zip || '');
  //       setValue('hasPets', defaultServiceAddress.hasPets || false);
  //       setValue('ownerOccupied', defaultServiceAddress.ownerOccupied || false);
  //       setValue('propertyType', defaultServiceAddress.propertyType || '');
  //       setValue('saveServiceAddress', false);
  //     }
  //   } else {
  //     // If user logs out or is not logged in, reset pre-filled fields in RHF
  //     setValue('firstName', '');
  //     setValue('lastName', '');
  //     setValue('email', '');
  //     setValue('phone', '');
  //     setValue('street1', '');
  //     setValue('street2', '');
  //     setValue('city', '');
  //     setValue('zip', '');
  //     setValue('hasPets', false);
  //     setValue('ownerOccupied', false);
  //     setValue('propertyType', '');
  //     setValue('saveServiceAddress', false);
  //   }
  // }, [user, setValue]);

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
  }, [email]);

  const handleClear = () => {
    reset();
    setImageFiles([]);
    setImagePreviews([]);
    setUploadError(null);
    setUploadSuccess(false);
    setIsEmailSubscribed(false);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prevFiles) => [...prevFiles, ...files]);

    const previews = files.map((file: Blob) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== indexToRemove));
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== indexToRemove));
  };

  const finalizeSubmission = async (data) => {
    setSubmissionError(null);

    try {
      const token = await executeRecaptcha('estimate_request_form');
      if (!token) {
        setSubmissionError('reCAPTCHA verification failed: No token received. Please try again.');
        console.error('reCAPTCHA: Token generation failed.');
        return;
      }

      const recaptchaResponse = await apiService.post('/verify-recaptcha', { token });

      if (recaptchaResponse.data.success) {
        console.log('reCAPTCHA verified successfully. Score:', recaptchaResponse.data.score);

        await transformAndSubmitData(data);
      } else {
        const errorMessage = recaptchaResponse.data.message || 'reCAPTCHA verification failed. Please try again.';
        setSubmissionError(errorMessage);
        console.error('reCAPTCHA verification failed on backend:', errorMessage, recaptchaResponse.data.errorCodes);
      }
    } catch (error: any) {
      console.error('Error during form submission:', error);
      setSubmissionError(
        error.response?.data?.message || 'An unexpected error occurred during submission. Please try again.',
      );
    }
  };

  const transformAndSubmitData = async (data) => {
    const trimString = (str) => (typeof str === 'string' ? str.trim() : str);
    const defaultServiceAddress = user.serviceAddresses?.find((addr) => addr.isDefault);
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
      userId: user?.id || null,
      firstName: user?.first || trimString(data.firstName),
      lastName: user?.last || trimString(data.lastName),
      phone: user?.phone || trimString(data.phone),
      email: user?.email || trimString(data.email),
      street1: defaultServiceAddress?.street1 || trimString(data.street1),
      street2: defaultServiceAddress?.street2 || trimString(data.street2),
      city: defaultServiceAddress?.city || trimString(data.city),
      zip: defaultServiceAddress?.zip || trimString(data.zip),
      hasPets: defaultServiceAddress?.hasPets || data.hasPets,
      ownerOccupied: defaultServiceAddress?.ownerOccupied || data.ownerOccupied,
      propertyType: defaultServiceAddress?.propertyType || data.propertyType,
      details: trimString(data.details),
      images: uploadedImageUrls, // Store URLs (empty array if upload failed)
      travelCharge: travelCharge,
      travelChargeMessage: travelChargeMessage,
      date_created: new Date().toISOString(),
      createdBy: user?.id || null, // Use user.id instead of user.uid
      saveServiceAddress: user ? data.saveServiceAddress : false, // Only relevant if authenticated
    };

    try {
      const result = await createEstimateRequest(finalData);
      handleClear(); // Reset form data and state
      setOpen(false);
    } catch (error) {
      console.error('Error submitting estimate request: ', error);
    }
  };
  const onSubmit = async (data: any) => {
    const result = await serviceAreaCalculator(data.street1 + ', ' + data.city + ', FL ' + data.zip);
    console.log(result);

    const { travelSurchargeMessage, travelSurcharge } = result as {
      travelSurchargeMessage: string;
      travelSurcharge: number;
    };

    if (travelSurcharge) {
      setTravelCharge(travelSurcharge);
      setTravelChargeMessage(travelSurchargeMessage);
      setPendingFormData(data);
      setAgreedToCharges(false);
      setOutOfAreaDialogOpen(true);
    } else {
      await finalizeSubmission(data);
    }
  };

  const handleApproveAndSubmit = async () => {
    if (pendingFormData) {
      setOutOfAreaDialogOpen(false);
      await finalizeSubmission(pendingFormData);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="estimate-request-dialog-title"
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: {} }}
      >
        <DialogTitle id="estimate-request-dialog-title" sx={{}}>
          <span style={{ flexGrow: 1 }}>Request an Estimate</span>
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
              <Grid item xxs={12}>
                <Typography variant="body1">Please fill out the form below to request an estimate.</Typography>
              </Grid>
              <Grid item xxs={12} sm={6}>
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
                      disabled={!!user?.first} // Disable if pre-filled by user object
                    />
                  )}
                />
              </Grid>
              <Grid item xxs={12} sm={6}>
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
                      disabled={!!user?.last}
                    />
                  )}
                />
              </Grid>
              <Grid item xxs={12} sm={6}>
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
              <Grid item xxs={12} sm={6}>
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
                      disabled={!!user?.phone} // Disable if pre-filled by user object
                    />
                  )}
                />
              </Grid>
              <Grid item xxs={12}>
                <Controller
                  name="street1"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      label="Street Address 1"
                      fullWidth
                      required
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                />
                <Controller
                  name="street2"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      label="Street Address 2"
                      fullWidth
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                />
                <Controller
                  name="city"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      label="City"
                      fullWidth
                      required
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                />
                <Controller
                  name="zip"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <CustomTextField
                      {...field}
                      label="Zip Code"
                      fullWidth
                      required
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                />
                {user && (
                  <Controller
                    name="saveServiceAddress"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<CustomCheckbox {...field} checked={field.value} />}
                        label={<Typography variant="body2">Save service address to my profile</Typography>}
                        sx={{ mt: 1 }}
                      />
                    )}
                  />
                )}
              </Grid>
              {/* Property Type Dropdown */}
              <Grid item xxs={12} sm={6}>
                <Controller
                  name="propertyType"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth required error={!!error}>
                      <InputLabel id="property-type-label">Property Type</InputLabel>
                      <Select labelId="property-type-label" id="propertyType" label="Property Type" {...field}>
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
              <Grid item xxs={12} sm={6} container spacing={2} sx={{ pl: 2 }}>
                <Grid item xxs={12} sm={6}>
                  <Controller
                    name="hasPets"
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
                <Grid item xxs={12} sm={6}>
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
              <Grid item xxs={12}>
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
              {/* Additional Details */}
              <Grid item xxs={12}>
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
                xxs={12}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <Button variant="contained" component="label" sx={{ width: '100%', mb: { xxs: 1, sm: 2 } }}>
                  <CloudUpload sx={{ mr: 1 }} />
                  Upload Image(s)
                  <input type="file" multiple accept="image/*" hidden onChange={handleImageChange} />
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
                <Grid item xxs={12}>
                  <Controller
                    name="subscribeToMarketing"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<CustomCheckbox {...field} checked={field.value} />}
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
                <Grid item xxs={12} sm={6}>
                  <ActionButton type="button" fullWidth variant="outlined" text="Clear" onClick={handleClear} />
                </Grid>
                <Grid item xxs={12} sm={6}>
                  <ActionButton type="submit" fullWidth variant="contained" text="Submit" disabled={isSubmitting} />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
      {/* --- Out of Service Area Alert Dialog --- */}
      <Dialog open={outOfAreaDialogOpen} onClose={() => setOutOfAreaDialogOpen(false)}>
        <DialogTitle>Service Area Alert</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="body1" gutterBottom>
            {travelChargeMessage} Please approve to continue with your request, or decline to cancel.
          </Typography>
          <FormControlLabel
            control={
              <CustomCheckbox checked={agreedToCharges} onChange={(e) => setAgreedToCharges(e.target.checked)} />
            }
            label="I understand and agree to potential additional charges."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOutOfAreaDialogOpen(false)}>Decline</Button>
          <Button onClick={handleApproveAndSubmit} variant="contained" disabled={!agreedToCharges}>
            Approve & Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EstimateRequestForm;
