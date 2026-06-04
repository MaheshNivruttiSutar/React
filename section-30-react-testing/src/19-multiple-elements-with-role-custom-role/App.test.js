import { render, screen } from '@testing-library/react';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('multiple elements with the same role', () => {
  test('getAllByRole returns every button when names differ', () => {
    renderApp();
    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(3);
    expect(buttons.map((btn) => btn.textContent)).toEqual(['Play', 'Pause', 'Stop']);
  });

  test('getByRole with name selects one button among many', () => {
    renderApp();
    expect(screen.getByRole('button', { name: /play/i })).toHaveTextContent('Play');
    expect(screen.getByRole('button', { name: /pause/i })).toHaveTextContent('Pause');
    expect(screen.getByRole('button', { name: /stop/i })).toHaveTextContent('Stop');
  });

  test('getByRole with name selects one textbox among many', () => {
    renderApp();
    expect(screen.getByRole('textbox', { name: /track name/i })).toHaveValue(
      'Blue in Green'
    );
    expect(screen.getByRole('textbox', { name: /artist name/i })).toHaveValue(
      'Miles Davis'
    );
  });

  test('getAllByRole returns both textboxes', () => {
    renderApp();
    expect(screen.getAllByRole('textbox')).toHaveLength(2);
  });
});

describe('custom role', () => {
  test('finds progressbar by custom role and aria-label', () => {
    renderApp();
    const progress = screen.getByRole('progressbar', { name: /playback progress/i });

    expect(progress).toHaveTextContent(/45% played/i);
    expect(progress).toHaveAttribute('aria-valuenow', '45');
  });

  test('finds toolbar and status custom/implicit roles', () => {
    renderApp();
    expect(screen.getByRole('toolbar', { name: /playback controls/i })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(/now playing/i);
  });
});

/*
 * Same-role issue demo (do not run — getByRole throws):
 *
 * renderApp();
 * screen.getByRole('button'); // Error: Found multiple elements with role "button"
 *
 * Use { name: ... } or getAllByRole instead.
 */
