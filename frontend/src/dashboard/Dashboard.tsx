import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/store/features/auth/authSlice';
import ProductList from '../components/product/productList/ProductList';
import ProductSummary from '../components/product/productSummary/ProductSummary';
import { useEffect } from 'react';
import useRedirectLoggedOutUser from '../customHook/useRedirectLoggedOutUser';
import { Product } from '../components/product/productList/ProductList';
import { getProducts } from '../redux/store/features/product/productSlice';

const Dashboard = () => {
  useRedirectLoggedOutUser('/login');
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector(
    (state: {
      product: {
        products: Product[];
        isLoading: boolean;
        isError: boolean;
        message: string;
      };
    }) => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      getProducts();
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <ProductSummary products={products} />
      <ProductList products={products} isLoading={isLoading} />
      {isLoggedIn && <h1>Wellcom to Dashboard</h1>}
    </div>
  );
};

export default Dashboard;
