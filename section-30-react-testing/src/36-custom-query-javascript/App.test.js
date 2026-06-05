import { render, screen } from '@testing-library/react';
import App from './App';

function queryByDataCy(container, id) {
  const element = container.querySelector(`[data-cy="${id}"]`);
  if (!element) {
    throw new Error(`Unable to find element with data-cy="${id}"`);
  }
  return element;
}

function renderApp() {
  return render(<App />);
}

describe('custom JavaScript query', () => {
  test('queryByDataCy finds profile card', () => {
    const { container } = renderApp();
    const card = queryByDataCy(container, 'profile-card');
    expect(card).toHaveClass('App__card');
  });

  test('custom query finds name and role inside card', () => {
    const { container } = renderApp();
    const card = queryByDataCy(container, 'profile-card');
    expect(queryByDataCy(card, 'profile-name')).toHaveTextContent('Mahesh Sutar');
    expect(queryByDataCy(card, 'profile-role')).toHaveTextContent(
      'Integration Developer'
    );
  });

  test('prefer built-in query when possible', () => {
    renderApp();
    expect(screen.getByRole('button', { name: /connect/i })).toBeInTheDocument();
  });
});
