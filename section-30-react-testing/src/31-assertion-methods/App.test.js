import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('assertion methods (~10 examples)', () => {
  test('1. toBeInTheDocument', () => {
    renderApp();
    expect(screen.getByRole('heading', { name: /31 - assertion methods/i })).toBeInTheDocument();
  });

  test('2. toHaveTextContent', () => {
    renderApp();
    expect(screen.getByText(/status: shipped/i)).toHaveTextContent('Status: Shipped');
  });

  test('3. toHaveAttribute', () => {
    renderApp();
    expect(screen.getByText(/order #ord-9081/i)).toHaveAttribute('data-status', 'shipped');
  });

  test('4. toHaveClass', () => {
    renderApp();
    expect(screen.getByRole('button', { name: /track package/i })).toHaveClass('App__track-btn');
  });

  test('5. toBeVisible', () => {
    renderApp();
    expect(screen.getByText(/status: shipped/i)).toBeVisible();
  });

  test('6. toBeEnabled and 7. toBeDisabled', () => {
    renderApp();
    expect(screen.getByRole('button', { name: /track package/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /cancel order/i })).toBeDisabled();
  });

  test('8. toHaveValue', () => {
    renderApp();
    expect(screen.getByLabelText(/tracking note/i)).toHaveValue('Out for delivery');
  });

  test('9. toBeChecked', () => {
    renderApp();
    expect(screen.getByRole('checkbox', { name: /email updates/i })).toBeChecked();
  });

  test('10. toContainElement', () => {
    renderApp();
    const main = screen.getByRole('main');
    expect(main).toContainElement(screen.getByText(/order #ord-9081/i));
  });

  test('toHaveAccessibleName', () => {
    renderApp();
    expect(screen.getByRole('checkbox', { name: /email updates/i })).toHaveAccessibleName(
      /email updates/i
    );
  });
});

describe('assertion .not methods', () => {
  test('not.toBeDisabled on enabled button', () => {
    renderApp();
    expect(screen.getByRole('button', { name: /track package/i })).not.toBeDisabled();
  });

  test('not.toBeInTheDocument when alert is hidden', () => {
    renderApp();
    const checkbox = screen.getByRole('checkbox', { name: /email updates/i });

    fireEvent.click(checkbox);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  test('not.toHaveTextContent for text that does not match', () => {
    renderApp();
    expect(screen.getByText(/status: shipped/i)).not.toHaveTextContent('Delivered');
  });
});
