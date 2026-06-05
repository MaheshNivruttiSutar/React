import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('testing playground — recommended queries', () => {
  test('heading via getByRole (playground top suggestion)', () => {
    renderApp();
    expect(
      screen.getByRole('heading', { name: /44 - testing playground/i })
    ).toBeInTheDocument();
  });

  test('form fields via getByLabelText (playground prefers labels)', () => {
    renderApp();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/track/i)).toBeInTheDocument();
  });

  test('submit button via getByRole button', () => {
    renderApp();
    expect(screen.getByRole('button', { name: /reserve seat/i })).toBeInTheDocument();
  });

  test('fill form and confirm status message', async () => {
    renderApp();
    await userEvent.type(screen.getByLabelText(/full name/i), 'Riya Mehta');
    await userEvent.type(screen.getByLabelText(/email address/i), 'riya@example.com');
    await userEvent.selectOptions(screen.getByLabelText(/track/i), 'advanced');
    await userEvent.click(screen.getByRole('button', { name: /reserve seat/i }));

    expect(screen.getByRole('status')).toHaveTextContent(/seat reserved for riya mehta/i);
    expect(screen.getByRole('status')).toHaveTextContent(/advanced track/i);
  });
});

/*
 * Interview quick answers:
 * - Testing Playground suggests queries that match how users interact (a11y first)
 * - Copy query from extension into screen.getByRole(...) in your test file
 * - Extension works on live app in browser; tests run in Jest with same queries
 * - Prefer getByRole and getByLabelText over test ids when playground suggests them
 */
