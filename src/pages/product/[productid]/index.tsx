import { useRouter } from 'next/router';

const ProductPage = () => {
  const router = useRouter();
  const { productid } = router.query; // Get the product ID from the URL

  return (
    <div>
      <h1>Product Page</h1>
      <p>This is product {productid}</p>
    </div>
  );
};

export default ProductPage;
