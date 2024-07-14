import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'; // Ensure this path is correct
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import styled from 'styled-components';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import OrderSummary from './components/OrderSummary';
import OrderConfirmation from './components/OrderConfirmation';
import GlobalStyle from './styles/globalStyles';

const MainContent = styled.main`
  padding: 80px 20px 60px; /* Adjust padding to accommodate fixed header and footer */
  min-height: calc(100vh - 140px); /* Adjust to ensure content doesn't overlap with header and footer */
`;

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
        <GlobalStyle />
          <Header />
          <MainContent>
            <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={ <Cart />} />
              <Route path="/order-summary" element={<OrderSummary />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
            </Routes>
          </MainContent>
          <Footer />
        </AuthProvider>
      </Router>
    </Provider>
  );
};

export default App;
