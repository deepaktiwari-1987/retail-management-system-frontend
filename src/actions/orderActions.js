import {
  ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL
} from "../constants/orderConstants";
import { httpClient } from '../services/http-client'
import Storage from '../services/storage'

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    const { data: { data: newOrder } } = await httpClient.post("/api/orders", order);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
    Storage.removeItem("cartItems");
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
}

const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_LIST_REQUEST });
    const { data } = await httpClient.get("/api/orders/mine");
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
  }
}

const listOrders = () => async (dispatch, getState) => {

  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { data } = await httpClient.get("/api/orders");
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
  }
}

const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const { data } = await httpClient.get("/api/orders/" + orderId);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
  }
}

const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    const { data } = await httpClient.delete("/api/orders/" + orderId);
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
  }
}
export { createOrder, detailsOrder, listMyOrders, listOrders, deleteOrder };