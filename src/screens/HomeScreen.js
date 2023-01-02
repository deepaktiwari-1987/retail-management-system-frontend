import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getFeaturedProducts, getLatestOffereProducts } from '../actions/productActions';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Rating from '../components/Rating';

function HomeScreen(props) {
  const {featuredProductList, latestOfferedProductList } = useSelector((state) => state);
  const { featuredProducts, loading, error } = featuredProductList;
  const { latestOfferedProducts, loading: latestOfferLoader, error: latestOfferError } = latestOfferedProductList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeaturedProducts());
    dispatch(getLatestOffereProducts());
    return () => {
      //
    };
  }, []);

  return (
    <>
      {latestOfferLoader ? (
        <div>Loading...</div>
      ) : latestOfferError ? (
        <div>{latestOfferError}</div>
      ) : (
        latestOfferedProducts && latestOfferedProducts.length ? 
        <>
        <h1 className='heading'>Latest Offers</h1>
          <Carousel autoPlay={true} width={'95%'} height={'400px'}>
            {latestOfferedProducts.map((product) => (
              <Link to={'/product/' + product._id} key={product._id}>
                  <div className='latestOfferProduct'>
                      <img src={product.image} />
                      <p className="legend">{product.name}</p>
                  </div>
              </Link>
            ))}
          </Carousel>
        </>:''
      )}      
      
             
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        featuredProducts && featuredProducts.length ? 
        <>
        <h1 className='heading'>Featured Product</h1>
        <ul className="products">
          {featuredProducts.map((product) => (
            <li key={product._id}>
              <div className="product">
                <Link to={'/product/' + product._id}>
                  <img
                    className="product-image"
                    src={process.env.REACT_APP_API_URL+product.image}
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
        </ul></>: ''
      )}


      {/*latestOfferLoader ? (
              <div>Loading...</div>
            ) : latestOfferError ? (
              <div>{latestOfferError}</div>
            ) : (
              latestOfferedProducts ? 
              <>
              <h1 className='heading'>Latest Offered Product</h1>
                <ul className="products">
                  {latestOfferedProducts.map((product) => (
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
                </ul>
                </>: ''
                  )*/}
     
    </>
  );
}
export default HomeScreen;
