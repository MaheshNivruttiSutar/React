import { render, screen } from '@testing-library/react';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('getByDisplayValue — single element', () => {
  test('finds client name input by display value', () => {
    renderApp();
    expect(screen.getByDisplayValue('Acme Corp')).toHaveAttribute('id', 'client');
  });

  test('finds currency field by display value', () => {
    renderApp();
    expect(screen.getByDisplayValue('INR')).toHaveAttribute('id', 'currency');
  });

  test('finds textarea by display value', () => {
    renderApp();
    expect(screen.getByDisplayValue('Payment due in 30 days')).toBeInTheDocument();
  });
});

describe('getAllByDisplayValue — multiple elements', () => {
  test('finds both line items showing amount 0', () => {
    renderApp();
    const zeroAmountFields = screen.getAllByDisplayValue('0');

    expect(zeroAmountFields).toHaveLength(2);
    expect(zeroAmountFields[0]).toHaveAttribute('id', 'amount-a');
    expect(zeroAmountFields[1]).toHaveAttribute('id', 'amount-b');
  });
});
