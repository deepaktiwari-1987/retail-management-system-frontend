import React,{useEffect} from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import CategoryProductsScreen from './screens/CategoryProductsScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector,useDispatch } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import {
  listCategories,
} from './actions/categoryActions';

console.log(process.env)
function App() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };

  useEffect(() => {
    dispatch(listCategories());
    return () => {
      //
    };
  }, []);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">Y Company</Link>
          </div>
          <div className="header-links">
            <a href="/cart">Cart</a>
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/categories">Categories</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul className="categories">
            {categories && categories.map((category) => {
              return <li key={category._id}>
                <Link to={`/category/${category.name}`}>{category.name}</Link>
              </li>
            })}
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Routes>
              <Route path="/orders" element={<OrdersScreen/>} />
              <Route path="/profile" element={<ProfileScreen/>} />
              <Route path="/order/:id" element={<OrderScreen/>} />
              <Route path="/products" element={<ProductsScreen/>} />
              <Route path="/categories" element={<CategoriesScreen />} />
              <Route path="/shipping" element={<ShippingScreen/>} />
              <Route path="/payment" element={<PaymentScreen/>} />
              <Route path="/placeorder" element={<PlaceOrderScreen/>} />
              <Route path="/signin" element={<SigninScreen/>} />
              <Route path="/register" element={<RegisterScreen/>} />
              <Route path="/product/:id" element={<ProductScreen/>} />
              <Route path="/cart">
                <Route path=":id" element={<CartScreen />} />
                <Route path="" element={<CartScreen />} />
              </Route>
              <Route path="/category/:id" element={<CategoryProductsScreen/>} />
              <Route path="/" exact={true} element={<HomeScreen/>} />
            </Routes>
          </div>
        </main>
        <footer className="footer">All right reserved copyright@2022.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
