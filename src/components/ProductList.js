import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setPage } from '../redux/features/product/productSlice';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../redux/features/cart/cartSlice';

const Container = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const ProductName = styled.h3`
  margin: 10px 0;
`;

const ProductPrice = styled.p`
  color: #007bff;
  font-size: 1.2em;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 10px 20px;
  margin: 0 5px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status, error, currentPage, totalPages } = useSelector((state) => state.product);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: 8 }));
  }, [dispatch, currentPage]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  return (
    <Container>
      <h2>Product List</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}
      <ProductGrid>
        {items.map((product) => {
          const isProductInCart = cartItems.some((item) => item.id === product.id);
          return (
            <ProductCard key={product.id}>
              <Link to={`/products/${product.id}`}>
                <ProductImage src={product.image} alt={product.title} />
                <ProductName>{product.title}</ProductName>
                <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
              </Link>
              {isProductInCart ? (
                <Button onClick={() => handleRemoveFromCart(product.id)}>Remove from Cart</Button>
              ) : (
                <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
              )}
            </ProductCard>
          );
        })}
      </ProductGrid>
      <Pagination>
        <PageButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </PageButton>
        <PageButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </PageButton>
      </Pagination>
    </Container>
  );
};

export default ProductList;
