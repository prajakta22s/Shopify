// src/components/Dashboard.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Dashboard from '../../components/Dashboard';
import { fetchProducts } from '../../redux/features/product/productSlice';

const mockStore = configureStore([]);

jest.mock('../redux/features/product/productSlice', () => ({
  fetchProducts: jest.fn(),
}));

describe('Dashboard', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      product: {
        items: [],
        status: 'idle',
        error: null,
      },
    });
  });

  test('renders loading state initially', () => {
    store = mockStore({
      product: {
        items: [],
        status: 'loading',
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders product list', () => {
    store = mockStore({
      product: {
        items: [
          { id: 1, title: 'Product 1', price: 10, image: 'image1.jpg' },
          { id: 2, title: 'Product 2', price: 20, image: 'image2.jpg' },
        ],
        status: 'succeeded',
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  test('renders error state', () => {
    store = mockStore({
      product: {
        items: [],
        status: 'failed',
        error: 'Failed to fetch products',
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Failed to fetch products/i)).toBeInTheDocument();
  });
});
