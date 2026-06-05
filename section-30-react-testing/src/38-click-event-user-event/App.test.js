import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('click event with user-event', () => {
  test('increments likes when user clicks button', async () => {
    renderApp();

    expect(screen.getByText(/likes: 0/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /like post/i }));
    expect(screen.getByText(/likes: 1/i)).toBeInTheDocument();
  });

  test('multiple clicks update count', async () => {
    renderApp();
    const button = screen.getByRole('button', { name: /like post/i });

    await userEvent.click(button);
    await userEvent.click(button);

    expect(screen.getByText(/likes: 2/i)).toBeInTheDocument();
  });
});
