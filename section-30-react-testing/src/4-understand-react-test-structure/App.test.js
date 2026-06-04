/**
 * React test file structure:
 * 1. Imports
 * 2. describe() – groups related tests
 * 3. test() – one behavior per test
 * 4. Arrange → Act → Assert in each test
 */
import { render, screen } from '@testing-library/react';
import App from './App';

function renderApp() {
  return render(<App />);
}

describe('App component', () => {
  test('renders lesson heading', () => {
    // Arrange & Act
    renderApp();

    // Assert
    expect(
      screen.getByRole('heading', { name: /4 - understand react test structure/i })
    ).toBeInTheDocument();
  });

  test('shows book title and author', () => {
    renderApp();

    expect(
      screen.getByRole('heading', { name: /the pragmatic programmer/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/david thomas & andrew hunt/i)).toBeInTheDocument();
  });

  test('shows reading progress and status', () => {
    renderApp();

    expect(screen.getByText(/80% complete/i)).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(/still reading/i);
  });
});
