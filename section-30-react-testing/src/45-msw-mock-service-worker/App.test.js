import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import App from './App';
import { server } from './server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderApp() {
  render(<App />);
}

describe('MSW setup and handlers', () => {
  test('shows loading then mocked team from handler', async () => {
    renderApp();
    expect(screen.getByRole('status')).toHaveTextContent(/loading team/i);

    expect(await screen.findByRole('list', { name: /team members/i })).toBeInTheDocument();
    expect(screen.getByText(/neha rao — product manager/i)).toBeInTheDocument();
    expect(screen.getByText(/karan desai — backend engineer/i)).toBeInTheDocument();
  });

  test('override handler with server.use for one test', async () => {
    server.use(
      rest.get('/api/team', (req, res, ctx) => {
        return res(ctx.json([{ id: 9, name: 'Solo Dev', role: 'Founder' }]));
      })
    );

    renderApp();
    expect(await screen.findByText(/solo dev — founder/i)).toBeInTheDocument();
  });
});

/*
 * Interview quick answers:
 * - MSW uses Service Worker API in browser; msw/node in Jest
 * - server.listen() starts interception; resetHandlers() clears per-test overrides
 * - rest.get(url, resolver) returns res(ctx.json(data)) or res.networkError()
 * - Handlers live in handlers.js; server.js exports setupServer instance
 */
