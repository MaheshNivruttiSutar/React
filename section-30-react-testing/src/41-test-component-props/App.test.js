import { render, screen } from '@testing-library/react';
import App from './App';
import UserCard from './UserCard';

function renderApp() {
  render(<App />);
}

describe('test component props', () => {
  test('App passes props and displays user card', () => {
    renderApp();
    expect(screen.getByRole('heading', { name: /mahesh sutar/i })).toBeInTheDocument();
    expect(screen.getByText(/role: integration developer/i)).toBeInTheDocument();
    expect(screen.getByText(/location: pune/i)).toBeInTheDocument();
  });

  test('UserCard renders different props in isolation', () => {
    render(<UserCard name="Priya Shah" role="QA Engineer" location="Mumbai" />);
    expect(screen.getByText('Priya Shah')).toBeInTheDocument();
    expect(screen.getByText(/role: qa engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/location: mumbai/i)).toBeInTheDocument();
  });
});

/*
 * Interview quick answers:
 * - Test props by rendering component with different prop values
 * - Prefer testing rendered output, not props object directly
 * - Use render(<Comp {...props} />) for isolated component tests
 */
