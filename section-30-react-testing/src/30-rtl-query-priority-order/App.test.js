import { render, screen } from '@testing-library/react';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('RTL query priority — preferred queries', () => {
  test('1. getByRole for submit button (not getByTestId)', () => {
    renderApp();
    expect(screen.getByRole('button', { name: /pay now/i })).toBeInTheDocument();
  });

  test('2. getByLabelText for email (not placeholder or test id)', () => {
    renderApp();
    expect(screen.getByLabelText(/work email/i)).toHaveValue('mahesh@celigo.com');
  });

  test('3. getByPlaceholderText when useful for coupon field', () => {
    renderApp();
    expect(screen.getByPlaceholderText('SAVE10')).toBeInTheDocument();
  });

  test('4. getByText for visible help copy', () => {
    renderApp();
    expect(screen.getByText(/secure payment powered by celigo/i)).toBeInTheDocument();
  });

  test('5. getByDisplayValue for prefilled email', () => {
    renderApp();
    expect(screen.getByDisplayValue('mahesh@celigo.com')).toBeInTheDocument();
  });

  test('6. getByAltText for badge image', () => {
    renderApp();
    expect(screen.getByAltText(/secure checkout badge/i)).toBeInTheDocument();
  });

  test('7. getByTitle for tooltip (lower priority than alt here)', () => {
    renderApp();
    expect(screen.getByTitle(/verified secure checkout/i)).toBeInTheDocument();
  });
});

describe('test id — last resort only', () => {
  test('getByTestId works but prefer role/label when possible', () => {
    renderApp();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('pay-button')).toHaveTextContent(/pay now/i);
  });
});
