import { render, screen } from '@testing-library/react';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('findBy — async single element', () => {
  test('shows loading text immediately with getBy', () => {
    renderApp();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('waits for sync complete with findByText', async () => {
    renderApp();
    expect(await screen.findByText(/sync complete/i)).toBeInTheDocument();
  });
});

describe('findAllBy — async multiple elements', () => {
  test('waits for task list items with findAllByRole', async () => {
    renderApp();
    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent(/import orders/i);
  });
});
