// src/test/components/Header.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../redux/store';
import Header from '../../components/Header';

test('renders Shopify link', () => {
  render(
    <Provider store={store}>
      <Router>
        <Header />
      </Router>
    </Provider>
  );
  const linkElement = screen.getByText(/Shopify/i);
  expect(linkElement).toBeInTheDocument();
});
