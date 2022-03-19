import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  FEATURED_PRODUCT_REQUEST,
  FEATURED_PRODUCT_SUCCESS,
  FEATURED_PRODUCT_FAIL,
  LATEST_OFFERED_REQUEST,
  LATEST_OFFERED_SUCCESS,
  LATEST_OFFERED_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_FAIL,
  PRODUCT_REVIEW_SAVE_SUCCESS,
} from '../constants/productConstants';
import { httpClient } from '../services/http-client'

const listProducts = (
  category = '',
  filterData = {},
  sortOrder = ''
) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    let apiUrl = '/api/products?category=' +
    category +
    '&searchKeyword=' +
    (filterData.searchKeyword || '') +
    '&minAmount=' +
    (filterData.minAmount || '') +
    '&maxAmount=' +
    (filterData.maxAmount || '') +
    '&colors=' +
    (filterData.colors?.join(',') || '') +
    '&sortOrder=' +
    sortOrder ;

    const {data } = await httpClient
    .get(apiUrl)

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const getFeaturedProducts = () => async (dispatch) => {
  try {
    dispatch({ type: FEATURED_PRODUCT_REQUEST });
    let apiUrl = '/api/products?isFeaturedProduct=true';
    const { data } = await httpClient.get(
      apiUrl
    );
    dispatch({ type: FEATURED_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FEATURED_PRODUCT_FAIL, payload: error.message });
  }
};


const getLatestOffereProducts = () => async (dispatch) => {
  try {
    dispatch({ type: LATEST_OFFERED_REQUEST });
    let apiUrl = '/api/products?isLatestOffersProduct=true';
    const { data } = await httpClient.get(
      apiUrl
    );
    dispatch({ type: LATEST_OFFERED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LATEST_OFFERED_FAIL, payload: error.message });
  }
};

const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    if (!product._id) {
      const { data } = await httpClient.post('/api/products', product);
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await httpClient.put(
        '/api/products/' + product._id,
        product
      );
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await httpClient.get('/api/products/' + productId);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

const deleteProdcut = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const { data } = await httpClient.delete('/api/products/' + productId);
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

const saveProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
    const { data } = await httpClient.post(
      `/api/products/${productId}/reviews`,
      review
    );
    dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
  } catch (error) {
    // report error
    dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
  }
};

export {
  listProducts,
  detailsProduct,
  saveProduct,
  deleteProdcut,
  saveProductReview,
  getFeaturedProducts,
  getLatestOffereProducts
};
