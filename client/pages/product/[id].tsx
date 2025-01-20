import { useRouter } from 'next/router';
import SingleProductPage from '../../src/pages/SingleProductPage';

function ProductDetailsPage({isAuthenticated}) {
  

  const router = useRouter();

  const { id } = router.query;
  if (!id) {
    return <div>Loading...</div>;
  }
  return (
    <SingleProductPage productId={id} isAuthenticated={isAuthenticated} />
  );
}

export default ProductDetailsPage;