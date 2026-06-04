import { render, screen } from '@testing-library/react';
import App from './App';

test('renders input box', () => {
  render(<App />);
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});

test('renders input box with placeholder', () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
});

test('renders input box with id', () => {
  render(<App />);
  expect(screen.getByRole('textbox')).toHaveAttribute('id', 'name');
});

test('renders input box with type', () => {
  render(<App />);
  expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
});

test('renders input box with value', () => {
  render(<App />);
  expect(screen.getByRole('textbox')).toHaveAttribute('value', 'Mahesh Sutar');
  expect(screen.getByText('Mahesh Sutar')).toBeInTheDocument();
  expect(screen.getByTitle('textbox')).toHaveTextContent('Mahesh Sutar');
});

test('renders input box with name', () => {
  render(<App />);
  expect(screen.getByRole('textbox')).toHaveAttribute('name', 'name');
});