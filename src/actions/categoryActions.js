import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_SAVE_REQUEST,
  CATEGORY_SAVE_SUCCESS,
  CATEGORY_SAVE_FAIL,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST
} from '../constants/categoryConstants';
import { httpClient } from '../services/http-client'

const listCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    let apiUrl = '/api/categories';
    const { data } = await httpClient.get(
      apiUrl
    );
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
  }
};

const saveCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_SAVE_REQUEST, payload: category });
    if (!category._id) {
      const { data } = await httpClient.post('/api/categories', category);
      dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await httpClient.put(
        '/api/categories/' + category._id,
        category
      );
      dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: CATEGORY_SAVE_FAIL, payload: error.message });
  }
};

const deleteCategory = (categoryId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_DELETE_REQUEST, payload: categoryId });
    const { data } = await httpClient.delete('/api/categories/' + categoryId);
    dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: CATEGORY_DELETE_FAIL, payload: error.message });
  }
};

export {
  listCategories,
  saveCategory,
  deleteCategory
};
