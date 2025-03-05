import { useRouter } from 'next/router';

const ServicePage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Service Details</h1>
      <p>Service ID: {id}</p>
      {/* Add your service details here */}
    </div>
  );
};

export default ServicePage;
