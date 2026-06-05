import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('query types — getBy vs queryBy', () => {
  test('getByText finds welcome message when logged in', () => {
    renderApp();
    expect(screen.getByText(/welcome, mahesh/i)).toBeInTheDocument();
  });

  test('queryByText returns null when login message is not shown', () => {
    renderApp();
    expect(screen.queryByText(/please log in/i)).toBeNull();
    expect(screen.queryByText(/please log in/i)).not.toBeInTheDocument();
  });

  test('after toggle, queryBy finds login text and welcome is gone', () => {
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: /toggle session/i }));

    expect(screen.queryByText(/welcome, mahesh/i)).not.toBeInTheDocument();
    expect(screen.getByText(/please log in/i)).toBeInTheDocument();
  });
});

describe('queryAllBy examples', () => {
  test('queryAllByRole returns empty array when no visible errors', () => {
    renderApp();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  test('queryAllByText with hidden: true finds hidden error items', () => {
    renderApp();
    const hiddenErrors = screen.queryAllByText(/invalid email|password too short/i, {
      hidden: true,
    });
    expect(hiddenErrors).toHaveLength(2);
  });
});

describe('hidden elements', () => {
  test('hidden draft found with { hidden: true }', () => {
    renderApp();
    const draft = screen.getByText(/draft autosaved/i, { hidden: true });
    expect(draft).toHaveAttribute('aria-hidden', 'true');
    expect(draft).toHaveClass('App__draft--hidden');
  });

  test('hidden errors found with { hidden: true }', () => {
    renderApp();
    const errors = screen.queryAllByText(/invalid email|password too short/i, {
      hidden: true,
    });
    expect(errors).toHaveLength(2);
    errors.forEach((item) => expect(item).toHaveAttribute('aria-hidden', 'true'));
  });
});

/*
 * Interview quick answers:
 * - getBy*  → element must exist (throws otherwise)
 * - queryBy* → returns null if missing (use for negative tests)
 * - findBy* → returns Promise, waits for async UI
 * - queryAllBy* → array (length 0 when none found)
 */
