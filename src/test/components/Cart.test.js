import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Cart from '../../components/Cart';

const mockStore = configureStore([]);

describe('Cart', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: [
          { id: 1, title: 'Product 1', price: 10, quantity: 1 },
          { id: 2, title: 'Product 2', price: 20, quantity: 2 },
        ],
      },
    });
  });

  test('renders cart items', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  test('updates item quantity', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );

    const quantityInput = screen.getByLabelText('Quantity for Product 1');
    fireEvent.change(quantityInput, { target: { value: '2' } });

    expect(quantityInput.value).toBe('2');
  });

  test('removes item from cart', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );

    const removeButton = screen.getByText('Remove');
    fireEvent.click(removeButton);

    expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
  });

  test('displays total price', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Total: $50')).toBeInTheDocument();
  });
});
