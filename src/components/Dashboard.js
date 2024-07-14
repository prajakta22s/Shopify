import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';
import ProductList from './ProductList';

const Container = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
  margin-top: 100px; /* Adjust margin-top to accommodate fixed header */
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Title>Welcome, {user ? user.displayName : 'User'}</Title>
      <ProductList />
    </Container>
  );
};

export default Dashboard;
