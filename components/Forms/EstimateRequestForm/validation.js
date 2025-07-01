import * as yup from "yup";
export const estimateRequestSchema = yup.object().shape({
  firstName: yup.string().trim().required('First name is required.'),
  lastName: yup.string().trim().required('Last name is required.'),
  email: yup.string().trim().email('Invalid email address.').required('Email is required.'),
  phone: yup
    .string()
    .trim()
    .matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Invalid phone number.') // Basic phone number regex
    .required('Phone number is required.'),
  address: yup.string().trim().required('Service address is required.'),
  propertyType: yup.string().required('Property type is required.'),
  animalsOnPremises: yup.boolean(),
  ownerOccupied: yup.boolean(),
  scopeOfWork: yup
    .array()
    .of(yup.string())
    .min(1, 'Please select at least one service.')
    .required('Scope of work is required.'),
  details: yup.string().trim(),
  // Images are handled separately via state, so no direct RHF validation here.
  // We'll manage upload errors/success in the submit handler.
  subscribeToMarketing: yup.boolean(),
  saveServiceAddress: yup.boolean(), // Only enabled if user is logged in, but its state is managed by RHF
});