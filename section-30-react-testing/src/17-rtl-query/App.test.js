import { render, screen } from '@testing-library/react';
import App from './App';

describe('RTL Query overview', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('getByRole finds heading and submit button', () => {
    expect(
      screen.getByRole('heading', { name: /17 - rtl query/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /join club/i })).toBeInTheDocument();
  });

  test('getByLabelText finds email input', () => {
    expect(screen.getByLabelText(/member email/i)).toHaveValue('mahesh@example.com');
  });

  test('getByPlaceholderText finds email field', () => {
    expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
  });

  test('getByText finds visible copy', () => {
    expect(screen.getByText(/book club membership/i)).toBeInTheDocument();
    expect(screen.getByText(/status: active member/i)).toBeInTheDocument();
  });

  test('getByAltText finds logo image', () => {
    expect(screen.getByAltText(/open book club logo/i)).toBeInTheDocument();
  });

  test('getByRole link finds navigation', () => {
    expect(screen.getByRole('link', { name: /view reading list/i })).toHaveAttribute(
      'href',
      '/orders'
    );
  });

  test('queryByText returns null when text is not on page', () => {
    expect(screen.queryByText(/cancelled membership/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/cancelled membership/i)).toBeNull();
  });
});
