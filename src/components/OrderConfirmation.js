import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

const Total = styled.div`
  margin-top: 20px;
  font-size: 1.5em;
  text-align: right;
`;

const OrderConfirmation = () => {
  const location = useLocation();
  const { order } = location.state;

  return (
    <Container>
      <h2>Order Confirmation</h2>
      <p>Order ID: {order.orderId}</p>
      <p>Order Date: {order.orderDate}</p>
      <div>
        {order.products.map((item) => (
          <SummaryItem key={item.id}>
            <div>{item.name} (x{item.quantity})</div>
            <div>${item.price.toFixed(2)}</div>
          </SummaryItem>
        ))}
      </div>
      <Total>
        <p>Subtotal: ${order.totalPrice.toFixed(2)}</p>
        <p>Total: ${order.totalPrice.toFixed(2)}</p>
      </Total>
      <div>
        <h3>Shipping Address</h3>
        <p>{order.shippingAddress}</p>
      </div>
      <div>
        <h3>Payment Method</h3>
        <p>{order.paymentMethod}</p>
      </div>
      <p>Thank you for your purchase!</p>
    </Container>
  );
};

export default OrderConfirmation;
