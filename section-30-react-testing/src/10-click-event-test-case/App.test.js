import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('click event with button', () => {
  test('renders click me button', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('shows initial count as 0', () => {
    render(<App />);
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
  });

  test('updates count when button is clicked', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /click me/i });

    fireEvent.click(button);

    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });

  test('increments count on multiple clicks', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /click me/i });

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(screen.getByText(/count: 3/i)).toBeInTheDocument();
  });
});
