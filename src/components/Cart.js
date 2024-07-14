import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { removeFromCart, updateQuantity } from '../redux/features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const QuantityInput = styled.input`
  width: 50px;
  margin: 0 10px;
`;

const Total = styled.div`
  margin-top: 20px;
  font-size: 1.5em;
  text-align: right;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const SuccessMessage = styled.p`
  color: green;
`;

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    setSuccessMessage('Product removed from cart');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: parseInt(quantity, 10) }));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal; // Add any applicable taxes or discounts here

  return (
    <Container>
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        items.map((item) => (
          <CartItem key={item.id}>
            <ItemDetails>
              <h3>{item.title}</h3>
              <p>${item.price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
            </ItemDetails>
            <QuantityInput
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
            />
            <button onClick={() => handleRemove(item.id)}>Remove from Cart</button>
          </CartItem>
        ))
      )}
      <Total>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Total: ${total.toFixed(2)}</p>
      </Total>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      <Button onClick={() => navigate('/dashboard')}>Back</Button>
      <Button onClick={() => navigate('/order-summary')}>Place Order</Button>
    </Container>
  );
};

export default Cart;
