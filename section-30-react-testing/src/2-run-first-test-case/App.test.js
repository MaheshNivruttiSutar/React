import { render, screen } from '@testing-library/react';
import App from './App';


test('renders run first test case heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /2 - run first test case/i });
  expect(heading).toBeInTheDocument();
});