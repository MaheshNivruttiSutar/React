import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('functional component — test handleAddTask with event', () => {
  test('adds task to list when user types and clicks Add task', () => {
    render(<App />);
    const input = screen.getByLabelText(/new task/i);

    fireEvent.change(input, { target: { value: 'Buy groceries' } });
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    expect(screen.getByRole('list', { name: /task list/i })).toHaveTextContent(
      'Buy groceries'
    );
  });

  test('shows error when Add task is clicked with empty input', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(
      /task name cannot be empty/i
    );
  });

  test('clears input after a successful add', () => {
    render(<App />);
    const input = screen.getByLabelText(/new task/i);

    fireEvent.change(input, { target: { value: 'Walk dog' } });
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    expect(input).toHaveValue('');
  });
});
