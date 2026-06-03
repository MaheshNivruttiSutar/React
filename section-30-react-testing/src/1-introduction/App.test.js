import { render, screen } from '@testing-library/react';
import App from './App';

test('renders introduction heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /1 - introduction/i });
  expect(heading).toBeInTheDocument();
});

test('renders Mahesh Sutar link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Mahesh Sutar/i);
  expect(linkElement).toBeInTheDocument();
});
