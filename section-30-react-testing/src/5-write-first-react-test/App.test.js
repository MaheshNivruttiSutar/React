import { render, screen } from '@testing-library/react';
import App from './App';

test('renders first react test case text', () => {
  render(<App />);
  expect(screen.getByText(/first react test case/i)).toBeInTheDocument();
});

test('renders image', () => {
  render(<App />);
  expect(screen.getByRole('img')).toBeInTheDocument();
});
