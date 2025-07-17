import React from 'react';
import Card from '../../card/Card';

import './ProductForm.scss';

interface ProductFormProps {
  product: {
    name: string;
    category: string;
    price: string;
    quantity: string;
  };
  imagePreview: string | null;
  description: string;
  setDescription: (value: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveProduct: (e: React.FormEvent<HTMLFormElement>) => void;
}

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['clean'],
  ],
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'color',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'video',
  'image',
  'code-block',
  'align',
];

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  return (
    <div className='add-product'>
      <Card cardClass={'card'}>
        <form onSubmit={saveProduct}>
          <Card cardClass={'group'}>
            <label>Product Image</label>
            <code className='--color-dark'>
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type='file'
              name='image'
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className='image-preview'>
                <img src={imagePreview} alt='product' />
              </div>
            ) : (
              <p>No image set for this poduct.</p>
            )}
          </Card>
          <label>Product Name:</label>
          <input
            type='text'
            value={product?.name}
            onChange={handleInputChange}
          />

          <label>Product Category:</label>
          <input
            type='text'
            placeholder='Product Category'
            name='category'
            value={product?.category}
            onChange={handleInputChange}
          />

          <label>Product Price:</label>
          <input
            type='text'
            placeholder='Product Price'
            name='price'
            value={product?.price}
            onChange={handleInputChange}
          />

          <label>Product Quantity:</label>
          <input
            type='text'
            placeholder='Product Quantity'
            name='quantity'
            value={product?.quantity}
            onChange={handleInputChange}
          />

          <label>Product Description:</label>
          {/* @ts-ignore */}
          <ReactQuill
            theme='snow'
            value={description}
            onChange={setDescription}
            modules={modules}
            formats={formats}
          />

          <div className='--my'>
            <button type='submit' className='--btn --btn-primary'>
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProductForm;
