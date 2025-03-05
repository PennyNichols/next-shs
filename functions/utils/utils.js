export const formatPhoneNumber = (phoneNumber) => {
  // Remove the leading '+1'
  const cleaned = phoneNumber.replace('+1', '');

  // Extract area code, central office code, and station code
  const areaCode = cleaned.slice(0, 3);
  const centralOfficeCode = cleaned.slice(3, 6);
  const stationCode = cleaned.slice(6);

  // Format the phone number
  return `(${areaCode}) ${centralOfficeCode}-${stationCode}`;
};
