import { render, screen } from '@testing-library/react';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('text match with function', () => {
  test('finds ticket id using custom matcher function', () => {
    renderApp();
    const ticket = screen.getByText((content, element) => {
      return element?.tagName === 'P' && content.startsWith('Ticket: CEL-');
    });
    expect(ticket).toHaveTextContent('CEL-2048');
  });

  test('finds client name with function (case check)', () => {
    renderApp();
    const client = screen.getByText((content) => content.toLowerCase().includes('celigo'));
    expect(client).toHaveClass('App__client');
  });

  test('finds LIVE badge using element tag check', () => {
    renderApp();
    const badge = screen.getByText((content, element) => {
      return element?.tagName === 'SPAN' && content === 'LIVE';
    });
    expect(badge).toHaveClass('App__badge');
  });

  test('priority line with function matcher', () => {
    renderApp();
    expect(
      screen.getByText((content) => /priority:\s*high/i.test(content))
    ).toBeInTheDocument();
  });
});
