import { render, screen } from '@testing-library/react';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('getAllByRole — multiple elements', () => {
  test('returns all buttons with role button', () => {
    renderApp();
    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveTextContent(/add topping/i);
    expect(buttons[1]).toHaveTextContent(/remove topping/i);
    expect(buttons[2]).toHaveTextContent(/reset pizza/i);
  });

  test('returns all options in select with role option', () => {
    renderApp();
    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(4);
    expect(options.map((opt) => opt.textContent)).toEqual([
      'Extra cheese',
      'Mushroom',
      'Black olive',
      'Green pepper',
    ]);
  });

  test('returns all list items for topping list', () => {
    renderApp();
    const items = screen.getAllByRole('listitem');

    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent('Cheese');
  });
});
