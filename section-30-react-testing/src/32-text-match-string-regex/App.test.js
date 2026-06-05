import { render, screen } from '@testing-library/react';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('text match with string', () => {
  test('exact string match', () => {
    renderApp();
    expect(screen.getByText('Apply now')).toBeInTheDocument();
  });

  test('partial string match with exact: false', () => {
    renderApp();
    expect(screen.getByText('React Developer', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Pune', { exact: false })).toBeInTheDocument();
  });
});

describe('text match with regex', () => {
  test('case-insensitive regex', () => {
    renderApp();
    expect(screen.getByText(/react developer/i)).toBeInTheDocument();
  });

  test('regex pattern for status line', () => {
    renderApp();
    expect(screen.getByText(/^status: open to work$/i)).toBeInTheDocument();
  });

  test('regex for location', () => {
    renderApp();
    expect(screen.getByText(/pune,\s*india/i)).toBeInTheDocument();
  });
});
