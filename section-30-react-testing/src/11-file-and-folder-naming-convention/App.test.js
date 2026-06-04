import { render, screen } from '@testing-library/react';
import App from './App';

describe('App.test.js naming example', () => {
  test('renders lesson heading', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', {
        name: /11 - file and folder naming convention/i,
      })
    ).toBeInTheDocument();
  });

  test('renders greeting from file_name.js', () => {
    render(<App />);
    expect(screen.getByText(/hello, mahesh sutar/i)).toBeInTheDocument();
  });

  test('shows naming convention list', () => {
    render(<App />);
    expect(screen.getByText(/file_name\.test\.js/)).toBeInTheDocument();
    expect(screen.getByText(/App\.test\.js/)).toBeInTheDocument();
  });
});
