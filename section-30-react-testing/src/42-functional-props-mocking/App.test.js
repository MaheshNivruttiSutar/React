import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import SavePanel from './SavePanel';

describe('functional props and mocking', () => {
  test('calls onSave mock when save button is clicked', () => {
    const onSave = jest.fn();
    render(<App onSave={onSave} />);

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    expect(onSave).toHaveBeenCalledTimes(1);
  });

  test('SavePanel calls passed function prop once', () => {
    const onSave = jest.fn();
    render(<SavePanel title="Flow config" onSave={onSave} />);

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    expect(onSave).toHaveBeenCalled();
    expect(onSave).not.toHaveBeenCalledTimes(2);
  });

  test('mock not called before click', () => {
    const onSave = jest.fn();
    render(<SavePanel title="Mappings" onSave={onSave} />);
    expect(onSave).not.toHaveBeenCalled();
  });
});

/*
 * Interview quick answers:
 * - jest.fn() creates a spy/mock function
 * - toHaveBeenCalled / toHaveBeenCalledTimes(n) verify calls
 * - Pass mock as prop: render(<App onSave={mockFn} />)
 */
