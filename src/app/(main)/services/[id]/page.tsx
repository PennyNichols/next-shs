'use client';

import { Container } from '@mui/material';
import { useParams } from 'next/navigation';

const ServicePage = () => {
  const params = useParams();
  const { id } = params;

  return (
    <Container className="page-wrapper">
      <h1>Service Details</h1>
      <p>Service ID: {id}</p>
      {/* Add your service details here */}
    </Container>
  );
};

export default ServicePage;
