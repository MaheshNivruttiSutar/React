import { act } from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('class component method testing with react-test-renderer', () => {
  test('handleIncrement method updates state', () => {
    let component;

    act(() => {
      component = renderer.create(<App />);
    });

    const instance = component.root.findByType(App).instance;

    act(() => {
      instance.handleIncrement();
    });

    expect(instance.state.count).toBe(1);
  });

  test('handleIncrement called twice updates count to 2', () => {
    let component;

    act(() => {
      component = renderer.create(<App />);
    });

    const instance = component.root.findByType(App).instance;

    act(() => {
      instance.handleIncrement();
    });
    act(() => {
      instance.handleIncrement();
    });

    expect(instance.state.count).toBe(2);
  });
});

describe('class component UI (Testing Library)', () => {
  test('renders initial count and updates on button click', () => {
    render(<App />);
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /increment/i }));

    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });
});
