import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  saveProduct,
  listProducts,
  deleteProdcut,
} from '../actions/productActions';
import {
  listCategories
} from '../actions/categoryActions';

import {
  COLORS
} from '../constants/productConstants';

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [isFeaturedProduct, setIsFeaturedProduct] = useState(false);
  const [isLatestOffersProduct, setIsLatestOffersProduct] = useState(false);
  const [availableColors, setAvailableColors] = useState([]);
  const [uploading, setUploading] = useState(false);
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listCategories());
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (product) => {
    const productColors = Array.isArray(product.availableColors)?product.availableColors:[];
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setIsFeaturedProduct(product.isFeaturedProduct);
    setIsLatestOffersProduct(product.isLatestOffersProduct);
    setAvailableColors(productColors);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
        isFeaturedProduct,
        isLatestOffersProduct,
        availableColors
      })
    );
  };
  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product._id));
  };

  const toogleFeaturedProduct = () => {
    const featuredProduct = isFeaturedProduct? false: true;
    setIsFeaturedProduct(featuredProduct)
  }

  const toogleLatestProduct = () => {
    const latestOfferProduct = isLatestOffersProduct? false: true;
    setIsLatestOffersProduct(latestOfferProduct)
  }

  const toogleColors = (color) => {
    if(availableColors.includes(color)){
      let updatedColors = availableColors.filter(selectedColor => selectedColor != color)
      setAvailableColors(updatedColors);
    } else {
      setAvailableColors([...availableColors,color])
    }
  }
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create Product
        </button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Product</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading...</div>}
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={brand}
                  id="brand"
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="countInStock">CountInStock</label>
                <input
                  type="text"
                  name="countInStock"
                  value={countInStock}
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="name">Category</label>
                <select name="category" id="category" onChange={(e) => setCategory(e.target.value)} value={category}>
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key= {category._id} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              <li>
                <label htmlFor="isFeaturedProduct">IS Featured Product <input
                  type="checkbox"
                  name="isFeaturedProduct"
                  checked={isFeaturedProduct}
                  id="isFeaturedProduct"
                  onChange={toogleFeaturedProduct}
                /></label>
              </li>
              <li>
                <label htmlFor="isLatestOffersProduct">IS Latest Offers Product  <input
                  type="checkbox"
                  name="isLatestOffersProduct"
                  checked={isLatestOffersProduct}
                  id="isLatestOffersProduct"
                  onChange={toogleLatestProduct}
                /></label>                
              </li>
              <li>
                <label htmlFor="availableColors">Available In Colors
                {COLORS.map((color) => {
                    return <>
                      <input
                        type="checkbox"
                        name="availableColors"
                        id="availableColors"
                        onChange={() => toogleColors(color.name)}
                        checked={availableColors.includes(color.name)}
                      /> 
                      <label>{color.name}</label>
                      <label style={{backgroundColor: color.code, paddingRight: '12px', marginLeft: '5px'}}>&nbsp;</label>
                  </>
                })}
                </label>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? 'Update' : 'Create'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length?products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button className="button" onClick={() => openModal(product)}>
                    Edit
                  </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )):<h1 className='no-data-available'>No Product Available</h1>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ProductsScreen;
