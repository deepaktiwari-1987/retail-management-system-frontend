import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import {
  COLORS
} from '../constants/productConstants';
import Rating from '../components/Rating';
/*import {
  listCategories
} from '../actions/categoryActions';*/

function CategoryProductsScreen(props) {
  const params = useParams();
  const [filterData, setFilterData] = useState({searchKeyword: '', minAmount: 0, maxAmount: 0, colors: []});
  //const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = params.id ? params.id : '';
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  //const categoryList = useSelector((state) => state.categoryList);
  const [availableColors, setAvailableColors] = useState([]);
  //const { categories } = categoryList;
  
  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(listCategories());
    dispatch(listProducts(category,filterData));
    return () => {
      //
    };
  }, [category]);

  const setFilter = (key,value) => {
    const filters = {...filterData};
    filters[key] = value;
    setFilterData(filters)
  }

  const toogleColors = (color) => {
    let updatedColors = [];
    if(availableColors.includes(color)){
      updatedColors = availableColors.filter(selectedColor => selectedColor != color)
      setAvailableColors(updatedColors);
    } else {
      updatedColors = [...availableColors,color]
      setAvailableColors(updatedColors)
    }
    setFilter('colors',updatedColors)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, filterData, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, filterData, e.target.value));
  };

  return (
    <>
      {category && <h2>{category}</h2>}

      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <ul className="filter-form-container">
              {/*<li>
                <select name="category" id="category" onChange={(e) => setFilter('category',e.target.value)}>
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key= {category._id} value={category.name}>{category.name}</option>
                  ))}
                </select>
                  </li>*/}
              <li>
                Available Colors
                <div className='colorFilters'>
                  {COLORS.map((color) => {
                      return <>
                        <input
                          type="checkbox"
                          name="availableColors"
                          id="availableColors"
                          onChange={() => toogleColors(color.name)}
                          checked={filterData?.colors?.includes(color.name)}
                          style={{'backgroundColor':color.code}}
                        /> 
                        <span style={{'backgroundColor':color.code}}></span>
                    </>
                  })}
                </div>
              </li>
              <li>
                Amount
                <input
                  name="minAmount"
                  onChange={(e) => setFilter('minAmount',e.target.value)}
                  placeholder='From'
                />
              </li>
              <li>
                &nbsp;
                <input
                  name="maxAmount"
                  onChange={(e) => setFilter('maxAmount',e.target.value)}
                  placeholder='To'
                />
              </li>
              <li>
                Search Product Keyword
                <input
                  name="searchKeyword"
                  onChange={(e) => setFilter('searchKeyword',e.target.value)}
                />
              </li>
              <li style={{'paddingTop':'18px'}}>
                <button type="submit">Search</button>
              </li>
            </ul>
      
          </form>
        </li>
        <li style={{'marginLeft':'20px'}}>
          Sort By{' '}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (products && products.length?
        <ul className="productDetails">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <Link to={'/product/' + product._id}>
                  <img
                    className="product-image"
                    src={product.image}
                    alt="product"
                  />
                </Link>
                <div className="product-name">
                  <Link to={'/product/' + product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">
                  <Rating
                    value={product.rating}
                    text={product.numReviews + ' reviews'}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>:<h1 className='no-data-available'>No Product Available</h1>
      )}
    </>
  );
}
export default CategoryProductsScreen;
