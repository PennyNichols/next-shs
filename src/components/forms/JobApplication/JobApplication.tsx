import React from 'react';
import {
  Box,
  Button,
  Typography,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  FormLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import CustomTextField from '../../common/CustomTextField';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CERTIFICATIONS } from '../../../constants/careers';
import { SERVICE_CATEGORIES } from '../../../constants/services';
import { AttachMoney, CloudUpload } from '@mui/icons-material';
import theme from '@/styles/theme';
import { customBorderRadius } from '@/styles/theme/otherThemeConstants';
import GroupedMultiSelect from '@/components/common/GroupedMultiSelect/GroupedMultiSelect';
import DropdownSelect from '@/components/common/DropdownMultiSelect/DropdownMultiSelect';
import ContentBox from '@/components/common/ContentBox/ContentBox';
import Section from '@/components/common/Section/Section';
import PageTitle from '@/components/common/PageTitle/PageTitle';
import ActionButton from '@/components/common/ActionButton/ActionButton';

const certificationOptions = CERTIFICATIONS;

const schema = yup.object().shape({
  firstName: yup.string().required('First name required'),
  lastName: yup.string().required('Last name required'),
  email: yup.string().email('Invalid email').required('Email required'),
  phone: yup.string().required('Phone required'),
  address: yup.string().required('Address required, if you do not have one, provide N/A'),
  city: yup.string().required('City required'),
  state: yup.string().required('State required'),
  zip: yup.string().required('ZIP required'),
  experience: yup.number().typeError('Must be a number').min(0, 'Must be at least 0').required('Experience required'),
  expectedPay: yup
    .number()
    .typeError('Expected pay must be a number')
    .min(15, 'Expected pay cannot be negative')
    .max(40, 'Must be $40 or less')
    .required('Expected pay is required'),
  expectedHours: yup
    .number()
    .typeError('Must be a number')
    .min(5, 'Must be at least 5')
    .max(40, 'Must be 40 or less')
    .required('Expected Hours required'),
  certifications: yup.array(),
  skills: yup.array().min(1, 'Select at least one skill'),
  eligible: yup.string().required('Eligibility required'),
  references: yup.string().required('References required'),
  resume: yup
    .mixed()
    .test('fileRequired', 'Resume required', (value) => {
      if (!value) return false;
      if (Array.isArray(value)) return value.length > 0;
      if (value instanceof FileList) return value.length > 0;
      return false;
    })
    .test(
      'fileType',
      'Unsupported file format',
      (value) =>
        !value ||
        ((Array.isArray(value) || value instanceof FileList) &&
          value.length > 0 &&
          [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          ].includes(value[0]?.type)),
    ),
  coverLetter: yup.string(),
});

