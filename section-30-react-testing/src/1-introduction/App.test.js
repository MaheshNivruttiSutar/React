import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Mahesh Sutar link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Mahesh Sutar/i);
  expect(linkElement).toBeInTheDocument();
});
