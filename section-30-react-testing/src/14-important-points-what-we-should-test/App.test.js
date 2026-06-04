import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Good: test what the user sees and does (behavior), not internal state names
describe('login form — what we should test', () => {
  test('renders login form fields', () => {
    render(<App />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows validation message when form is empty', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(
      /email and password are required/i
    );
  });

  test('shows success message for valid login', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/login successful/i);
  });
});

/*
 * What we should NOT test (examples — do not add these):
 *
 * expect(component.state.email).toBe('...');     // implementation detail
 * expect(wrapper.find('.btn-primary')).toHaveLength(1);  // CSS/class detail
 * expect(React.version).toBe('19.x');            // third-party internal
 */
