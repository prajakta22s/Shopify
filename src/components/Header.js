import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f8f9fa;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const NavButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CartIcon = styled.div`
  position: relative;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 0.8em;
`;

const Header = () => {
  const { user, logout } = useAuth();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <div>
        <Link to="/dashboard"><h1>Shopify</h1></Link>
      </div>
      <div>
        <FontAwesomeIcon icon={faArrowLeft} size="lg" onClick={() => navigate(-1)} style={{ cursor: 'pointer', marginRight: '20px' }} />
        {user ? (
          <>
            <NavButton onClick={logout}>Log Out</NavButton>
            <Link to="/cart">
              <CartIcon>
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
              </CartIcon>
            </Link>
          </>
        ) : (
          <>
            <Link to="/signup"><NavButton>Sign Up</NavButton></Link>
            <Link to="/login"><NavButton>Sign In</NavButton></Link>
            <Link to="/cart">
              <CartIcon>
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
              </CartIcon>
            </Link>
          </>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;
