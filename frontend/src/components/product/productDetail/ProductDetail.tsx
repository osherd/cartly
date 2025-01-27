import { useEffect } from 'react';

interface ProductType {
  image: { filePath: string; fileName: string };
  quantity: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser';
import Card from '../../card/Card';
import './ProductDetail.scss';
import DOMPurify from 'dompurify';
// import SpinnerImg from '../../loader/SpinnerImg';
import { selectIsLoggedIn } from '../../../redux/store/features/auth/authSlice';
import { getProduct } from '../../../redux/store/features/product/productSlice';

const ProductDetail = () => {
  useRedirectLoggedOutUser('/login');
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isError, message } = useSelector(
    (state: {
      product: {
        product: ProductType;
        isLoading: boolean;
        isError: boolean;
        message: string;
      };
    }) => state.product
  );

  // const { product, isLoading, isError, message } = useSelector(
  //   (state: {
  //     product: {
  //       product: ProductType;
  //       isLoading: boolean;
  //       isError: boolean;
  //       message: string;
  //     };
  //   }) => state.product
  // );

  const stockStatus = (quantity: number) => {
    if (quantity > 0) {
      return <span className='--color-success'>In Stock</span>;
    }
    return <span className='--color-danger'>Out Of Stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true && id) {
      getProduct(id);
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch, id]);

  return (
    <div className='product-detail'>
      <h3 className='--mt'>Product Detail</h3>
      <Card cardClass='card'>
        {/* {isLoading && <SpinnerImg />} */}
        {product && (
          <div className='detail'>
            <Card cardClass='group'>
              {product?.image ? (
                <img
                  src={product.image.filePath}
                  alt={product.image.fileName}
                />
              ) : (
                <p>No image set for this product</p>
              )}
            </Card>
            <h4>Product Availability: {stockStatus(product.quantity)}</h4>
            <hr />
            <h4>
              <span className='badge'>Name: </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {product.sku}
            </p>
            <p>
              <b>&rarr; Category : </b> {product.category}
            </p>
            <p>
              <b>&rarr; Price : </b> {'$'}
              {product.price}
            </p>
            <p>
              <b>&rarr; Quantity in stock : </b> {product.quantity}
            </p>
            <p>
              <b>&rarr; Total Value in stock : </b> {'$'}
              {product.price * product.quantity}
            </p>
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>
            <hr />
            <code className='--color-dark'>
              Created on: {product.createdAt.toLocaleString('en-US')}
            </code>
            <br />
            <code className='--color-dark'>
              Last Updated: {product.updatedAt.toLocaleString('en-US')}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetail;
