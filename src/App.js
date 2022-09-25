import React,{useEffect} from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
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
import {GridContainer,
  Header,
  Brand,
  HeaderLinks,
  DropDown,
  DropDownContent,
  Sidebar,
  SidebarCloseButton,
  Categories,
  Main,
  Content,
  Footer} from './App.style'
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
      <GridContainer>
        <Header>
          <Brand>
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">Y Company</Link>
          </Brand>
          <HeaderLinks>
            <a href="/cart">Cart</a>
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <DropDown>
                <a href="#">Admin</a>
                <DropDownContent>
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/categories">Categories</Link>
                  </li>
                </DropDownContent>
              </DropDown>
            )}
          </HeaderLinks>
        </Header>
        <Sidebar>
          <h3>Shopping Categories</h3>
          <SidebarCloseButton onClick={closeMenu}>
            x
          </SidebarCloseButton>
          <Categories>
            {categories && categories.map((category) => {
              return <li key={category._id}>
                <Link to={`/category/${category.name}`}>{category.name}</Link>
              </li>
            })}
          </Categories>
        </Sidebar>
        <Main>
          <Content>
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
          </Content>
        </Main>
        <Footer>All right reserved copyright@2022.</Footer>
      </GridContainer>
    </BrowserRouter>
  );
}

export default App;
