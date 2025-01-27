import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './productList.scss';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import Search from '../../search/Search';
import SpinnerImg from '../../loader/Loader.tsx';

import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  FILTER_PRODUCTS,
  selectFilteredPoducts,
} from '../../../redux/store/features/product/filterSlice.ts';
// import {
//   deleteProduct,
//   getProducts,
// } from '../../../redux/store/features/product/productSlice.ts';
import { useDispatch, useSelector } from 'react-redux';

export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
}
export const ProductList: React.FC<ProductListProps> = ({
  products,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const filteredProducts = useSelector(
    (state: { filter: { filteredProducts: Product[] } }) =>
      selectFilteredPoducts(state)
  );

  const shortenText = (text: string, n: number) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat('...');
      return shortenedText;
    }
    return text;
  };

  const delProduct = async (id: string) => {
    console.log(id);
    // await dispatch(deleteProduct(id));
    // await dispatch(getProducts());
  };

  const confirmDelete = (id: string) => {
    confirmAlert({
      title: 'Delete Product',
      message: 'Are you sure you want to delete this product.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => delProduct(id),
        },
        {
          label: 'Cancel',
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState<Product[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset) as Product[]);
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  return (
    <div className='product-list'>
      <hr />
      <div className='table'>
        <div className='--flex-between --flex-dir-column'>
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className='table'>
          {!isLoading && products.length === 0 ? (
            <p>-- No product found, please add a product...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>
                        {'$'}
                        {price}
                      </td>
                      <td>{quantity}</td>
                      <td>
                        {'$'}
                        {price * quantity}
                      </td>
                      <td className='icons'>
                        <span>
                          <Link to={`/product-detail/${_id}`}>
                            <AiOutlineEye size={25} color={'purple'} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-product/${_id}`}>
                            <FaEdit size={20} color={'green'} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={'red'}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel='...'
          nextLabel='Next'
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel='Prev'
          renderOnZeroPageCount={null}
          containerClassName='pagination'
          pageLinkClassName='page-num'
          previousLinkClassName='page-num'
          nextLinkClassName='page-num'
          activeLinkClassName='activePage'
        />
      </div>
    </div>
  );
};

export default ProductList;
