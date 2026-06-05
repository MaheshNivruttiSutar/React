import { render, screen, within } from '@testing-library/react';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('querying within elements', () => {
  test('finds member inside engineering list only', () => {
    renderApp();
    const engineeringList = screen.getByRole('list', { name: /engineering members/i });
    expect(within(engineeringList).getByText('Mahesh Sutar')).toBeInTheDocument();
    expect(within(engineeringList).getByText('Priya Shah')).toBeInTheDocument();
  });

  test('finds duplicate name in QA section using within', () => {
    renderApp();
    const qaList = screen.getByRole('list', { name: /qa members/i });
    expect(within(qaList).getByText('Priya Shah')).toBeInTheDocument();
    expect(within(qaList).getByText('Rahul Mehta')).toBeInTheDocument();
  });

  test('getAllByText returns duplicate Priya across page', () => {
    renderApp();
    expect(screen.getAllByText('Priya Shah')).toHaveLength(2);
  });
});
