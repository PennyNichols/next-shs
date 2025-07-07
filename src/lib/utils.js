export const formatPhoneNumber = (phoneNumber) => {
  // Remove all non-digit characters
  let cleaned = phoneNumber.replace(/\D/g, '');

  // Remove leading '1' if present (US country code)
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    cleaned = cleaned.slice(1);
  }

  // Validate length
  if (cleaned.length !== 10) {
    return phoneNumber; // or return '' or throw an error, depending on your needs
  }

  // Extract area code, central office code, and station code
  const areaCode = cleaned.slice(0, 3);
  const centralOfficeCode = cleaned.slice(3, 6);
  const stationCode = cleaned.slice(6);

  // Format the phone number
  return `(${areaCode}) ${centralOfficeCode}-${stationCode}`;
};

