import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('onChange with keyboard interactions', () => {
  test('types into input and updates status message', async () => {
    renderApp();
    const input = screen.getByLabelText(/city/i);

    await userEvent.type(input, 'Pune');

    expect(input).toHaveValue('Pune');
    expect(screen.getByRole('status')).toHaveTextContent(/you typed: pune/i);
  });

  test('clears input with userEvent.clear', async () => {
    renderApp();
    const input = screen.getByLabelText(/city/i);

    await userEvent.type(input, 'Mumbai');
    await userEvent.clear(input);

    expect(input).toHaveValue('');
    expect(screen.getByRole('status')).toHaveTextContent(/start typing/i);
  });

  test('tab moves focus to input', async () => {
    renderApp();
    await userEvent.tab();
    expect(screen.getByLabelText(/city/i)).toHaveFocus();
  });
});

/*
 * Interview quick answers:
 * - userEvent.type fires keydown/keypress/keyup + input events
 * - Prefer userEvent over fireEvent for integration-style tests
 */
