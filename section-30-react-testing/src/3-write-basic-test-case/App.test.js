import { render, screen } from '@testing-library/react';
import App from './App';

test('renders lesson heading', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /3 - write basic test case/i })
  ).toBeInTheDocument();
});

test('shows mission destination and commander', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /mission: mars/i })).toBeInTheDocument();
  expect(screen.getByText(/commander: mahesh sutar/i)).toBeInTheDocument();
});

test('displays sol count and oxygen status', () => {
  render(<App />);
  expect(screen.getByText(/sol 42 on surface/i)).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent(/oxygen: 98%/i);
  expect(screen.getByRole('status')).toHaveTextContent(/nominal/i);
});
