import { render, screen } from '@testing-library/react';
import App from './App';

describe('snapshot testing example', () => {
  test('matches component snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('matches snapshot of greeting text only', () => {
    render(<App />);
    expect(screen.getByText(/hello, mahesh sutar/i)).toMatchSnapshot();
  });
});
