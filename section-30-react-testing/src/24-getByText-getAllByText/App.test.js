import { render, screen } from '@testing-library/react';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('getByText — single elements', () => {
  test('finds single h1 by text', () => {
    renderApp();
    expect(screen.getByText(/24 - getbytext \| getallbytext/i)).toBeInTheDocument();
  });

  test('finds single lead paragraph by text', () => {
    renderApp();
    expect(screen.getByText(/choose a plan for your team/i)).toBeInTheDocument();
  });

  test('finds single footer paragraph by text', () => {
    renderApp();
    expect(screen.getByText(/all plans include email support/i)).toBeInTheDocument();
  });

  test('finds single plan heading by text', () => {
    renderApp();
    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });
});

describe('getAllByText — multiple elements', () => {
  test('finds multiple Upgrade buttons', () => {
    renderApp();
    const upgradeButtons = screen.getAllByText(/upgrade/i);
    expect(upgradeButtons).toHaveLength(3);
    upgradeButtons.forEach((btn) => expect(btn.tagName).toBe('BUTTON'));
  });

  test('finds multiple h2 plan titles', () => {
    renderApp();
    const titles = screen.getAllByText(/starter|team|enterprise/i);
    expect(titles.length).toBeGreaterThanOrEqual(3);
  });

  test('finds multiple plan description paragraphs starting with Best', () => {
    renderApp();
    const descriptions = screen.getAllByText(/^best for/i);
    expect(descriptions).toHaveLength(3);
  });
});
