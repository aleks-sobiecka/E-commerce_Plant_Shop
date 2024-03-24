import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from './redux/productsRedux';
import { Container } from 'react-bootstrap';
import Header from './components/views/Header/Header'
import Footer from './components/views/Footer/Footer'
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Product from './components/pages/Product/Product';
import Cart from './components/pages/Cart/Cart';
import OrderSummary from './components/pages/OrderSummary/OrderSummary';
import NotFound from './components/pages/NotFound/NotFound';
import SignUp from './components/pages/SignUp/SignUp';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout/Logout';
import { checkLoggedUser } from './utils/checkLoggedUser';
import { localStorageCart } from './utils/localStorageCart';
import { saveCartToLocalStorage } from './redux/cartRedux';
import { useState } from "react";

const App = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const [localStorageCartExecuted, setLocalStorageCartExecuted] = useState(false);

  useEffect(() => {
    const executeFirstEffect = async () => {
      await localStorageCart(dispatch);
      setLocalStorageCartExecuted(true);
    }
    executeFirstEffect();
  }, []);

  useEffect(() => {
    if (localStorageCartExecuted) {
      dispatch(saveCartToLocalStorage(cart));
    }
  }, [ cart, dispatch, localStorageCartExecuted ]);

  useEffect(() => {
    dispatch(fetchProducts());
    checkLoggedUser(dispatch);
  }, [dispatch]);


  return (
    <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/ordersummary" element={<OrderSummary />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <Footer />
    </Container>
  );
}

export default App;
