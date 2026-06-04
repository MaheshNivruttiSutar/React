import { render, screen } from '@testing-library/react';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('RTL Query overview', () => {
  test('getByRole finds heading and submit button', () => {
    renderApp();
    expect(
      screen.getByRole('heading', { name: /17 - rtl query/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /join club/i })).toBeInTheDocument();
  });

  test('getByLabelText finds email input', () => {
    renderApp();
    expect(screen.getByLabelText(/member email/i)).toHaveValue('mahesh@example.com');
  });

  test('getByPlaceholderText finds email field', () => {
    renderApp();
    expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
  });

  test('getByText finds visible copy', () => {
    renderApp();
    expect(screen.getByText(/book club membership/i)).toBeInTheDocument();
    expect(screen.getByText(/status: active member/i)).toBeInTheDocument();
  });

  test('getByAltText finds logo image', () => {
    renderApp();
    expect(screen.getByAltText(/open book club logo/i)).toBeInTheDocument();
  });

  test('getByRole link finds navigation', () => {
    renderApp();
    expect(screen.getByRole('link', { name: /view reading list/i })).toHaveAttribute(
      'href',
      '/orders'
    );
  });

  test('queryByText returns null when text is not on page', () => {
    renderApp();
    expect(screen.queryByText(/cancelled membership/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/cancelled membership/i)).toBeNull();
  });
});
