import { useDispatch } from 'react-redux';
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

const App = () => {

  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchProducts()), [dispatch]);

  return (
    <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/ordersummary" element={<OrderSummary />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
    </Container>
  );
}

export default App;
