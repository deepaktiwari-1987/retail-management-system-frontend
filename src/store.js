import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Storage from './services/storage'
import {
  productListReducer,
  featuredProductReducer,
  latestOfferedReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
  productReviewSaveReducer,
} from './reducers/productReducers';

import {
  categoryListReducer,
  categoryDeleteReducer,
  categorySaveReducer
} from './reducers/categoryReducers';

import { cartReducer } from './reducers/cartReducers';
import {
  userSigninReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrderListReducer,
  orderListReducer,
  orderDeleteReducer,
} from './reducers/orderReducers';

const cartItems = Storage.getItem('cartItems') || [];
const userInfo = Storage.getItem('userInfo') || null;

const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },
  userSignin: { userInfo },
};
const reducer = combineReducers({
  productList: productListReducer,
  categoryList : categoryListReducer,
  featuredProductList: featuredProductReducer,
  latestOfferedProductList: latestOfferedReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  productSave: productSaveReducer,
  categorySave: categorySaveReducer,
  productDelete: productDeleteReducer,
  categoryDelete: categoryDeleteReducer,
  productReviewSave: productReviewSaveReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  userUpdate: userUpdateReducer,
  myOrderList: myOrderListReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