const JobApplication = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      experience: null,
      expectedPay: null,
      expectedHours: null,
      certifications: [],
      skills: [],
      eligible: '',
      references: '',
      resume: null,
      coverLetter: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    alert('Application submitted!');
  };

  // For file input display
  const resumeFile = watch('resume');

  return (
    <Paper
      sx={{
        p: 4,
        mb: 4,
        mt: 1,
        borderRadius: { xxs: customBorderRadius.none, sm: customBorderRadius.small },
        margin: '0 auto',
        width: { xxs: '100%', sm: 'auto' },
        maxWidth: { xxs: '100%', sm: 700 },
      }}
    >
      <Section>
        <PageTitle component="h2" sx={{ fontSize: '1.6rem' }}>
          SHS <wbr />
          Employment Application
        </PageTitle>
      </Section>
      <Section>
        <ContentBox sx={{ mb: 4 }}>
          <Typography>
            We are seeking skilled, reliable, and professional team members to deliver exceptional service to our
            discerning clientele. Please complete the form below with care and attention to detail.
          </Typography>
        </ContentBox>
      </Section>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3}>
          {/* Work Eligibility */}
          <Grid item order={1} xxs={12} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <FormControl
              required
              error={!!errors.eligible}
              className="MuiFormControl-radioGroup job-application"
              sx={{
                alignItems: { xxs: 'flex-start', xs: 'center' },
                '& .MuiFormGroup-root': {
                  flexDirection: { xxs: 'column', xs: 'row' },
                  alignItems: { xxs: 'flex-start', xs: 'center' },
                },
              }}
            >
              <FormLabel
                id="eligible-radio-buttons-group-label"
                sx={{ whiteSpace: 'nowrap', marginTop: { xxs: 0.5, xs: 0 }, textAlign: { xxs: 'center', xs: 'left' } }}
              >
                Eligible to Work <wbr />
                in US?
              </FormLabel>
              <Controller
                name="eligible"
                control={control}
                render={({ field }) => (
                  <RadioGroup aria-labelledby="eligible-radio-buttons-group-label" name="eligible" {...field}>
                    <FormControlLabel
                      value="Yes"
                      control={<Radio size="small" />}
                      label={<Typography variant="body2">Yes</Typography>}
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio size="small" />}
                      label={<Typography variant="body2">No</Typography>}
                    />
                  </RadioGroup>
                )}
              />
              {errors.eligible && (
                <Typography variant="caption" color="error">
                  {errors.eligible.message}
                </Typography>
              )}
            </FormControl>
          </Grid>
          {/* Personal Info */}
          <Grid item order={2} xxs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  label="First Name"
                  required
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item order={3} xxs={12} sm={6}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  label="Last Name"
                  required
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item order={4} xxs={12} sm={6}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  label="Email"
                  required
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item order={5} xxs={12} sm={6}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  label="Phone"
                  required
                  type="tel"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item order={6} xxs={12}>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  label="Street Address"
                  required
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item order={7} xxs={12} sm={4}>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  label="City"
                  required
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item order={8} xxs={6} sm={4}>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  label="State"
                  required
                  error={!!errors.state}
                  helperText={errors.state?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item order={9} xxs={6} sm={4}>
            <Controller
              name="zip"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  label="ZIP"
                  required
                  error={!!errors.zip}
                  helperText={errors.zip?.message}
                  {...field}
                />
              )}
            />
          </Grid>

          {/* Experience */}
          <Grid item order={10} xxs={12} sm={4}>
            <Controller
              name="experience"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  label="Years of Experience"
                  required
                  type="number"
                  inputProps={{ min: 0 }}
                  error={!!errors.experience}
                  helperText={errors.experience?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          {/* Expected Pay */}
          <Grid item order={11} xxs={12} sm={4}>
            <Controller
              name="expectedPay"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  label="Expected Pay"
                  required
                  type="number"
                  inputProps={{ min: 15, max: 40 }}
                  startIcon={<AttachMoney />}
                  error={!!errors.expectedPay}
                  helperText={errors.expectedPay ? errors.expectedPay?.message : 'Per Hour'}
                  {...field}
                />
              )}
            />
          </Grid>
          {/* Expected Hours */}
          <Grid item order={12} xxs={12} sm={4}>
            <Controller
              name="expectedHours"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  label="Expected Hours"
                  required
                  type="number"
                  inputProps={{ min: 5, max: 40 }}
                  error={!!errors.expectedHours}
                  helperText={errors.expectedHours ? errors.expectedHours?.message : 'Per Week'}
                  {...field}
                />
              )}
            />
          </Grid>
          {/* Certifications */}
          <Grid item order={13} xxs={12}>
            <Controller
              name="certifications"
              control={control}
              render={({ field }) => (
                <DropdownSelect
                  field={field}
                  label="Which certifications do you have?"
                  fieldValue={field.value || []}
                  onChange={field.onChange}
                  options={certificationOptions}
                  error={!!errors.certifications}
                  helperText={errors.certifications ? errors.certifications.message : 'Select all that apply'}
                />
              )}
            />
          </Grid>
          {/* Skills */}
          <Grid item order={14} xxs={12}>
            <Controller
              name="skills"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <GroupedMultiSelect
                  label="Which skills do you have?"
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
          {/* References */}
          <Grid item order={15} xxs={12} mt={theme.spacing(1)}>
            <Controller
              name="references"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  label="Professional References"
                  required
                  multiline
                  minRows={2}
                  placeholder="Please provide at least two references."
                  error={!!errors.references}
                  helperText={errors.references ? errors.references.message : 'Names & Contact Info'}
                  {...field}
                />
              )}
            />
          </Grid>
          {/* Resume Upload */}
          <Grid
            item
            order={16}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: { xxs: '100%', sm: 'fit-content' },
              gap: theme.spacing(2),
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Typography variant="subtitle1" sx={{ color: 'secondary.dark' }}>
              Upload Resume (PDF or DOC)
            </Typography>
            <Controller
              name="resume"
              control={control}
              render={({ field }) => (
                <>
                  <Button fullWidth component="label" sx={{ mb: { xxs: 1, sm: 2 } }}>
                    <CloudUpload sx={{ mr: 1 }} />
                    Upload File
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      hidden
                      onChange={(e) => {
                        setValue('resume', e.target.files);
                      }}
                    />
                  </Button>
                  {Array.isArray(resumeFile) && resumeFile.length > 0 && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Selected: {resumeFile[0].name}
                    </Typography>
                  )}
                  {errors.resume && (
                    <Typography variant="caption" color="error" sx={{ display: 'block' }}>
                      {errors.resume.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>
          {/* Cover Letter */}
          <Grid item order={17} xxs={12}>
            <Controller
              name="coverLetter"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  label="Cover Letter"
                  helperText="Optional, but recommended"
                  multiline
                  minRows={3}
                  sx={{ mt: { xxs: 2, sm: 0 } }}
                  placeholder="Tell us why you would be a great fit for SHS."
                  {...field}
                />
              )}
            />
          </Grid>
          {/* Submit */}
          <Grid item order={18} xxs={12} sx={{ mt: { xxs: 1, sm: 2 } }}>
            <ActionButton
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              text="Submit Application"
              sx={{
                py: 1.5,
                fontSize: '1.1rem',
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default JobApplication;
