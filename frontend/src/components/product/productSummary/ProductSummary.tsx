import React, { useEffect } from 'react';
import './ProductSummary.scss';
import { AiFillDollarCircle } from 'react-icons/ai';
import { BsCart4, BsCartX } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import InfoBox from '../../infoBox/InfoBox';
import { useDispatch, useSelector } from 'react-redux';
import {
  CALC_CATEGORY,
  CALC_OUTOFSTOCK,
  CALC_STORE_VALUE,
  selectCategory,
  selectOutOfStock,
  selectTotalStoreValue,
} from '../../../redux/store/features/product/productSlice';
import { Product } from '../productList/ProductList';

// Icons
const earningIcon = <AiFillDollarCircle size={40} color='#fff' />;
const productIcon = <BsCart4 size={40} color='#fff' />;
const categoryIcon = <BiCategory size={40} color='#fff' />;
const outOfStockIcon = <BsCartX size={40} color='#fff' />;

// Format Amount
// eslint-disable-next-line react-refresh/only-export-components
export const formatNumbers = (x: string) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// interface Product {
//   // Define the properties of a product here
//   id: string;
//   name: string;
//   price: number;
//   stock: number;
//   category: string;
// }

const ProductSummary: React.FC<{ products: Product[] }> = ({ products }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const category = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUTOFSTOCK(products));
    dispatch(CALC_CATEGORY(products));
  }, [dispatch, products]);

  return (
    <div className='product-summary'>
      <h3 className='--mt'>Inventory Stats</h3>
      <div className='info-summary'>
        <InfoBox
          icon={productIcon}
          title={'Total Products'}
          count={products.length}
          bgColor='card1'
        />
        <InfoBox
          icon={earningIcon}
          title={'Total Store Value'}
          count={Number(totalStoreValue.toFixed(2))}
          bgColor='card2'
        />
        <InfoBox
          icon={outOfStockIcon}
          title={'Out of Stock'}
          count={outOfStock}
          bgColor='card3'
        />
        <InfoBox
          icon={categoryIcon}
          title={'All Categories'}
          count={category.length}
          bgColor='card4'
        />
      </div>
    </div>
  );
};

export default ProductSummary;
