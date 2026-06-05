import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('API call testing with mocked fetch', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('shows loading then quote on successful fetch', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        text: 'Code is like humor. When you have to explain it, it is bad.',
        author: 'Cory House',
      }),
    });

    renderApp();
    await userEvent.click(screen.getByRole('button', { name: /load quote/i }));

    expect(screen.getByRole('status')).toHaveTextContent(/fetching quote/i);
    expect(await screen.findByText(/code is like humor/i)).toBeInTheDocument();
    expect(screen.getByText(/cory house/i)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/quotes/daily');
  });

  test('shows error when fetch fails', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({}),
    });

    renderApp();
    await userEvent.click(screen.getByRole('button', { name: /load quote/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/unable to fetch quote/i);
  });

  test('shows error when network throws', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network down'));

    renderApp();
    await userEvent.click(screen.getByRole('button', { name: /load quote/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/unable to fetch quote/i);
  });
});

/*
 * Interview quick answers:
 * - jest.spyOn(global, 'fetch') mocks the global fetch API in Jest
 * - mockResolvedValue simulates success; mockRejectedValue simulates network error
 * - Always restore mocks in afterEach to avoid leaking into other tests
 * - MSW (lesson 47) is preferred for larger apps; jest mock is fine for simple cases
 */
