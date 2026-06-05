import { render, screen, prettyDOM, logRoles } from '@testing-library/react';
import App from './App';

function renderApp() {
  return render(<App />);
}

describe('debugging RTL helpers', () => {
  test('finds UI elements for debugging demo', () => {
    renderApp();
    expect(screen.getByRole('heading', { name: /43 - debugging/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /main nav/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /run sync/i })).toBeInTheDocument();
  });

  test('prettyDOM returns formatted markup string', () => {
    const { container } = renderApp();
    const output = prettyDOM(container);
    expect(output).toMatch(/ready to debug tests/i);
  });

  test('logRoles lists roles without failing test', () => {
    const { container } = renderApp();
    const roles = logRoles(container);
    expect(roles).toBeUndefined();
    expect(screen.getByRole('status')).toHaveTextContent(/ready to debug tests/i);
  });
});

/*
 * Manual debugging while writing tests:
 *
 * screen.debug();                  // print whole body
 * screen.debug(screen.getByRole('button', { name: /run sync/i }));
 *
 * Terminal:
 * DEBUG_PRINT_LIMIT=10000 npm test -- src/43-debugging-rtl
 */
