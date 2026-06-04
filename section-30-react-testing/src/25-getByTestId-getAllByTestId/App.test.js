import { render, screen } from '@testing-library/react';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('getByTestId & getAllByTestId', () => {
  test('getByTestId finds single revenue card', () => {
    renderApp();
    const card = screen.getByTestId('revenue-card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent(/revenue/i);
  });

  test('getByTestId finds single revenue value', () => {
    renderApp();
    expect(screen.getByTestId('revenue-value')).toHaveTextContent('₹ 12,40,000');
  });

  test('getByTestId finds last sync label', () => {
    renderApp();
    expect(screen.getByTestId('last-sync')).toHaveTextContent(/last sync/i);
  });

  test('getAllByTestId finds multiple order rows', () => {
    renderApp();
    const rows = screen.getAllByTestId('order-row');

    expect(rows).toHaveLength(3);
    expect(rows[0]).toHaveTextContent(/order #101/i);
    expect(rows[2]).toHaveTextContent(/delivered/i);
  });
});
