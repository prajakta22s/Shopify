import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/features/cart/cartSlice';
import { db } from '../services/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const ItemDetails = styled.div`
  flex: 1;
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

const PaymentMethod = styled.div`
  margin-top: 20px;
`;

const OrderSummary = () => {
  const items = useSelector((state) => state.cart.items);
  const [paymentMethod, setPaymentMethod] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal; // Add any applicable taxes or discounts here

  const handlePlaceOrder = async () => {
    if (!user) {
      alert('You must be logged in to place an order.');
      console.error('User not authenticated');
      return;
    }

    if (items.length === 0) {
      alert('Please select the items. Your cart is empty.');
      return;
    }

    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    try {
      const orderDetails = {
        userId: user.uid,
        items: items.map(({ id, title, price, quantity }) => ({ id, title, price, quantity })), // Ensure only required fields are sent
        total,
        paymentMethod,
        orderDate: new Date().toISOString(),
      };

      console.log('Placing order with details:', JSON.stringify(orderDetails, null, 2));

      await addDoc(collection(db, 'orders'), orderDetails);
      console.log('Order placed successfully');
      dispatch(clearCart());
      alert('Order placed successfully!');
      navigate('/dashboard');
    } catch (error) {
      if (error.message.includes('permission-denied')) {
        alert('You do not have permission to perform this action.');
      } else if (error.message.includes('network')) {
        alert('Network error occurred. Please try again later.');
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
      console.error('Error placing order: ', error);
    }
  };

  return (
    <Container>
      <h2>Order Summary</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        items.map((item) => (
          <OrderItem key={item.id}>
            <ItemDetails>
              <h3>{item.title}</h3>
              <p>${item.price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
            </ItemDetails>
          </OrderItem>
        ))
      )}
      <Total>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Total: ${total.toFixed(2)}</p>
      </Total>
      <PaymentMethod>
        <h3>Payment Method</h3>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="cashOnDelivery"
            checked={paymentMethod === 'cashOnDelivery'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="upi"
            checked={paymentMethod === 'upi'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          UPI
        </label>
      </PaymentMethod>
      <Button onClick={handlePlaceOrder} disabled={!paymentMethod}>
        Place Order
      </Button>
    </Container>
  );
};

export default OrderSummary;
