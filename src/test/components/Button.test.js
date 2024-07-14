import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../Button';

test('renders button with given label', () => {
  render(<Button>Click me</Button>);
  const buttonElement = screen.getByText(/click me/i);
  expect(buttonElement).toBeInTheDocument();
});
