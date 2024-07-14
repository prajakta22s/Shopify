import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../redux/features/cart/cartSlice';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
`;

const ImageGallery = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  max-width: 200px;
  border-radius: 10px;
`;

const Details = styled.div`
  margin-top: 20px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 1.5em;
  color: #007bff;
  margin-bottom: 20px;
`;

const Description = styled.p`
  margin-bottom: 20px;
`;

const Review = styled.div`
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const BackButton = styled.button`
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

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const cartItems = useSelector((state) => state.cart.items);
  const isProductInCart = cartItems.some((item) => item.id === parseInt(id));

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProduct(response.data);
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setSuccessMessage('Product added to cart');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
    setSuccessMessage('Product removed from cart');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  if (!product) return <p>Loading...</p>;

  return (
    <Container>
      <ImageGallery>
        <Image src={product.image} alt={product.title} />
      </ImageGallery>
      <Details>
        <Title>{product.title}</Title>
        <Price>${product.price.toFixed(2)}</Price>
        <Description>{product.description}</Description>
        {isProductInCart ? (
          <>
            <Button onClick={handleAddToCart}>Add to Cart</Button>
            <Button onClick={handleRemoveFromCart}>Remove from Cart</Button>
          </>
        ) : (
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        )}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        <div>
          <h3>Customer Reviews</h3>
          <Review>
            <p><strong>John Doe</strong></p>
            <p>Great product!</p>
            <p>Rating: 5/5</p>
          </Review>
          <Review>
            <p><strong>Jane Smith</strong></p>
            <p>Good value for money.</p>
            <p>Rating: 4/5</p>
          </Review>
        </div>
        <BackButton onClick={handleBack}>Back</BackButton>
      </Details>
    </Container>
  );
};

export default ProductDetail;
