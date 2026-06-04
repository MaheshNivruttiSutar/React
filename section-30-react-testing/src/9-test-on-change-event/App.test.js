import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('onChange event with input box', () => {
  test('renders input box', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/enter name/i)).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    render(<App />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'Mahesh Sutar' } });

    expect(input).toHaveValue('Mahesh Sutar');
  });

  test('shows greeting when name is typed', () => {
    render(<App />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'Mahesh Sutar' } });

    expect(screen.getByText(/hello, mahesh sutar/i)).toBeInTheDocument();
  });
});
