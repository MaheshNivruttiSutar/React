import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import App from './App';
import { server } from './server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderApp() {
  render(<App />);
}

describe('API test with MSW', () => {
  test('loads recipes from MSW handler on button click', async () => {
    renderApp();
    await userEvent.click(screen.getByRole('button', { name: /load recipes/i }));

    expect(screen.getByRole('status')).toHaveTextContent(/loading recipes/i);
    expect(await screen.findByRole('list', { name: /recipe list/i })).toBeInTheDocument();
    expect(screen.getByText(/masala dosa \(south indian\)/i)).toBeInTheDocument();
    expect(screen.getByText(/pav bhaji \(mumbai street\)/i)).toBeInTheDocument();
  });

  test('shows error when MSW returns server error', async () => {
    server.use(
      rest.get('/api/recipes', (req, res) => res.networkError('Failed to connect'))
    );

    renderApp();
    await userEvent.click(screen.getByRole('button', { name: /load recipes/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/recipe service unavailable/i);
  });

  test('shows no list when MSW returns empty array', async () => {
    server.use(
      rest.get('/api/recipes', (req, res, ctx) => res(ctx.json([])))
    );

    renderApp();
    await userEvent.click(screen.getByRole('button', { name: /load recipes/i }));

    await waitFor(() => {
      expect(screen.queryByText(/loading recipes/i)).not.toBeInTheDocument();
    });
    expect(screen.queryByRole('list', { name: /recipe list/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

/*
 * Interview quick answers:
 * - MSW intercepts fetch at network layer; component code stays unchanged
 * - server.use() overrides handlers for a single test (error, empty, slow)
 * - Use findBy* for async UI after click + API round-trip
 * - Combine userEvent.click with await screen.findByText for full integration tests
 */
