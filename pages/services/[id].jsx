import { Container } from '@mui/material';
import { useRouter } from 'next/router';

const ServicePage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Container className="page-wrapper">
      <h1>Service Details</h1>
      <p>Service ID: {id}</p>
      {/* Add your service details here */}
    </Container>
  );
};

export default ServicePage;
