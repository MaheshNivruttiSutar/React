import { render, screen, configure } from '@testing-library/react';
import App from './App';

describe('overriding data-testid attribute', () => {
  beforeAll(() => {
    configure({ testIdAttribute: 'data-qa-id' });
  });

  afterAll(() => {
    configure({ testIdAttribute: 'data-testid' });
  });

  function renderApp() {
    render(<App />);
  }

  test('finds panel after overriding test id attribute', () => {
    renderApp();
    expect(screen.getByTestId('settings-panel')).toHaveTextContent(
      /integration settings/i
    );
  });

  test('finds save and reset buttons by overridden test id', () => {
    renderApp();
    expect(screen.getByTestId('save-btn')).toHaveTextContent('Save');
    expect(screen.getByTestId('reset-btn')).toHaveTextContent('Reset');
  });

  test('finds status message by overridden test id', () => {
    renderApp();
    expect(screen.getByTestId('status-message')).toHaveTextContent(
      /connection: active/i
    );
  });
});
