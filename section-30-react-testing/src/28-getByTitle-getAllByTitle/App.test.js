import { render, screen } from '@testing-library/react';
import App from './App';

test('finds button by title attribute', () => {
  render(<App />);
  const button = screen.getByTitle('Click me');
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent('Click me');
});