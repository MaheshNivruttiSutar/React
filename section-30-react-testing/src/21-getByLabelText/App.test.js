import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('getByLabelText', () => {
  test('use of getByLabelText — finds control by label text', () => {
    renderApp();
    const email = screen.getByLabelText(/work email/i);
    expect(email).toHaveAttribute('type', 'email');
  });

  test('input field — present, value, and placeholder', () => {
    renderApp();
    const email = screen.getByLabelText(/work email/i);
    expect(email).toBeInTheDocument();
    expect(email).toHaveValue('mahesh@celigo.com');
    expect(email).toHaveAttribute('placeholder', 'name@company.com');
  });

  test('second input field by label', () => {
    renderApp();
    const phone = screen.getByLabelText(/phone/i);
    expect(phone).toHaveAttribute('type', 'tel');
    expect(phone).toHaveValue('');
  });

  test('checkbox — present and toggles on click', () => {
    renderApp();
    const digest = screen.getByLabelText(/send weekly digest/i);
    expect(digest).toBeInTheDocument();
    expect(digest).not.toBeChecked();

    fireEvent.click(digest);

    expect(digest).toBeChecked();
    expect(screen.getByRole('status')).toHaveTextContent(/digest enabled/i);
  });
});
