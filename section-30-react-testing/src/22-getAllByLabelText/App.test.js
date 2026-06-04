import { render, screen } from '@testing-library/react';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('getAllByLabelText', () => {
  test('use of getAllByLabelText — returns array when labels repeat', () => {
    renderApp();
    const answers = screen.getAllByLabelText(/your answer/i);
    expect(Array.isArray(answers)).toBe(true);
    expect(answers.length).toBeGreaterThan(1);
  });

  test('multiple input fields with same label text', () => {
    renderApp();
    const answers = screen.getAllByLabelText(/your answer/i);

    expect(answers).toHaveLength(3);
    expect(answers[0]).toHaveValue('Clear communication');
    expect(answers[1]).toHaveValue('Faster releases');
    expect(answers[2]).toHaveValue('Better docs');
  });

  test('multiple checkboxes with same label text', () => {
    renderApp();
    const notifyBoxes = screen.getAllByLabelText(/notify me on/i);

    expect(notifyBoxes).toHaveLength(3);
    expect(notifyBoxes[0]).toBeChecked();
    expect(notifyBoxes[1]).not.toBeChecked();
    expect(notifyBoxes[2]).toBeChecked();
  });
});
